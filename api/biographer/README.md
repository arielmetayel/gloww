# Envelope - AI Interviewer

A Streamlit-based chat interface for the Envelope AI interviewer.

## Setup

1. Install the required dependencies:
```
pip install -r requirements.txt
```

2. Make sure you have the following files in your directory:
   - `variables.py` with your Anthropic API key (ANTHROPIC_API_KEY)
   - `system prompt.txt` containing the system prompt for Claude
   - `ask_these.csv` with the questions for the interview

## Running the Application

Start the Streamlit app with:
```
streamlit run app.py
```

The application will open in your default web browser.

## Features

- Real-time chat interface with Claude
- Conversation history displayed in a user-friendly format
- Save conversations to JSON files
- Start new conversations with a button click
