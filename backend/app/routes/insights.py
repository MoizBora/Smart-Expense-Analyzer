from fastapi import APIRouter
from database import expense_collection

router = APIRouter()

@router.get("/insights")
def get_insights():
    expenses = list(expense_collection.find())

    if not expenses:
        return {
            "total_spending": 0,
            "category_breakdown": {},
            "highest_spending_category": None,
            "total_transactions": 0,
            "average_spending": 0
        }

    total = sum(float(e.get("amount", 0)) for e in expenses)

    category_breakdown = {}
    for e in expenses:
        cat = e.get("category", "Other")
        amount = float(e.get("amount", 0))
        category_breakdown[cat] = category_breakdown.get(cat, 0) + amount

    # FIX for max error
    highest_category = max(category_breakdown, key=lambda k: category_breakdown[k])

    total_transactions = len(expenses)
    average_spending = total / total_transactions

    return {
        "total_spending": total,
        "category_breakdown": category_breakdown,
        "highest_spending_category": highest_category,
        "total_transactions": total_transactions,
        "average_spending": average_spending
    }

@router.get("/prediction")
def get_prediction():
    expenses = list(expense_collection.find())

    if not expenses:
        return {"predicted_spending": 0}

    # total spending
    total = sum(float(e.get("amount", 0)) for e in expenses)

    # simple prediction = average * 30 days
    total_transactions = len(expenses)
    avg = total / total_transactions if total_transactions > 0 else 0

    predicted_spending = avg * 30

    return {
        "predicted_spending": round(predicted_spending, 2)
    }

