"""
MedSec - PDF Text Extraction Service
Uses PyMuPDF (fitz) to extract text from uploaded PDF medical reports
"""

import fitz  # PyMuPDF library - imported as fitz


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract all text from a PDF file.
    
    Args:
        file_path: Full path to the PDF file
        
    Returns:
        Extracted text as a single string
    """
    try:
        # Open the PDF file
        pdf_document = fitz.open(file_path)
        
        extracted_text = ""
        
        # Loop through each page and extract text
        for page_num in range(len(pdf_document)):
            page = pdf_document[page_num]
            page_text = page.get_text()
            extracted_text += f"\n--- Page {page_num + 1} ---\n"
            extracted_text += page_text
        
        # Close the document
        pdf_document.close()
        
        # Clean up extra whitespace
        extracted_text = extracted_text.strip()
        
        if not extracted_text:
            return "No text could be extracted from this PDF. It may be an image-based PDF."
        
        return extracted_text

    except Exception as e:
        # Return error message so the user knows what went wrong
        return f"Error extracting text from PDF: {str(e)}"


def get_pdf_page_count(file_path: str) -> int:
    """
    Get the number of pages in a PDF file.
    
    Args:
        file_path: Full path to the PDF file
        
    Returns:
        Number of pages
    """
    try:
        pdf_document = fitz.open(file_path)
        count = len(pdf_document)
        pdf_document.close()
        return count
    except Exception:
        return 0
