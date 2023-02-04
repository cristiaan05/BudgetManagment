import { config as configureEnvVars } from "dotenv";
import BankAccount from "../models/BankAccount.js";
import User from "../models/User.js";

export async function addAcount(request, response) {
    configureEnvVars();
    console.log("asdfasf")
    try {
        const { account_name, balance, currency } = request.body;

        if (!account_name || !balance || !currency) {
            return response
                .status(404)
                .send({ message: "bank data missing" });
        }
        //console.log("all good")

        //extract the id of user logged by the token in cookies authorization
        const decodedToken = request.token
        const idUser = decodedToken.id
        console.log("this is the token loggin: ", decodedToken.id);

        
        const userFound = await User.findOne({
            where: { id:idUser },
        });

        if (!userFound) {
            return response.status(404).send({ message: "User not found" });
        }



        const bankAccount = await BankAccount.build({
            account_name,
            balance,
            currency,
            id_user:idUser
        }).save();

        response.status(200).send({
            message: "Bank Account Created Successfully",
            bank_account: bankAccount
        });

    } catch (error) {
        console.log(error);
        response.status(500).send({
            message: "Error creating the new user",
        });
    }
}