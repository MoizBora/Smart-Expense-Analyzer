from fastapi import APIRouter
from app.database import expense_collection
router = APIRouter()

@router.get("/insights")
def get_insights():
    expenses = list(expense_collection.find())

    total = sum(e["amount"] for e in expenses)

    category_breakdown = {}
    for e in expenses:
        cat = e["category"]
        category_breakdown[cat] = category_breakdown.get(cat, 0) + e["amount"]

    return {
        "total_spending": total,
        "category_breakdown": category_breakdown
    }