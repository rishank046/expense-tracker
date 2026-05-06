import filterExpenseByAmount from "../controllers/expense.filterbyamount.js";
import userController from "../controllers/user.controller.js";
import expenseController from "../controllers/expense.controller.js";

const routesObj = {
  GET: {
    "/getExpense": expenseController,
    "/filterExpense": filterExpenseByAmount,
    "/getSummary": expenseController,
  },
  POST: {
    "/addExpense": expenseController,
    "/logIn": userController,
    "/register": userController,
    "/deleteExpense": expenseController,
    "/updateExpense": expenseController,
    "/setupProfile": userController,
  },
  HEAD: {},
  PATCH: {},
  DELETE: {},
  OPTIONS: {},
};

export default routesObj;
