from fastapi import FastAPI
from app.database import expense_collection
from app.routes import expense
from fastapi.middleware.cors import CORSMiddleware
from app.routes.insights import router as insights



app = FastAPI()
app.include_router(expense.router)
app.include_router(insights)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(expense.router)