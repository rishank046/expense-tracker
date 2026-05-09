import db from "../db/database.connect.js";
import {
  ADD_EXPENSE,
  GET_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  GET_SUMMARY,
} from "../model/database.queries.js";

export async function createExpense(data) {
  const { amount, description, token, categoryId } = data;

  // add expense to the database
  await db.query(ADD_EXPENSE, [categoryId, token, amount, description]);
}

export async function getExpense(data) {
  const { token } = data;

  let [row] = await db.query(GET_EXPENSE, [token]);

  return row;
}

export async function deleteExpense(data) {
  await db.query(DELETE_EXPENSE, [data?.expenseId]);
}

export async function updateExpense(data) {
  await db.query(UPDATE_EXPENSE, [data.column, data.value, data.expenseId]);
}

export async function getSummary(data) {
  let [summary] = await db.query(GET_SUMMARY, [
    data.token,
    data.startDate,
    data.endDate,
  ]);

  return summary;
}
