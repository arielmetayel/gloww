import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import pandas as pd
import json
from datetime import datetime
import re
from typing import List, Dict
from langchain_anthropic import ChatAnthropic
from langchain.schema import HumanMessage
from dotenv import load_dotenv

# Load environment variables
script_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(script_dir, 'environment.env')
print(f"Looking for environment file at: {env_path}")
print(f"Environment file exists: {os.path.exists(env_path)}")
load_dotenv(env_path)
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
print(f"Loaded API key: {'Yes' if ANTHROPIC_API_KEY else 'No'}")

if not ANTHROPIC_API_KEY:
    raise ValueError(f"ANTHROPIC_API_KEY not found in environment variables. Please set it in {env_path}")

# Clean up debug prints after first successful load
print("Environment loaded successfully!")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# Read system prompt and questions once at startup
system_prompt_path = os.path.join(script_dir, "biographer", "system prompt.txt")
questions_csv_path = os.path.join(script_dir, "biographer", "ask_these.csv")

with open(system_prompt_path, "r") as f:
    system_prompt = f.read()

questions_df = pd.read_csv(questions_csv_path)
questions_list = questions_df.to_dict('records')
questions_str = "\n".join([f"Category: {q['Category']}, Field: {q['Field']}, Question: {q['Question']}" for q in questions_list])
system_prompt = system_prompt.replace("{{QUESTIONS_LIST}}", questions_str)

# Store active conversations
active_conversations = {}

class AnswerQualityAssessor:
    def __init__(self):
        self.llm = ChatAnthropic(
            model="claude-3-sonnet-20240229",
            anthropic_api_key=ANTHROPIC_API_KEY,
            temperature=0.1
        )

    def load_questions(self, questions_file: str) -> pd.DataFrame:
        return pd.read_csv(questions_file)

    def load_answers(self, answers_file: str) -> List[str]:
        with open(answers_file, 'r', encoding='utf-8') as f:
            content = f.read().strip()
        
        answers = []
        if content:
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
        
        return answers

    def assess_answer_quality(self, question: str, answers: List[str]) -> str:
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
            
            result_str = result.content.strip().lower()
            
            if "full answer" in result_str:
                return "full answer"
            elif "partial answer" in result_str:
                return "partial answer"
            else:
                return "0"
                
        except Exception as e:
            return "0"

    def process_assessment(self, questions_file: str, answers_file: str, output_file: str = None):
        questions_df = self.load_questions(questions_file)
        answers = self.load_answers(answers_file)
        
        output_df = questions_df.copy()
        output_df['Answer_Quality'] = ""
        
        for idx, row in questions_df.iterrows():
            question = row['Question']
            quality = self.assess_answer_quality(question, answers)
            output_df.at[idx, 'Answer_Quality'] = quality
        
        if not output_file:
            base_name = os.path.splitext(questions_file)[0]
            output_file = f"{base_name}_assessed.csv"
        
        output_df.to_csv(output_file, index=False)
        
        quality_counts = output_df['Answer_Quality'].value_counts()
        summary = {quality: int(count) for quality, count in quality_counts.items()}
        
        return output_file, summary

# API Routes

@app.route("/api/biographer", methods=['GET'])
def hello_biographer():
    return jsonify({"message": "Biographer API is running", "status": "healthy"})

@app.route('/api/biographer/start', methods=['POST'])
def start_interview():
    """Start a new biographer interview session"""
    conversation_id = datetime.now().strftime("%M%S")
    session_id = f"bio_{datetime.now().strftime('%d%m_%H%M')}_{conversation_id}"
    
    active_conversations[session_id] = {
        'history': [],
        'started_at': datetime.now().isoformat(),
        'type': 'biographer'
    }
    
    return jsonify({
        'session_id': session_id,
        'message': 'Biographer interview session started'
    })

@app.route('/api/biographer/chat', methods=['POST'])
def chat():
    """Handle biographer chat messages"""
    data = request.get_json()
    session_id = data.get('session_id')
    user_message = data.get('message')
    
    if not session_id or session_id not in active_conversations:
        return jsonify({'error': 'Invalid session'}), 400
    
    if not user_message:
        return jsonify({'error': 'Message is required'}), 400
    
    # Add user message to history
    conversation = active_conversations[session_id]
    conversation['history'].append({"role": "user", "content": user_message})
    
    try:
        # Get response from Claude with biographer-specific prompting
        message = client.messages.create(
            model="claude-3-7-sonnet-20250219",
            max_tokens=20000,
            temperature=0.8,  # Slightly lower temperature for more focused biographical questioning
            system=system_prompt,
            messages=conversation['history']
        )
        
        assistant_response = message.content[0].text
        
        # Add assistant response to history
        conversation['history'].append({"role": "assistant", "content": assistant_response})
        
        return jsonify({
            'response': assistant_response,
            'session_id': session_id
        })
        
    except Exception as e:
        return jsonify({'error': f'Error getting response: {str(e)}'}), 500

