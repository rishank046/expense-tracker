import * as expenseOperations from "../services/expenseOperations.service.js";
import parseBody from "../utils/parseBody.js";
import idByToken from "../controllers/user.idbytoken.js";
import wrapper from "../utils/catchWrapper.js";

export default wrapper(async function (req, res) {
  let data = await parseBody(req);
  const url = req.url;
  const token = await idByToken(req.headers.cookie);

  switch (url) {
    case "/addExpense":
      data.token = token;
      if (
        !data?.amount ||
        !data?.token ||
        !data?.description ||
        !data?.categoryId
      ) {
        let error = new Error();
        error.code = "Missing_Required_Fields";
        throw error;
      }
      await expenseOperations.createExpense(data);

      res.statusCode = 200;
      res.end();
      return;
    case "/deleteExpense":
      await expenseOperations.deleteExpense(data);

      if (!data || !data?.expenseId) {
        let error = new Error();
        error.code = "Missing_Required_Fields";
        throw error;
      }
      res.statusCode = 200;
      res.end();
      return;
    case "/updateExpense":
      await updateExpense(data);
      if (!data?.expenseId || !data?.column || !data?.value) {
        let error = new Error();
        error.code = "Missing_Required_Fields";
        throw error;
      }
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
      data.token = token;
      if (!data?.startDate || !data?.endDate) {
        let error = new Error();
        error.code = "Missing_Required_Fields";
        throw error;
      }
      if (!data?.token) {
        let error = new Error();
        error.code = "Unauthorized";
        throw error;
      }
      const summary = await getSummary(data);

      res.statusCode = 200;
      res.end(JSON.stringify(summary));
      return;
    default:
      let error = new Error();
      error.code = "NO_RESOURCE_FOUND";
      throw error;
  }
});
