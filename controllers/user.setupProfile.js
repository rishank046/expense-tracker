import wrapper from "../utils/catchWrapper.js";
import parseData from "../utils/parseBody.js";
import { setupProfile } from "../services/userOperations.service.js";
import idByToken from "../controllers/user.idbytoken.js";

export default wrapper(async (req, res) => {
  let data = await parseData(req);
  data.token = await idByToken(req.header.cookie);

  await setupProfile(data);

  res.statusCode = 200;
  res.end();
  return;
});
