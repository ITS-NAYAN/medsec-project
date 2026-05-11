# engines/response_generator.py
# Generates friendly, conversational chatbot-style responses
# from the ranked eligibility results.
#
# The output is designed to be:
# - Easy to read by non-technical users
# - Ready to embed into any chatbot or web interface
# - Informative without being overwhelming

from typing import List, Dict
from app.ai.models.patient_model import PatientInput


def generate_chatbot_response(
    patient: PatientInput,
    ranked_schemes: List[Dict],
) -> str:
    """
    Generates a complete chatbot-style response for the patient.

    The response includes:
    - A personalised greeting
    - A summary of eligible schemes
    - Details for each scheme (benefit level, reasons, documents)
    - Application guidance
    - A fallback message if no schemes are found

    Args:
        patient: The validated patient profile.
        ranked_schemes: Schemes sorted by score from the ranking engine.

    Returns:
        A formatted multi-line string ready for display in a chatbot UI.
    """
    lines = []

    # ---- Greeting ----
    lines.append(f"Hello {patient.name},")
    lines.append("")

    if not ranked_schemes:
        # ---- No Eligible Schemes ----
        lines.append("We reviewed your healthcare profile and unfortunately, we could not find")
        lines.append("any eligible government schemes based on the information provided.")
        lines.append("")
        lines.append("This could be because:")
        lines.append("  • Your income exceeds the limit for available schemes")
        lines.append("  • Your condition may not be listed under current schemes")
        lines.append("  • Your state may not be covered by applicable schemes")
        lines.append("")
        lines.append("💡 Suggestions:")
        lines.append("  • Visit your nearest government hospital for a free consultation")
        lines.append("  • Contact your district health office for additional support")
        lines.append("  • Check the Ayushman Bharat portal: https://pmjay.gov.in")
        lines.append("")
        lines.append("Please update your health details or contact a health advisor for assistance.")
        return "\n".join(lines)

    # ---- Summary ----
    scheme_word = "scheme" if len(ranked_schemes) == 1 else "schemes"
    lines.append(
        f"Based on your healthcare profile, you may qualify for "
        f"{len(ranked_schemes)} government healthcare {scheme_word}."
    )
    lines.append("")

    # ---- Patient Profile Summary ----
    lines.append("📋 Your Health Profile Summary:")
    lines.append(f"  • Condition: {patient.disease.title()}")
    lines.append(f"  • Age: {patient.age} years")
    lines.append(f"  • State: {patient.state}")
    lines.append(f"  • Annual Income: ₹{patient.annual_income:,}")

    special_flags = []
    if patient.bpl:
        special_flags.append("BPL Card Holder")
    if patient.senior_citizen:
        special_flags.append("Senior Citizen")
    if patient.disability:
        special_flags.append("Person with Disability")
    if patient.pregnant:
        special_flags.append("Pregnant")

    if special_flags:
        lines.append(f"  • Special Status: {', '.join(special_flags)}")

    lines.append("")
    lines.append("─" * 50)
    lines.append("")

    # ---- Scheme Details ----
    lines.append("🏥 Eligible Healthcare Schemes (Best Match First):")
    lines.append("")

    for index, scheme in enumerate(ranked_schemes, start=1):
        benefit_icon = _get_benefit_icon(scheme["benefit_level"])
        lines.append(f"{index}. {scheme['scheme_name']}")
        lines.append(f"   {benefit_icon} Benefit Level: {scheme['benefit_level']}  |  Score: {scheme['total_score']}")
        lines.append("")

        # Description
        lines.append(f"   📌 About:")
        lines.append(f"   {_wrap_text(scheme['description'], width=70, indent='   ')}")
        lines.append("")

        # Why they qualify
        lines.append("   ✅ Why You Qualify:")
        for reason in scheme.get("matching_reasons", []):
            lines.append(f"      • {reason}")
        lines.append("")

        # Required documents
        if scheme.get("required_documents"):
            lines.append("   📂 Required Documents:")
            for doc in scheme["required_documents"]:
                lines.append(f"      • {doc}")
            lines.append("")

        # Special features
        features = []
        if scheme.get("emergency_support"):
            features.append("Emergency Coverage")
        if scheme.get("hospital_support"):
            features.append("Hospital Network Access")
        if features:
            lines.append(f"   🌟 Features: {' | '.join(features)}")
            lines.append("")

        lines.append("   " + "─" * 46)
        lines.append("")

    # ---- Application Guidance ----
    lines.append("📝 How to Apply:")
    lines.append("  1. Gather all required documents listed above")
    lines.append("  2. Visit your nearest government hospital or Common Service Centre (CSC)")
    lines.append("  3. Ask for the scheme application form or enrolment desk")
    lines.append("  4. For Ayushman Bharat, check eligibility at: https://pmjay.gov.in")
    lines.append("")

    lines.append("⚠️  Important Notes:")
    lines.append("  • This is an AI-assisted eligibility check — always verify with official sources")
    lines.append("  • Scheme availability and criteria may change; check with local health offices")
    lines.append("  • Emergency? Call 108 (National Ambulance Service) or 1800-180-1104 (Health Helpline)")
    lines.append("")

    lines.append("We hope this helps you access the care you deserve. 🙏")
    lines.append("Stay healthy, " + patient.name.split()[0] + "!")

    return "\n".join(lines)


def _get_benefit_icon(benefit_level: str) -> str:
    """Return an emoji icon for each benefit level."""
    icons = {
        "High":   "🟢",
        "Medium": "🟡",
        "Low":    "🔴",
    }
    return icons.get(benefit_level, "⚪")


def _wrap_text(text: str, width: int = 70, indent: str = "") -> str:
    """
    Simple word-wrapping for long description text.
    Keeps lines under `width` characters and adds `indent` prefix.

    Args:
        text: The text to wrap.
        width: Maximum line width (characters).
        indent: String prefix for continuation lines.

    Returns:
        Wrapped string with newlines and indentation.
    """
    words = text.split()
    lines = []
    current_line = ""

    for word in words:
        # +1 for the space between words
        if len(current_line) + len(word) + 1 <= width:
            current_line += (" " if current_line else "") + word
        else:
            if current_line:
                lines.append(indent + current_line)
            current_line = word

    if current_line:
        lines.append(indent + current_line)

    return "\n".join(lines)
