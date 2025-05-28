# Flask Interview Application

A Flask web application that provides endpoints for running interview chat sessions, processing conclusions, and assessing answer quality.

## Features

- **Interactive Chat Interface**: Web-based chat interface for conducting interviews using Claude AI
- **Conclusions Processing**: Automatically extract and save conclusions from conversation files
- **Answer Quality Assessment**: Assess the quality of answers against predefined questions
- **Session Management**: Handle multiple concurrent interview sessions
- **RESTful API**: Clean REST endpoints for programmatic access

## Setup

1. **Install Dependencies (from root directory)**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Application**:
   ```bash
   cd server
   python app.py
   ```

3. **Access the Application**:
   - Web Interface: http://localhost:5000
   - API Endpoints: http://localhost:5000/api/...

## Endpoints

### Web Interface

#### `GET /`
- **Description**: Main chat interface for conducting interviews
- **Returns**: HTML page with interactive chat interface
- **Features**:
  - Real-time chat with Claude AI
  - Session management
  - Automatic conversation saving
  - Modern, responsive UI

### API Endpoints

#### Interviewer Endpoints

##### `POST /interviewer/start`
- **Description**: Start a new interview session
- **Returns**: 
  ```json
  {
    "session_id": "1234_5678_90",
    "message": "Interview session started"
  }
  ```

##### `POST /interviewer/chat`
- **Description**: Send a message in an active interview session
- **Request Body**:
  ```json
  {
    "session_id": "1234_5678_90",
    "message": "Your message here"
  }
  ```
- **Returns**:
  ```json
  {
    "response": "Assistant's response",
    "session_id": "1234_5678_90"
  }
  ```

##### `POST /interviewer/end`
- **Description**: End an interview session and save the conversation
- **Request Body**:
  ```json
  {
    "session_id": "1234_5678_90"
  }
  ```
- **Returns**:
  ```json
  {
    "message": "Session ended successfully",
    "filename": "conversation_1234_5678_90.json"
  }
  ```

#### Conclusions Processing

##### `POST /conclusions`
- **Description**: Process all conversation files and extract conclusions
- **Returns**:
  ```json
  {
    "message": "Processed 3 conversation files",
    "results": [
      {
        "conversation_file": "conversation_1234_5678_90.json",
        "conclusions_file": "conversation_1234_5678_90_conclusions.txt",
        "conclusions_count": 5
      }
    ]
  }
  ```

#### Answer Quality Assessment

##### `POST /assess_quality`
- **Description**: Assess the quality of answers against questions
- **Request Body**:
  ```json
  {
    "questions_file": "../biographer/ask_these.csv",
    "answers_file": "conversation_1234_5678_90_conclusions.txt"
  }
  ```
- **Returns**:
  ```json
  {
    "message": "Assessment completed successfully",
    "output_file": "assessment_results.csv",
    "summary": {
      "full answer": 10,
      "partial answer": 5,
      "0": 2
    }
  }
  ```

#### Health Check

##### `GET /health`
- **Description**: Health check endpoint
- **Returns**:
  ```json
  {
    "status": "healthy",
    "active_sessions": 2,
    "timestamp": "2024-01-01T12:00:00"
  }
  ```

## File Structure

```
.
├── server/
│   ├── app.py                    # Main Flask application
│   ├── FLASK_APP_README.md       # Detailed documentation
│   ├── FLASK_README.md           # This file
│   ├── start_server.sh           # Server startup script
│   └── test_flask_app.py         # Test suite
├── biographer/
│   ├── interviewer.py            # Original interviewer script
│   ├── conclusions.py            # Original conclusions script
│   ├── answer_quality_assessor.py # Original assessment script
│   ├── system prompt.txt         # System prompt for Claude
│   ├── ask_these.csv            # Questions for interviews
│   └── interview-questions.csv  # Full question bank
├── variables.py                  # API key configuration
├── requirements.txt             # Python dependencies
└── conversation_*.json          # Generated conversation files
```

## Usage Examples

### Starting an Interview Session

```bash
# Start a new session
curl -X POST http://localhost:5000/interviewer/start

# Send a message
curl -X POST http://localhost:5000/interviewer/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id": "1234_5678_90", "message": "Hello"}'

# End the session
curl -X POST http://localhost:5000/interviewer/end \
  -H "Content-Type: application/json" \
  -d '{"session_id": "1234_5678_90"}'
```

### Processing Conclusions

```bash
curl -X POST http://localhost:5000/conclusions
```

### Assessing Answer Quality

```bash
curl -X POST http://localhost:5000/assess_quality \
  -H "Content-Type: application/json" \
  -d '{
    "questions_file": "../biographer/ask_these.csv",
    "answers_file": "conversation_1234_5678_90_conclusions.txt"
  }'
```

## Configuration

### Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key (alternatively configured in `variables.py`)

### Files Required

- `biographer/system prompt.txt`: System prompt for the Claude AI model
- `biographer/ask_these.csv`: CSV file containing interview questions with columns: Category, Field, Question

## Error Handling

The application includes comprehensive error handling:

- **400 Bad Request**: Invalid request parameters
- **404 Not Found**: Required files not found
- **500 Internal Server Error**: Server-side errors (API issues, file I/O problems)

All errors return JSON responses with descriptive error messages.

## Session Management

- Sessions are stored in memory and automatically cleaned up when ended
- Each session has a unique ID based on timestamp
- Conversations are automatically saved to JSON files when sessions end
- Multiple concurrent sessions are supported

## Security Considerations

- API key is stored in `variables.py` (consider using environment variables in production)
- No authentication is implemented (add authentication for production use)
- File operations are limited to the current directory
- Input validation is performed on all endpoints

## Development

To extend the application:

1. Add new routes in `app.py`
2. Follow the existing pattern for error handling
3. Update this README with new endpoints
4. Test all endpoints thoroughly

## Dependencies

- Flask: Web framework
- anthropic: Claude AI API client
- pandas: Data manipulation
- langchain: LLM framework
- langchain-anthropic: Anthropic integration for LangChain

## Production Deployment

For production deployment:

1. Set `debug=False` in `app.run()`
2. Use a proper WSGI server (gunicorn, uwsgi)
3. Implement proper authentication
4. Use environment variables for sensitive configuration
5. Add logging and monitoring
6. Consider using a database for session storage 