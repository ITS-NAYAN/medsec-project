# MedSec Eligibility AI 🏥

> AI-powered healthcare scheme eligibility engine for Indian government health programmes.

MedSec Eligibility AI is a lightweight FastAPI backend that accepts patient healthcare details, checks eligibility against Indian government healthcare schemes, ranks the most beneficial options, and returns structured JSON responses with chatbot-style guidance.

---

## 📋 Project Overview

| Feature | Description |
|---|---|
| **Input** | Patient demographics, income, disease, state, and special status flags |
| **Engine** | Modular eligibility + ranking logic (no LLMs, no agents) |
| **Output** | Ranked schemes, scores, benefit levels, and chatbot-style guidance |
| **Data** | 12 realistic Indian government schemes in a local JSON file |
| **Tech** | Python 3, FastAPI, Pydantic |

---

## 🗂️ Project Structure

```
medsec-ai/
│
├── main.py                     # FastAPI app entry point
├── requirements.txt            # Python dependencies
├── README.md                   # This file
│
├── data/
│   └── schemes.json            # Government scheme definitions
│
├── models/
│   ├── patient_model.py        # Patient input schema + validation
│   └── response_model.py       # API response schema
│
├── engines/
│   ├── eligibility_engine.py   # Core eligibility checking logic
│   ├── ranking_engine.py       # Scoring and ranking logic
│   └── response_generator.py   # Chatbot-style response builder
│
├── routes/
│   └── eligibility_routes.py   # FastAPI route definitions
│
└── utils/
    └── scoring_utils.py        # Reusable helper functions
```

---

## ⚙️ Installation

### 1. Clone / Download the project

```bash
git clone https://github.com/your-org/medsec-ai.git
cd medsec-ai
```

### 2. Create a virtual environment

```bash
# Create the virtual environment
python3 -m venv venv

# Activate it (Linux / macOS)
source venv/bin/activate

# Activate it (Windows)
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the development server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see:

```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Application startup complete.
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Welcome message and endpoint list |
| `POST` | `/api/v1/check-eligibility` | Check patient eligibility ✅ |
| `GET` | `/api/v1/schemes` | List all available schemes |
| `GET` | `/api/v1/health` | Server health check |
| `GET` | `/docs` | Swagger interactive API docs |
| `GET` | `/redoc` | ReDoc API documentation |

---

## 🧪 Testing the API

### Option A: Swagger UI (recommended for beginners)

Open your browser and go to:
```
http://localhost:8000/docs
```

Click on `POST /api/v1/check-eligibility` → "Try it out" → paste the sample request → "Execute".

---

### Option B: curl (terminal)

```bash
curl -X POST "http://localhost:8000/api/v1/check-eligibility" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Raj Sharma",
       "age": 62,
       "gender": "male",
       "state": "Maharashtra",
       "annual_income": 150000,
       "disease": "kidney disease",
       "bpl": true,
       "disability": false,
       "pregnant": false,
       "senior_citizen": true
     }'
```

---

### Option C: Python requests

```python
import requests

payload = {
    "name": "Raj Sharma",
    "age": 62,
    "gender": "male",
    "state": "Maharashtra",
    "annual_income": 150000,
    "disease": "kidney disease",
    "bpl": True,
    "disability": False,
    "pregnant": False,
    "senior_citizen": True,
}

response = requests.post("http://localhost:8000/api/v1/check-eligibility", json=payload)
print(response.json())
```

---

## 📥 Sample Request

```json
{
  "name": "Raj Sharma",
  "age": 62,
  "gender": "male",
  "state": "Maharashtra",
  "annual_income": 150000,
  "disease": "kidney disease",
  "bpl": true,
  "disability": false,
  "pregnant": false,
  "senior_citizen": true
}
```

---

## 📤 Sample Response (abbreviated)

