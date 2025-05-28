# API Setup

## Environment Variables

This API requires environment variables to be set up properly.

### Setup Instructions

1. Copy the example environment file:
   ```bash
   cp environment.env.example environment.env
   ```

2. Edit `environment.env` and add your actual Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

3. Get your Anthropic API key from: https://console.anthropic.com/

### Required Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key for accessing Claude models

### Security Note

- Never commit the `environment.env` file to version control
- The `.gitignore` file is configured to exclude environment files
- Only commit the `environment.env.example` file as a template 