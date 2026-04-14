import axios from "axios";

const BASE_URL = "http://localhost:8000";

// GET all expenses
export const getExpenses = () => {
  return axios.get(`${BASE_URL}/expense`);
};

// POST expense
export const addExpense = (data) => {
  return axios.post(`${BASE_URL}/expense`, {
    ...data,
    amount: Number(data.amount),
  });
};

// GET insights
export const getInsights = () => {
  return axios.get(`${BASE_URL}/insights`);
};

export const getPrediction = () => {
  return axios.get(`${BASE_URL}/prediction`);
};

export const resetAllExpenses = async () => {
  const response = await fetch("http://localhost:8000/expenses/reset", {
    method: "DELETE",
  });
  return response.json();
};