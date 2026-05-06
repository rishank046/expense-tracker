import * as userServices from "../services/userOperations.service.js";
import parseBody from "../utils/parseBody.js";

export default async function (req, res) {
  const body = await parseBody(req);
  const url = req.url;
  switch (url) {
    // case to handle login
    case "/logIn":
      const token = await userServices.userLogIn(body);

      res.writeHead(200, {
        "Set-Cookie": `token=${token}; Max-Age=43200; Path=/; HttpOnly; Secure;`,
        "Access-Controll-Origin-Credentials": "true",
      });
      res.end();
      return;

    // case to register function
    case "/register":
      await userSignIn(body);

      res.statusCode = 200;
      res.end();
      return;
    // case to setup profile function
    case "setupProfile":
      body.token = await idByToken(req.header.cookie);

      await setupProfile(body);

      res.statusCode = 200;
      res.end();
      return;
  }
}
