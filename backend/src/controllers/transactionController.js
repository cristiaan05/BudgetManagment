import { config as configureEnvVars } from "dotenv";
import BankAccount from "../models/BankAccount.js";
import Transaction from "../models/Transactions.js";

export async function addTransaction(request, response) {
    configureEnvVars();
    try {
        const { amount, date, category, type } = request.body;
        let idBankAccount = request.params.id
        if (!amount || !date || !category || !type || !idBankAccount) {
            return response
                .status(404)
                .send({ message: "transaction data missing" });
        }

        const bankAccountFound = await BankAccount.findOne({
            where: { id: idBankAccount },
        });

        if (!bankAccountFound) {
            return response.status(404).send({ message: "Bank Account not found" });
        }

        if(type!='income' || type!='expense'){
            return response.status(500).send({
                message:"Invalid Type"
            })
        }

        const transaction = await Transaction.build({
            amount,
            date,
            category,
            type,
            id_bank_account: idBankAccount
        }).save();

        response.status(200).send({
            message: "Transaction Successfully",
            transaction: transaction
        });

    } catch (error) {
        console.log(error);
        response.status(500).send({
            message: "Error creating the transaction"
        });
    }
}