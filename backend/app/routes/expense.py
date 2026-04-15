from fastapi import APIRouter
from schemas.expense import Expense
from database import expense_collection
from utils.categorize import categorize
from ml_model.predict import predict_category

router = APIRouter()

@router.post("/expense")
def add_expense(expense: Expense):
    desc = expense.description
    
    # 1. Logic: Check keywords first, then AI
    final_category = categorize(desc)
    if final_category == "Other":
        final_category = predict_category(desc)
        
    expense_dict = expense.dict()
    expense_dict["category"] = final_category 
    
    # 2. Save to Database
    result = expense_collection.insert_one(expense_dict)
    
    # 3. THE FIX: Convert the newly created _id to a string 
    # so FastAPI doesn't crash during the return
    expense_dict["_id"] = str(result.inserted_id)
    
    return {"message": "Success", "data": expense_dict}

@router.get("/expense")
def get_expenses():
    expenses = list(expense_collection.find().sort("date", -1))
    
    for expense in expenses:
        expense["_id"] = str(expense["_id"])
    
    return expenses

@router.delete("/expenses/reset")
def reset_expenses():
    try:
        # This deletes every document in the collection
        expense_collection.delete_many({})
        return {"message": "All data cleared successfully"}
    except Exception as e:
        return {"error": str(e)}, 500