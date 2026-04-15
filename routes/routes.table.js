import addExpense from "../controllers/user.addexpense.js";
import getExpense from "../controllers/user.getexpense.js";
import filterExpenseByAmount from "../controllers/expense.filterbyamount.js";
import logIn from "../controllers/user.login.js";
import register from "../controllers/user.signin.js";
import deleteExpense from "../controllers/expense.delete.js";
import updateExpense from "../controllers/expense.update.js";
import getSummary from "../controllers/expense.getSummary.js";
import setupProfile from "../controllers/user.setupProfile.js";

const routesObj = {
  GET: {
    "/getExpense": getExpense,
    "/filterExpense": filterExpenseByAmount,
    "/getSummary": getSummary,
  },
  POST: {
    "/addExpense": addExpense,
    "/logIn": logIn,
    "/register": register,
    "/deleteExpense": deleteExpense,
    "/updateExpense": updateExpense,
    "/setupProfile": setupProfile,
  },
  HEAD: {},
  PATCH: {},
  DELETE: {},
  OPTIONS: {},
};

export default routesObj;
