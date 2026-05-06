import * as expenseOperations from "../services/expenseOperations.service.js";
import parseBody from "../utils/parseBody.js";
import idByToken from "../controllers/user.idbytoken.js";

export default async function (req, res) {
  let data = await parseBody(req);
  const url = req.url;
  const token = await idByToken(req.headers.cookie);

  switch (url) {
    case "/addExpense":
      data.token = token;

      await expenseOperations.createExpense(data);

      res.statusCode = 200;
      res.end();
      return;
    case "/deleteExpense":
      await expenseOperations.deleteExpense(data);

      res.statusCode = 200;
      res.end();
      return;
    case "/updateExpense":
      await updateExpense(data);

      res.statusCode = 200;
      res.end();
      return;
    case "/getExpense":
      data.token = token;

      let expenses = await expenseOperations.getExpense(data);

      res.statusCode = 200;
      res.end(JSON.stringify(expenses));
      return;
    case "/filterExpense":
    case "/getSummary":
      const summary = await getSummary(data);

      res.statusCode = 200;
      res.end(JSON.stringify(summary));
      return;
    default:
      let error = new Error();
      error.code = "NO_RESOURCE_FOUND";
      throw error;
  }
}
