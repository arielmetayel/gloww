import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, request, jsonify, render_template_string
import anthropic
import pandas as pd
import json
from datetime import datetime
import re
from typing import List, Dict
from langchain_anthropic import ChatAnthropic
from langchain.schema import HumanMessage

from variables import ANTHROPIC_API_KEY

app = Flask(__name__)

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# Read system prompt and questions once at startup
with open("../biographer/system prompt.txt", "r") as f:
    system_prompt = f.read()

questions_df = pd.read_csv("../biographer/ask_these.csv")
questions_list = questions_df.to_dict('records')
questions_str = "\n".join([f"Category: {q['Category']}, Field: {q['Field']}, Question: {q['Question']}" for q in questions_list])
system_prompt = system_prompt.replace("{{QUESTIONS_LIST}}", questions_str)

# Store active conversations
active_conversations = {}

# HTML template for the chat interface
CHAT_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Envelope Interview Chat</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .chat-container {
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .chat-history {
            height: 400px;
            overflow-y: auto;
            border: 1px solid #ddd;
            padding: 10px;
            margin-bottom: 20px;
            background-color: #fafafa;
        }
        .message {
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 5px;
        }
        .user-message {
            background-color: #e3f2fd;
            text-align: right;
        }
        .assistant-message {
            background-color: #f3e5f5;
        }
        .input-container {
            display: flex;
            gap: 10px;
        }
        #userInput {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        .session-info {
            margin-bottom: 20px;
            padding: 10px;
            background-color: #e8f5e8;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <h1>Envelope Interview Chat</h1>
        <div class="session-info">
            <strong>Session ID:</strong> <span id="sessionId"></span>
        </div>
        <div class="chat-history" id="chatHistory"></div>
        <div class="input-container">
            <input type="text" id="userInput" placeholder="Type your message here..." onkeypress="handleKeyPress(event)">
            <button onclick="sendMessage()">Send</button>
            <button onclick="endSession()" style="background-color: #dc3545;">End Session</button>
        </div>
    </div>

    <script>
        let sessionId = null;
        let chatHistory = [];

        // Initialize session
        async function initSession() {
            try {
                const response = await fetch('/interviewer/start', {method: 'POST'});
                const data = await response.json();
                sessionId = data.session_id;
                document.getElementById('sessionId').textContent = sessionId;
            } catch (error) {
                console.error('Error initializing session:', error);
            }
        }

        async function sendMessage() {
            const userInput = document.getElementById('userInput');
            const message = userInput.value.trim();
            
            if (!message || !sessionId) return;

            // Add user message to chat
            addMessageToChat('You', message, 'user-message');
            userInput.value = '';

            try {
                const response = await fetch('/interviewer/chat', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        session_id: sessionId,
                        message: message
                    })
                });

                const data = await response.json();
                if (data.response) {
                    addMessageToChat('Envelope', data.response, 'assistant-message');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                addMessageToChat('System', 'Error sending message. Please try again.', 'assistant-message');
            }
        }

        async function endSession() {
            if (!sessionId) return;

            try {
                const response = await fetch('/interviewer/end', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({session_id: sessionId})
                });

                const data = await response.json();
                alert('Session ended. Conversation saved to: ' + data.filename);
                
                // Reset session
                sessionId = null;
                document.getElementById('sessionId').textContent = '';
                document.getElementById('chatHistory').innerHTML = '';
                
            } catch (error) {
                console.error('Error ending session:', error);
            }
        }

        function addMessageToChat(sender, message, messageClass) {
            const chatHistory = document.getElementById('chatHistory');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${messageClass}`;
            messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
            chatHistory.appendChild(messageDiv);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        // Initialize session on page load
        initSession();
    </script>
</body>
</html>
"""

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

# Routes

@app.route("/api/python")
def hello_world():
    return "<p>Hello, ahhhhhhh!</p>"

@app.route('/')
def index():
    return render_template_string(CHAT_TEMPLATE)

@app.route('/interviewer/start', methods=['POST'])
def start_interview():
    """Start a new interview session"""
    conversation_id = datetime.now().strftime("%M%S")
    session_id = f"{datetime.now().strftime('%d%m_%H%M')}_{conversation_id}"
    
    active_conversations[session_id] = {
        'history': [],
        'started_at': datetime.now().isoformat()
    }
    
    return jsonify({
        'session_id': session_id,
        'message': 'Interview session started'
    })

@app.route('/interviewer/chat', methods=['POST'])
def chat():
    """Handle chat messages"""
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
        # Get response from Claude
        message = client.messages.create(
            model="claude-3-7-sonnet-20250219",
            max_tokens=20000,
            temperature=1,
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

@app.route('/interviewer/end', methods=['POST'])
def end_interview():
    """End interview session and save conversation"""
    data = request.get_json()
    session_id = data.get('session_id')
    
    if not session_id or session_id not in active_conversations:
        return jsonify({'error': 'Invalid session'}), 400
    
    conversation = active_conversations[session_id]
    filename = f"conversation_{session_id}.json"
    
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(conversation['history'], f, indent=2, ensure_ascii=False)
        
        # Remove from active conversations
        del active_conversations[session_id]
        
        return jsonify({
            'message': 'Session ended successfully',
            'filename': filename
        })
        
    except Exception as e:
        return jsonify({'error': f'Error saving conversation: {str(e)}'}), 500

@app.route('/conclusions', methods=['POST'])
def process_conclusions():
    """Process conclusions from conversation files"""
    try:
        # Find all conversation JSON files
        conversation_files = [f for f in os.listdir('.') if f.startswith('conversation_') and f.endswith('.json')]
        
        if not conversation_files:
            return jsonify({'error': 'No conversation files found'}), 404
        
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
                conclusion_filename = f"{base_name}_conclusions.txt"
                
                with open(conclusion_filename, 'w', encoding='utf-8') as f:
                    for i, conclusion in enumerate(conclusions, 1):
                        f.write(f"{i}. {conclusion}\n\n")
                
                results.append({
                    'conversation_file': file,
                    'conclusions_file': conclusion_filename,
                    'conclusions_count': len(conclusions)
                })
        
        return jsonify({
            'message': f'Processed {len(results)} conversation files',
            'results': results
        })
        
    except Exception as e:
        return jsonify({'error': f'Error processing conclusions: {str(e)}'}), 500

@app.route('/assess_quality', methods=['POST'])
def assess_answer_quality():
    """Assess answer quality using the AnswerQualityAssessor"""
    data = request.get_json()
    questions_file = data.get('questions_file', '../biographer/ask_these.csv')
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
            'message': 'Assessment completed successfully',
            'output_file': result_file,
            'summary': summary
        })
        
    except Exception as e:
        return jsonify({'error': f'Error during assessment: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'active_sessions': len(active_conversations),
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4001)