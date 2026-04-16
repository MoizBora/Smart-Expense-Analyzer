from fastapi import FastAPI
from database import expense_collection
from routes import expense
from fastapi.middleware.cors import CORSMiddleware
from routes.insights import router as insights



app = FastAPI()
@app.get("/")
def home():
    return {"message": "API is running"}
app.include_router(expense.router)
app.include_router(insights)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://smart-expense-analyzer-6xn6.vercel.app",
                   "http://localhost:3000",
                   "https://smart-expense-analyzer-backend.onrender.com",
                   "https://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(expense.router)