from pydantic import BaseModel

class Expense(BaseModel):
    description: str
    amount: float
    category: str
    date: str