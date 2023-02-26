import { config as configureEnvVars } from "dotenv";
import jwt from "jsonwebtoken";
import moment from "moment";

export async function auth(request, response, next) {
  configureEnvVars();

  //try {
  //const { usertoken: cookieAuth } = request.cookies;

  //console.log("auth: ", cookieAuth)


  try {
    console.log("token: ", request.headers.authorization)
    if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
      return response.status(401).send({ message: "Not Authorized" });
    }
    const userToken = request.headers.authorization.split('Bearer ')[1];
    const token = jwt.verify(userToken, process.env.PRIVATE_KEY);
    request.token = token
    if (token.iat <= moment().unix()) {
      return response.send({
        message: "Session expired",
      });
    }
    //request.user.id=token.id
    next();
  } catch (error) {
    return response.status(401).send({
      message: error,
    });
  }
  /*} catch (error) {
    response.status(500).send({
      message: "authentication process failed"
    });
  }*/
}