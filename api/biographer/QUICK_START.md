# 🚀 Quick Start Guide - Answer Quality Assessor

## What This Does
Automatically evaluates how well your answers respond to specific questions using AI. Each answer gets rated as:
- **"full answer"** - Complete and thorough response
- **"partial answer"** - Addresses the question but lacks details
- **"0"** - No relevant answer found

## 🏃‍♂️ Quick Setup (2 minutes)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Get Your API Key
- Go to [https://console.anthropic.com/](https://console.anthropic.com/)
- Sign up/login and create an API key
- Set it in your environment:
```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

### 3. Run Assessment
```bash
# Using your existing files
python3 answer_quality_assessor.py ask_these.csv conversation_2205_1957_4817_conclusions.txt

# Or use the example script
python3 example_usage.py
```

## 📁 Your Files
- **Questions**: `ask_these.csv` (14 questions loaded ✅)
- **Answers**: `conversation_2205_1957_4817_conclusions.txt` (ready ✅)
- **Output**: Will create `ask_these_assessed.csv` with quality ratings

## 🛠️ Alternative Setup
If you prefer interactive setup:
```bash
python3 setup_api_key.py
```

## 📊 Expected Output
Your results will look like:
```csv
Category,Field,Question,Answer_Quality
Personal,Memory,"What is your earliest memory?","full answer"
Personal,Description,"Describe your childhood home","partial answer"
...
```

## 🆘 Need Help?
- Run `python3 test_assessor.py` to test everything
- Check `ASSESSMENT_README.md` for detailed documentation
- Make sure your API key is set correctly

**Ready to go!** 🎉 