import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import anthropic
import pandas as pd
import json
from datetime import datetime

from variables import ANTHROPIC_API_KEY


# Read the system prompt from file
with open("biographer/system prompt.txt", "r") as f:
    system_prompt = f.read()

# Read the questions from CSV file
import pandas as pd
questions_df = pd.read_csv("biographer/interview-questions.csv")
questions_list = questions_df.to_dict('records')
questions_str = "\n".join([f"Category: {q['Category']}, Field: {q['Field']}, Question: {q['Question']}" for q in questions_list])

# Replace placeholder in system prompt with actual questions
system_prompt = system_prompt.replace("{{QUESTIONS_LIST}}", questions_str)

# Setup the interviewer name and create a unique conversation ID

conversation_id = datetime.now().strftime("%M%S")

# Initialize Anthropic client with just the API key
client = anthropic.Anthropic(
    api_key=ANTHROPIC_API_KEY,
)

# Initialize conversation history
conversation_history = []

# Print welcome message
print("\nEnvelope started. Type 'exit' or 'quit' to end the conversation.")
print("------------------------------------------------------------")

# Start the conversation loop
while True:
    # Get user input
    user_input = input("\nYou: ")
    
    # Check if user wants to exit
    if user_input.lower() in ["exit", "quit"]:
        print("Ending conversation. Goodbye!")
        break
    
    # Add user message to history
    conversation_history.append({"role": "user", "content": user_input})
    
    # Get response from Claude
    message = client.messages.create(
        model="claude-3-7-sonnet-20250219",
        max_tokens=20000,
        temperature=1,
        system=system_prompt,
        messages=conversation_history
    )
    
    # Extract and print Claude's response
    assistant_response = message.content[0].text
    print(f"\n\nEnvelope: {assistant_response}")
    
    # Add assistant response to history
    conversation_history.append({"role": "assistant", "content": assistant_response})
    
# Save conversation history to JSON file with timestamp ID
timestamp = datetime.now().strftime("%d%m_%H%M")
filename = f"conversation_{timestamp}_{conversation_id}.json"

with open(filename, 'w', encoding='utf-8') as f:
    json.dump(conversation_history, f, indent=2, ensure_ascii=False)


