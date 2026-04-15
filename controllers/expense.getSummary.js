import wrapper from "../utils/catchWrapper.js";
import parseBody from "../utils/parseBody.js";
import { getSummary } from "../services/expenseOperations.service.js";
import getUserIdByToken from "./user.idbytoken.js";

export default wrapper(async (req, res) => {
  let data = await parseBody(req);
  data.token = await getUserIdByToken(req.headers.cookie);

  const summary = await getSummary(data);

  res.statusCode = 200;
  res.end(JSON.stringify(summary));
  return;
});