@app.route('/api/biographer/end', methods=['POST'])
def end_interview():
    """End biographer interview session and save conversation"""
    data = request.get_json()
    session_id = data.get('session_id')
    
    if not session_id or session_id not in active_conversations:
        return jsonify({'error': 'Invalid session'}), 400
    
    conversation = active_conversations[session_id]
    filename = f"biographer_story_{session_id}.json"
    
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(conversation['history'], f, indent=2, ensure_ascii=False)
        
        # Remove from active conversations
        del active_conversations[session_id]
        
        return jsonify({
            'message': 'Biographer session ended successfully',
            'filename': filename
        })
        
    except Exception as e:
        return jsonify({'error': f'Error saving conversation: {str(e)}'}), 500

@app.route('/api/biographer/stories', methods=['GET'])
def list_stories():
    """List all saved biographical stories"""
    try:
        story_files = [f for f in os.listdir('.') if f.startswith('biographer_story_') and f.endswith('.json')]
        
        stories = []
        for file in story_files:
            with open(file, 'r', encoding='utf-8') as f:
                conversation = json.load(f)
            
            # Extract basic info about the story
            message_count = len(conversation)
            created_date = file.split('_')[2:4]  # Extract date from filename
            
            stories.append({
                'filename': file,
                'message_count': message_count,
                'session_info': created_date
            })
        
        return jsonify({
            'stories': stories,
            'total_count': len(stories)
        })
        
    except Exception as e:
        return jsonify({'error': f'Error listing stories: {str(e)}'}), 500

@app.route('/api/biographer/conclusions', methods=['POST'])
def process_conclusions():
    """Process conclusions from biographer conversation files"""
    try:
        # Find all biographer conversation JSON files
        conversation_files = [f for f in os.listdir('.') if f.startswith('biographer_story_') and f.endswith('.json')]
        
        if not conversation_files:
            return jsonify({'error': 'No biographer story files found'}), 404
        
        results = []
        
        for file in conversation_files:
            with open(file, 'r', encoding='utf-8') as f:
                conversation = json.load(f)
            
            conclusions = []
            
            for message in conversation:
                if message['role'] == 'assistant' and '<response>' in message['content']:
                    matches = re.findall(r'<response>(.*?)</response>', message['content'], re.DOTALL)
                    if matches:
                        for match in matches:
                            conclusions.append(match.strip())
            
            if conclusions:
                # Save conclusions
                base_name = os.path.splitext(file)[0]
                conclusion_filename = f"{base_name}_biography_summary.txt"
                
                with open(conclusion_filename, 'w', encoding='utf-8') as f:
                    f.write("BIOGRAPHICAL STORY SUMMARY\n")
                    f.write("=" * 50 + "\n\n")
                    for i, conclusion in enumerate(conclusions, 1):
                        f.write(f"{i}. {conclusion}\n\n")
                
                results.append({
                    'story_file': file,
                    'summary_file': conclusion_filename,
                    'key_points_count': len(conclusions)
                })
        
        return jsonify({
            'message': f'Processed {len(results)} biographical story files',
            'results': results
        })
        
    except Exception as e:
        return jsonify({'error': f'Error processing biographical conclusions: {str(e)}'}), 500

@app.route('/api/biographer/assess_quality', methods=['POST'])
def assess_answer_quality():
    """Assess answer quality for biographical interviews"""
    data = request.get_json()
    default_questions_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "biographer", "ask_these.csv")
    questions_file = data.get('questions_file', default_questions_path)
    answers_file = data.get('answers_file')
    output_file = data.get('output_file')
    
    if not answers_file:
        return jsonify({'error': 'answers_file is required'}), 400
    
    if not os.path.exists(questions_file):
        return jsonify({'error': f'Questions file {questions_file} not found'}), 404
    
    if not os.path.exists(answers_file):
        return jsonify({'error': f'Answers file {answers_file} not found'}), 404
    
    try:
        assessor = AnswerQualityAssessor()
        result_file, summary = assessor.process_assessment(questions_file, answers_file, output_file)
        
        return jsonify({
            'message': 'Biographical interview assessment completed successfully',
            'output_file': result_file,
            'summary': summary
        })
        
    except Exception as e:
        return jsonify({'error': f'Error during biographical assessment: {str(e)}'}), 500

@app.route('/api/biographer/health', methods=['GET'])
def health_check():
    """Health check endpoint for biographer service"""
    return jsonify({
        'status': 'healthy',
        'service': 'biographer',
        'active_sessions': len(active_conversations),
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4002) 