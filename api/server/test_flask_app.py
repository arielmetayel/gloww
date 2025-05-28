#!/usr/bin/env python3
"""
Test script for the Flask Interview Application

This script tests all the main endpoints to ensure they work correctly.
Run this after starting the Flask application.
"""

import requests
import json
import time
from typing import Dict, Any

BASE_URL = "http://localhost:5000"

def test_health_check():
    """Test the health check endpoint"""
    print("Testing health check endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Health check passed: {data['status']}")
        print(f"   Active sessions: {data['active_sessions']}")
        return True
    else:
        print(f"❌ Health check failed: {response.status_code}")
        return False

def test_interviewer_endpoints():
    """Test the interviewer chat endpoints"""
    print("\nTesting interviewer endpoints...")
    
    # Start a session
    print("1. Starting interview session...")
    response = requests.post(f"{BASE_URL}/interviewer/start")
    
    if response.status_code != 200:
        print(f"❌ Failed to start session: {response.status_code}")
        return False
    
    session_data = response.json()
    session_id = session_data['session_id']
    print(f"✅ Session started: {session_id}")
    
    # Send a test message
    print("2. Sending test message...")
    chat_data = {
        "session_id": session_id,
        "message": "Hello, this is a test message."
    }
    
    response = requests.post(
        f"{BASE_URL}/interviewer/chat",
        headers={"Content-Type": "application/json"},
        json=chat_data
    )
    
    if response.status_code != 200:
        print(f"❌ Failed to send message: {response.status_code}")
        print(f"Error: {response.text}")
        return False
    
    chat_response = response.json()
    print(f"✅ Message sent, received response: {chat_response['response'][:100]}...")
    
    # End the session
    print("3. Ending session...")
    end_data = {"session_id": session_id}
    
    response = requests.post(
        f"{BASE_URL}/interviewer/end",
        headers={"Content-Type": "application/json"},
        json=end_data
    )
    
    if response.status_code != 200:
        print(f"❌ Failed to end session: {response.status_code}")
        return False
    
    end_response = response.json()
    print(f"✅ Session ended, saved to: {end_response['filename']}")
    
    return True

def test_conclusions_endpoint():
    """Test the conclusions processing endpoint"""
    print("\nTesting conclusions endpoint...")
    
    response = requests.post(f"{BASE_URL}/conclusions")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Conclusions processed: {data['message']}")
        if data['results']:
            for result in data['results']:
                print(f"   - {result['conversation_file']}: {result['conclusions_count']} conclusions")
        return True
    elif response.status_code == 404:
        print("⚠️  No conversation files found for conclusions processing")
        return True
    else:
        print(f"❌ Failed to process conclusions: {response.status_code}")
        print(f"Error: {response.text}")
        return False

def test_assessment_endpoint():
    """Test the answer quality assessment endpoint"""
    print("\nTesting assessment endpoint...")
    
    # Create a simple test answers file
    test_answers = """1. This is a test answer about software development.
2. Another answer about project management and team coordination.
3. A response about technical challenges and solutions."""
    
    with open("test_answers.txt", "w") as f:
        f.write(test_answers)
    
    assessment_data = {
        "questions_file": "../biographer/ask_these.csv",
        "answers_file": "test_answers.txt",
        "output_file": "test_assessment_results.csv"
    }
    
    response = requests.post(
        f"{BASE_URL}/assess_quality",
        headers={"Content-Type": "application/json"},
        json=assessment_data
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Assessment completed: {data['message']}")
        print(f"   Output file: {data['output_file']}")
        print(f"   Summary: {data['summary']}")
        return True
    elif response.status_code == 404:
        print("⚠️  Required files not found for assessment")
        return True
    else:
        print(f"❌ Failed to run assessment: {response.status_code}")
        print(f"Error: {response.text}")
        return False

def test_invalid_endpoints():
    """Test error handling with invalid requests"""
    print("\nTesting error handling...")
    
    # Test invalid session
    response = requests.post(
        f"{BASE_URL}/interviewer/chat",
        headers={"Content-Type": "application/json"},
        json={"session_id": "invalid", "message": "test"}
    )
    
    if response.status_code == 400:
        print("✅ Invalid session properly rejected")
    else:
        print(f"❌ Invalid session not properly handled: {response.status_code}")
        return False
    
    # Test missing message
    response = requests.post(
        f"{BASE_URL}/interviewer/chat",
        headers={"Content-Type": "application/json"},
        json={"session_id": "test"}
    )
    
    if response.status_code == 400:
        print("✅ Missing message properly rejected")
    else:
        print(f"❌ Missing message not properly handled: {response.status_code}")
        return False
    
    return True

def main():
    """Run all tests"""
    print("Flask Interview Application Test Suite")
    print("=" * 50)
    
    tests = [
        test_health_check,
        test_interviewer_endpoints,
        test_conclusions_endpoint,
        test_assessment_endpoint,
        test_invalid_endpoints
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            if test():
                passed += 1
            else:
                failed += 1
        except requests.exceptions.ConnectionError:
            print(f"❌ Connection error - is the Flask app running on {BASE_URL}?")
            failed += 1
        except Exception as e:
            print(f"❌ Test failed with exception: {e}")
            failed += 1
        
        time.sleep(1)  # Brief pause between tests
    
    print("\n" + "=" * 50)
    print(f"Test Results: {passed} passed, {failed} failed")
    
    if failed == 0:
        print("🎉 All tests passed!")
    else:
        print("⚠️  Some tests failed. Check the output above.")
    
    # Cleanup
    try:
        import os
        if os.path.exists("test_answers.txt"):
            os.remove("test_answers.txt")
        if os.path.exists("test_assessment_results.csv"):
            os.remove("test_assessment_results.csv")
    except:
        pass

if __name__ == "__main__":
    main() 