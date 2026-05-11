"""
MedSec - Gemini AI Service
Handles all communication with Google Gemini API for medical report analysis
"""

from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables
load_dotenv()

# Get API key from .env
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Check if API key exists
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in your .env file!")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Gemini model
# gemini-1.5-flash is fast and free-tier friendly
model = genai.GenerativeModel("gemini-1.5-flash")


def summarize_medical_report(report_text: str) -> dict:
    """
    Send the extracted PDF text to Gemini and get:
    - A plain-language summary
    - List of diseases found
    - List of medicines prescribed

    Args:
        report_text: Text extracted from the PDF medical report

    Returns:
        Dictionary with summary, diseases, and medicines
    """

    prompt = f"""
You are an expert medical AI assistant. Analyze the following medical report and provide:

1. SUMMARY: A clear, simple summary of the medical report in 3-5 sentences.
2. DISEASES: List all diseases, conditions, or diagnoses mentioned (comma-separated).
3. MEDICINES: List all medicines, drugs, or prescriptions mentioned (comma-separated).

Format your response EXACTLY like this:

SUMMARY: [your summary here]
DISEASES: [disease1, disease2, ...]
MEDICINES: [medicine1, medicine2, ...]

If no diseases or medicines are found, write "None found" for that section.

Medical Report:
{report_text[:8000]}
"""

    try:
        response = model.generate_content(prompt)

        response_text = response.text

        # Default values
        summary = ""
        diseases = "None found"
        medicines = "None found"

        # Parse AI response
        lines = response_text.split("\n")

        for line in lines:
            line = line.strip()

            if line.startswith("SUMMARY:"):
                summary = line.replace("SUMMARY:", "").strip()

            elif line.startswith("DISEASES:"):
                diseases = line.replace("DISEASES:", "").strip()

            elif line.startswith("MEDICINES:"):
                medicines = line.replace("MEDICINES:", "").strip()

        # Fallback if summary parsing fails
        if not summary:
            summary = response_text

        return {
            "summary": summary,
            "diseases": diseases,
            "medicines": medicines,
            "full_response": response_text
        }

    except Exception as e:
        return {
            "summary": f"AI analysis failed: {str(e)}",
            "diseases": "Could not extract",
            "medicines": "Could not extract",
            "full_response": str(e)
        }


def answer_medical_question(report_text: str, question: str) -> str:
    """
    Answer a doctor's specific question about a medical report using Gemini.

    Args:
        report_text: Text extracted from the PDF medical report
        question: The doctor's question about the report

    Returns:
        Gemini's answer as a string
    """

    prompt = f"""
You are an expert medical AI assistant helping a doctor understand a patient's medical report.

The doctor has asked:

"{question}"

Please answer the question clearly and accurately based ONLY on the information in the medical report below.

If the answer is not found in the report, say:
"This information is not available in the provided report."

Keep your answer concise and professional.

Medical Report:
{report_text[:8000]}
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"AI could not answer this question: {str(e)}"


def quick_chat(question: str) -> str:
    """
    Answer a general medical question without a specific report context.

    Args:
        question: Any medical question

    Returns:
        Gemini's answer
    """

    prompt = f"""
You are a helpful medical AI assistant for healthcare professionals.

Answer the following question clearly and professionally:

{question}

Note:
Always recommend consulting a licensed medical professional for clinical decisions.
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"AI error: {str(e)}"