```json
{
  "patient_name": "Raj Sharma",
  "total_eligible_schemes": 5,
  "chatbot_response": "Hello Raj Sharma,\n\nBased on your healthcare profile, you may qualify for 5 government healthcare schemes...",
  "ranked_schemes": [
    {
      "scheme_name": "PM National Dialysis Programme",
      "description": "Provides free dialysis services to BPL patients...",
      "benefit_level": "High",
      "total_score": 137,
      "matching_reasons": [
        "Age 62 is within the eligible range (0–100 years)",
        "Annual income ₹1,50,000 is within the limit (≤ ₹2,50,000)",
        "Your condition 'kidney disease' is covered under this scheme",
        "This is a national scheme available in all states including Maharashtra",
        "Patient holds BPL status as required by this scheme",
        "Senior citizen support is available under this scheme",
        "Emergency medical coverage is included",
        "Treatment available at empanelled hospitals"
      ],
      "required_documents": [
        "Aadhaar Card",
        "BPL Card",
        "Medical Certificate from nephrologist",
        "Income Certificate"
      ],
      "hospital_support": true,
      "emergency_support": true,
      "supported_states": ["All"]
    }
  ],
  "ineligible_summary": null
}
```

---

## 🔍 Eligibility Logic

| Check | Rule |
|---|---|
| **Age** | Must fall within scheme's `min_age`–`max_age` range |
| **Income** | `annual_income` must be ≤ scheme's `max_income` |
| **Disease** | Partial string match against `diseases_covered` |
| **State** | State must be in `supported_states` or scheme covers `"All"` |
| **Gender** | Must match `gender_requirement` (or be `"any"`) |
| **BPL** | If `bpl_required = true`, patient must have `bpl = true` |

---

## 📊 Ranking Score Weights

| Factor | Score |
|---|---|
| Disease relevance | +40 |
| Income well below limit | +25 |
| State specifically listed | +20 |
| Emergency coverage | +15 |
| BPL match | +15 |
| Disability match | +12 |
| Pregnancy match | +12 |
| Senior citizen support | +10 |
| Base scheme benefit score | up to +20 |

**Benefit Levels:** `High` (≥80) · `Medium` (≥50) · `Low` (<50)

---

## 🏛️ Schemes Included

1. Ayushman Bharat – PM-JAY
2. PM National Dialysis Programme
3. Rashtriya Arogya Nidhi (RAN)
4. National Cancer Control Programme
5. Pradhan Mantri Matru Vandana Yojana (PMMVY)
6. Janani Suraksha Yojana (JSY)
7. National Programme for Senior Citizens (NAPSrC)
8. Disability Healthcare Support Scheme (DHSS)
9. Mahatma Jyotiba Phule Jan Arogya Yojana (MJPJAY) — Maharashtra
10. Tamil Nadu Chief Minister Health Insurance Scheme (CMCHIS)
11. Aam Aadmi Bima Yojana (AABY)
12. National Mental Health Programme (NMHP)

---

## ✅ Input Validation Rules

| Field | Validation |
|---|---|
| `name` | Required, 2–100 characters |
| `age` | Required, 0–120 |
| `gender` | Must be `"male"`, `"female"`, or `"other"` |
| `state` | Required, min 2 chars |
| `annual_income` | Required, ≥ 0 |
| `disease` | Required, min 2 chars |
| `bpl`, `disability`, `pregnant`, `senior_citizen` | Boolean |
| `pregnant` | Can only be `true` for `gender = "female"` |

---

## 🔮 Future Integration Notes

This module is designed to integrate cleanly with the broader MedSec platform:

- **Authentication layer** can be added to `main.py` via FastAPI middleware
- **Database** (PostgreSQL/MongoDB) can replace `schemes.json` by swapping `load_schemes()` in `eligibility_routes.py`
- **LLM chatbot** can consume the `chatbot_response` field for enhanced conversations
- **Frontend** (React/Next.js) can call `POST /api/v1/check-eligibility` directly

---

## 🚨 Disclaimer

> This tool provides AI-assisted eligibility estimates for educational and guidance purposes only. Always verify eligibility with official government sources. For Ayushman Bharat: https://pmjay.gov.in

---

*Built with ❤️ for accessible healthcare in India.*
