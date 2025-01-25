import openai
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Initialize Flask app
app = Flask(__name__)

# Function to get a response from GPT
def get_gpt_response(prompt, model="gpt-4", max_tokens=200):
    openai.api_key = OPENAI_API_KEY
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=max_tokens
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        return str(e)

# Define an API endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    response = get_gpt_response(prompt)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)

