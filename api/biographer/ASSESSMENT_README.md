# Answer Quality Assessment Tool

This tool uses CrewAI and Anthropic's Claude to automatically assess how well answers respond to specific questions. It evaluates each answer and assigns a quality rating: "full answer", "partial answer", or "0" (no answer).

## Features

- 🤖 **AI-Powered Assessment**: Uses Anthropic's Claude via CrewAI for intelligent evaluation
- 📊 **Batch Processing**: Evaluates multiple questions at once
- 📈 **Quality Ratings**: Three-tier assessment system (full/partial/none)
- 📄 **CSV Output**: Results saved in an easy-to-analyze format
- 🔧 **Flexible Input**: Supports various question and answer file formats

## Installation

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up Anthropic API Key**:
   ```bash
   export ANTHROPIC_API_KEY="your-api-key-here"
   ```
   
   Or create a `.env` file:
   ```
   ANTHROPIC_API_KEY=your-api-key-here
   ```

## Usage

### Command Line Interface

```bash
python answer_quality_assessor.py <questions_file> <answers_file> [options]
```

**Arguments:**
- `questions_file`: Path to CSV file containing questions
- `answers_file`: Path to text file containing answers

**Options:**
- `--output`, `-o`: Output CSV file path (optional)
- `--api-key`: Anthropic API key (optional if set in environment)

**Example:**
```bash
python answer_quality_assessor.py ask_these.csv conversation_2205_1957_4817_conclusions.txt --output results.csv
```

### Python Script Usage

```python
from answer_quality_assessor import AnswerQualityAssessor

# Initialize assessor
assessor = AnswerQualityAssessor()

# Run assessment
output_file = assessor.process_assessment(
    questions_file="ask_these.csv",
    answers_file="conversation_conclusions.txt",
    output_file="assessment_results.csv"
)
```

### Quick Example

Run the example script:
```bash
python example_usage.py
```

## Input File Formats

### Questions File (CSV)
The questions file should be a CSV with at least a "Question" column:

```csv
Category,Field,Question
Personal History,Early Childhood Memories,What is your earliest memory from childhood?
Personal History,Early Childhood Memories,Can you describe the home where you grew up in detail?
```

### Answers File (Text)
The answers file should contain numbered answers or plain text:

```
1. Ariel's earliest childhood memory involves playing with friends when they lost a football on a shed rooftop.

2. The house had three bedrooms and a large backyard with an oak tree.
```

## Output Format

The tool generates a CSV file with the original questions plus an "Answer_Quality" column:

```csv
Category,Field,Question,Answer_Quality
Personal History,Early Childhood Memories,What is your earliest memory from childhood?,full answer
Personal History,Early Childhood Memories,Can you describe the home where you grew up in detail?,0
```

## Assessment Criteria

The AI agent evaluates answers based on:

- **"full answer"**: Complete and thorough response with specific details
- **"partial answer"**: Partially addresses the question but lacks completeness
- **"0"**: No relevant answer found or doesn't address the question

## Example Assessment

**Question**: "What is your earliest memory from childhood?"

**Answer**: "Ariel's earliest childhood memory involves playing with friends when they lost a football on a shed rooftop. While trying to knock it down by throwing objects at it, one of the children threw a Lego piece which hit Ariel in the forehead, causing a bleeding wound."

**Assessment**: "full answer" - Provides a specific, detailed childhood memory with context and narrative.

## Troubleshooting

### Common Issues

1. **API Key Error**:
   ```
   ValueError: ANTHROPIC_API_KEY must be provided
   ```
   **Solution**: Set your Anthropic API key as an environment variable or pass it as a parameter.

2. **File Not Found**:
   ```
   Error loading questions file: [Errno 2] No such file or directory
   ```
   **Solution**: Check that your input files exist and paths are correct.

3. **Import Errors**:
   ```
   ModuleNotFoundError: No module named 'crewai'
   ```
   **Solution**: Install dependencies with `pip install -r requirements.txt`

### Performance Tips

- The assessment process may take time for large question sets due to AI processing
- Each question is evaluated individually for accuracy
- Consider running smaller batches for initial testing

## Dependencies

- `anthropic`: Anthropic API client
- `pandas`: Data manipulation and CSV handling
- `crewai`: AI agent framework
- `crewai-tools`: Additional CrewAI tools
- `python-dotenv`: Environment variable management

## License

This tool is provided as-is for assessment purposes. Make sure to comply with Anthropic's API usage terms and conditions. 