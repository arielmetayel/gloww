import json
import os
import re
from datetime import datetime

def extract_conclusions(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        conversation = json.load(f)
    
    conclusions = []
    
    for message in conversation:
        if message['role'] == 'assistant' and '<response>' in message['content']:
            # Extract text between <response> and </response> tags
            matches = re.findall(r'<response>(.*?)</response>', message['content'], re.DOTALL)
            if matches:
                for match in matches:
                    conclusions.append(match.strip())
    
    return conclusions

def save_conclusions(conclusions, original_filename):
    # Create filename based on original conversation file
    base_name = os.path.splitext(original_filename)[0]
    conclusion_filename = f"{base_name}_conclusions.txt"
    
    with open(conclusion_filename, 'w', encoding='utf-8') as f:
        for i, conclusion in enumerate(conclusions, 1):
            f.write(f"{i}. {conclusion}\n\n")
    
    return conclusion_filename

def process_all_conversations():
    # Find all conversation JSON files in the current directory
    conversation_files = [f for f in os.listdir('.') if f.startswith('conversation_') and f.endswith('.json')]
    
    for file in conversation_files:
        conclusions = extract_conclusions(file)
        if conclusions:
            conclusion_file = save_conclusions(conclusions, file)
            print(f"Extracted {len(conclusions)} conclusions to {conclusion_file}")
        else:
            print(f"No conclusions found in {file}")

if __name__ == "__main__":
    process_all_conversations() 