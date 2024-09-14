from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import PyPDF2
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

app = Flask(__name__)
CORS(app, resources={r"/generate-resume": {"origins": "https://verbaflo-ai.vercel.app/"}})

@app.route('/generate-resume', methods=['POST'])
def generate_resume():
    try:
        # Get the API key from the request
        api_key = request.form.get('api_key')
        if not api_key:
            return jsonify({"error": "API key is required"}), 400

        # Configure the Gemini API with the provided key
        genai.configure(api_key=api_key)

        file = request.files['file']
        
        if not file or not allowed_file(file.filename):
            return jsonify({"error": "Invalid file. Please upload a PDF."}), 400
        
        filename = secure_filename(file.filename)
        file_path = os.path.join('uploads', filename)
        file.save(file_path)
        
        # Process PDF and generate HTML
        resume_html = process_pdf(file_path)
        
        # Save HTML to file
        html_path = os.path.join('output', 'resume.html')
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(resume_html)
        
        return send_file(html_path, as_attachment=True)
    
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'pdf'

def process_pdf(file_path):
    # Extract text from PDF
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    
    # Use Gemini to generate HTML
    model = genai.GenerativeModel('gemini-pro')
    prompt = f"""
    Generate an HTML resume from the following text extracted from a LinkedIn PDF:

    {text}

    The HTML should be a complete, well-structured document with appropriate styling. 
    Include sections for personal information, summary, experience, education, and skills.
    Use modern, professional CSS styling within a <style> tag in the HTML.
    """

    safety_settings = {
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    }

    response = model.generate_content(
        prompt,
        safety_settings=safety_settings,
        generation_config=genai.types.GenerationConfig(
            temperature=0.2,
            top_p=1,
            top_k=1,
            max_output_tokens=2048,
        )
    )

    return response.text

if __name__ == '__main__':
    app.run(debug=True)