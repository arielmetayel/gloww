#!/bin/bash

# Flask Application Startup Script
echo "🚀 Starting Flask Interview Application..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Creating one..."
    python3 -m venv venv
    echo "✅ Virtual environment created."
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies if they're not installed
echo "📦 Checking dependencies..."
pip install -r requirements.txt > /dev/null 2>&1

# Check if variables.py exists
if [ ! -f "../variables.py" ]; then
    echo "❌ Warning: variables.py not found in parent directory. Please create it with your ANTHROPIC_API_KEY"
    echo "Example content:"
    echo "ANTHROPIC_API_KEY = 'your_api_key_here'"
    exit 1
fi

echo "🌐 Starting Flask server..."
echo "📱 Open your browser to: http://localhost:5000"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Start the Flask application
python app.py 