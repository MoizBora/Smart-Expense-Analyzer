from fastapi import APIRouter
from app.schemas.expense import Expense
from app.database import expense_collection

router = APIRouter()

@router.post("/expense")
def add_expense(expense: Expense):
    print("API HIT")  # 👈 ADD THIS LINE
    expense_dict = expense.dict()
    expense_collection.insert_one(expense_dict)
    return {"message": "Expense added successfully"}

@router.get("/expense")
def get_expenses():
    expenses = list(expense_collection.find())
    
    for expense in expenses:
        expense["_id"] = str(expense["_id"])
    
    return expenses