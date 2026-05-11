# backend/app/main.py
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os

# ================= DATABASE =================
from app.database import Base, engine

# Register all models
from app import models

# ================= ROUTES =================
from app.routes import (
    auth_router,
    clinics_router,
    users_router,
)

from app.routes.patient import router as patient_router
from app.routes.record import router as record_router
from app.routes.ai_analysis import router as ai_analysis_router
from app.routes import access
from app.routes.admin_stats import router as admin_stats_router
from app.routes import audit_logs
from app.routes.organizations import router as organization_router

# ================= AI ROUTES =================
from app.ai.routes.eligibility_routes import router as ai_router
from app.ai.routes.chatbot_routes import router as chatbot_router

# ================= CREATE DATABASE TABLES =================
Base.metadata.create_all(bind=engine)


# ================= FASTAPI APP =================
app = FastAPI(
    title="MedSec Backend"
)


# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================= MAIN ROUTES =================
app.include_router(auth_router)
app.include_router(clinics_router)
app.include_router(users_router)
app.include_router(patient_router)
app.include_router(record_router)
app.include_router(access.router)
app.include_router(admin_stats_router)
app.include_router(audit_logs.router)
app.include_router(organization_router)

# ================= AI ROUTES =================
app.include_router(
    ai_router,
    prefix="/ai",
    tags=["AI"]
)

app.include_router(
    chatbot_router,
    prefix="/ai",
    tags=["AI Chatbot"]
)

app.include_router(
    ai_analysis_router,
    prefix="/ai-analysis",
    tags=["AI Analysis"]
)
# ================= STATIC FILES =================
UPLOAD_DIR = "uploads"

# Ensure uploads folder exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Serve uploaded files
app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads"
)