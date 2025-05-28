#!/usr/bin/env python3
"""
Answer Quality Assessment Agent

This script uses LangChain and Anthropic's Claude to assess how well answers respond to questions.
It reads questions from a CSV file and answers from a text file, then evaluates the quality
of each answer for each question.
"""

import os
import pandas as pd
import argparse
from typing import List, Dict, Tuple
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain.schema import HumanMessage

# Import API key from variables.py
try:
    import sys
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    from variables import ANTHROPIC_API_KEY
    os.environ['ANTHROPIC_API_KEY'] = ANTHROPIC_API_KEY
except ImportError:
    pass  # Fall back to environment variable or parameter

# Load environment variables
load_dotenv()

class AnswerQualityAssessor:
    def __init__(self, anthropic_api_key: str = None):
        """Initialize the assessor with Anthropic API key."""
        self.api_key = anthropic_api_key or os.getenv('ANTHROPIC_API_KEY')
        if not self.api_key:
            raise ValueError("ANTHROPIC_API_KEY must be provided either as parameter or environment variable")
        
        # Initialize the LLM with Anthropic Claude
        self.llm = ChatAnthropic(
            model="claude-3-sonnet-20240229",
            anthropic_api_key=self.api_key,
            temperature=0.1
        )

    def load_questions(self, questions_file: str) -> pd.DataFrame:
        """Load questions from CSV file."""
        try:
            df = pd.read_csv(questions_file)
            print(f"Loaded {len(df)} questions from {questions_file}")
            return df
        except Exception as e:
            raise Exception(f"Error loading questions file: {e}")

    def load_answers(self, answers_file: str) -> List[str]:
        """Load answers from text file."""
        try:
            with open(answers_file, 'r', encoding='utf-8') as f:
                content = f.read().strip()
            
            # Split by numbered lines (1., 2., etc.) or by double newlines
            answers = []
            if content:
                # Try to split by numbered items first
                lines = content.split('\n')
                current_answer = ""
                
                for line in lines:
                    line = line.strip()
                    if line and (line[0].isdigit() and '. ' in line):
                        if current_answer:
                            answers.append(current_answer.strip())
                        current_answer = line
                    elif line:
                        current_answer += " " + line
                
                if current_answer:
                    answers.append(current_answer.strip())
            
            print(f"Loaded {len(answers)} answers from {answers_file}")
            return answers
        except Exception as e:
            raise Exception(f"Error loading answers file: {e}")

    def assess_answer_quality(self, question: str, answers: List[str]) -> str:
        """Assess the quality of answers for a specific question."""
        
        # Combine all answers into a single text
        all_answers = "\n".join(answers) if answers else "No answers provided"
        
        prompt = f"""
        Evaluate how well the provided answers respond to this specific question:
        
        QUESTION: {question}
        
        AVAILABLE ANSWERS:
        {all_answers}
        
        Your task is to determine the answer quality based on these criteria:
        
        1. "full answer" - The answers completely and thoroughly address the question with specific details
        2. "partial answer" - The answers partially address the question but lack some important details or completeness
        3. "0" - The answers do not address the question at all, or no relevant answer is found
        
        Consider:
        - Does any answer directly respond to what the question is asking?
        - Is the response specific and detailed enough to be considered complete?
        - Are there multiple aspects to the question that need to be addressed?
        
        Respond with ONLY one of these three options: "full answer", "partial answer", or "0"
        """
        
        try:
            message = HumanMessage(content=prompt)
            result = self.llm.invoke([message])
            
            # Clean up the result to ensure it's one of the expected values
            result_str = result.content.strip().lower()
            
            if "full answer" in result_str:
                return "full answer"
            elif "partial answer" in result_str:
                return "partial answer"
            else:
                return "0"
                
        except Exception as e:
            print(f"Error assessing question '{question}': {e}")
            return "0"

    def process_assessment(self, questions_file: str, answers_file: str, output_file: str = None):
        """Process the complete assessment and generate output file."""
        
        # Load data
        questions_df = self.load_questions(questions_file)
        answers = self.load_answers(answers_file)
        
        # Create output dataframe
        output_df = questions_df.copy()
        output_df['Answer_Quality'] = ""
        
        print(f"\nStarting assessment of {len(questions_df)} questions...")
        
        # Process each question
        for idx, row in questions_df.iterrows():
            question = row['Question']
            print(f"\nAssessing question {idx + 1}/{len(questions_df)}: {question[:50]}...")
            
            quality = self.assess_answer_quality(question, answers)
            output_df.at[idx, 'Answer_Quality'] = quality
            
            print(f"Assessment: {quality}")
        
        # Generate output filename if not provided
        if not output_file:
            base_name = os.path.splitext(questions_file)[0]
            output_file = f"{base_name}_assessed.csv"
        
        # Save results
        output_df.to_csv(output_file, index=False)
        print(f"\nAssessment complete! Results saved to: {output_file}")
        
        # Print summary
        quality_counts = output_df['Answer_Quality'].value_counts()
        print(f"\nSummary:")
        for quality, count in quality_counts.items():
            print(f"  {quality}: {count} questions")
        
        return output_file

def main():
    """Main function to run the assessment."""
    parser = argparse.ArgumentParser(description='Assess answer quality for questions')
    parser.add_argument('questions_file', help='Path to CSV file containing questions')
    parser.add_argument('answers_file', help='Path to text file containing answers')
    parser.add_argument('--output', '-o', help='Output CSV file path (optional)')
    parser.add_argument('--api-key', help='Anthropic API key (optional, can use ANTHROPIC_API_KEY env var)')
    
    args = parser.parse_args()
    
    try:
        # Initialize assessor
        assessor = AnswerQualityAssessor(anthropic_api_key=args.api_key)
        
        # Run assessment
        output_file = assessor.process_assessment(
            questions_file=args.questions_file,
            answers_file=args.answers_file,
            output_file=args.output
        )
        
        print(f"\n✅ Assessment completed successfully!")
        print(f"📄 Results saved to: {output_file}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main()) 