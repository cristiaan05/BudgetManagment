import { config as configureEnvVars } from "dotenv";
import jwt from "jsonwebtoken";
import moment from "moment";

export async function auth(request, response, next) {
  configureEnvVars();

  try {
    const { authorization: cookieAuth } = request.cookies;
    console.log(request.cookies)
    if (!cookieAuth) {
      return response.status(401).send({ message: "Not Authorized" });
    }

    try {
      const token = jwt.verify(cookieAuth, process.env.PRIVATE_KEY);
      request.token = token
      if (token.iat <= moment().unix()) {
        return response.send({
          message: "Session expired",
        });
      }
      //request.user.id=token.id
      next();
    } catch (error) {
      response.status(401).send({
        error,
      });
    }
  } catch (error) {
    response.status(500).send({
      message: "authentication process failed"
    });
  }
}