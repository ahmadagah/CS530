from flask import Blueprint, request, jsonify
import openai
import os

mood_bp = Blueprint('mood', __name__)

# Load OpenAI API key from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

@mood_bp.route('/analyze', methods=['POST'])
def analyze_mood():
    # Get user input from request
    user_input = request.json.get('input', "")
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    # Use OpenAI to analyze the mood
    openai.api_key = OPENAI_API_KEY
    prompt = f"Based on this input: '{user_input}', determine the mood and suggest up to 3 music genres."
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=50
        )
        analysis = response.choices[0].text.strip()
        return jsonify({"analysis": analysis})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
