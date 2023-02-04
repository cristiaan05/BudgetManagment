import bcrypt from "bcrypt";
import { config as configureEnvVars } from "dotenv";
import jwt from "jsonwebtoken";
import moment from "moment";
import User from "../models/User.js";

export async function signUp(request, response) {
  configureEnvVars();
  try {
    if (!request.body.email || !request.body.password || !request.body.lastname || !request.body.name) {
      return response.status(400).send({
        message: "user data is missing",
      });
    }

    const { name, lastname, email, password } = request.body;

    const userAlreadyExists = await User.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      return response
        .status(400)
        .send({ message: "user already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.build({
      name,
      lastname,
      email,
      password: passwordHash,
    }).save();

    response.send({
      message: "User Created Successfully",
      user: user.getDataValue("id")
    });

  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "Error creating the new user",
    });

  }
}

export async function signIn(request, response) {
  configureEnvVars();
  try {
    if (!request.body.email || !request.body.password) {
      return response
        .status(404)
        .send({ message: "user data missing" });
    }

    const { email, password } = request.body;

    const userFound = await User.findOne({
      where: { email },
    });

    if (!userFound) {
      return response.status(404).send({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFound.getDataValue("password")
    );

    if (!isPasswordCorrect) {
      return response
        .status(400)
        .send({ message: "password is wrong" });
    }

    const userPayload = {
      id: userFound.getDataValue("id"),
      email: userFound.getDataValue("email"),
      iat: moment().add({ hours: 3 }).unix(),
    };

    const token = jwt.sign(userPayload, process.env.PRIVATE_KEY);
    response.cookie("authorization", token);
    response.status(200).send({
        message:"Login Successfull",
        token: token
    })

    response.end();
  } catch (error) {
    response.status(500).send({
      message: "Error during log in process",
    });
  }
}

/*
export async function signUp(request, response) {
    configureEnvVars()
    try {
        if (!request.body.email || !request.body.password) {
            return response.status(404).send({ message: "user data missing" })
        }

        const { email,password } = request.body;*/

/**
 * 0. Validate data integrity
 * 1. Validate user in DB
 * 2. Validate user password length
 * 3. Validate user email
 */

        //const salt = bcrypt.genSaltSync(10)
/*
const userAlreadyExists = await User.findOne({
    where: { email },
  });
 
  if (userAlreadyExists) {
    return response
      .status(400)
      .send({ message: "user already exists" });
  }
 
 
const passwordHash = await bcrypt.hashSync(password,8);
const user = User.build({ email:email,password: passwordHash });
const newUser=await user.save()
response.status(200).send({
    newUser
})
} catch (error) {
response.status(500).send({
    message: "Error creating the new user"
})
}
}*/

/*

export async function login(request, response) {
  configureEnvVars();
  try {
    if (!request.body.email || !request.body.password) {
      return response
        .status(404)
        .send({ message: "user data missing" });
    }

    const { email, password } = request.body;

    const userFound = await User.findOne({
      where: { email },
    });

    if (!userFound) {
      return response.status(404).send({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFound.getDataValue("password")
    );

    if (!isPasswordCorrect) {
      return response
        .status(400)
        .send({ message: "password is wrong" });
    }

    const userPayload = {
      email: userFound.getDataValue("email"),
      iat: moment().add({ hours: 3 }).unix(),
    };

    const token = jwt.sign(userPayload, process.env.PRIVATE_KEY);

    response.cookie("authorization", token);
    response.end();
  } catch (error) {
    response.status(500).send({
      message: "Error during log in process",
    });
  }
}*/