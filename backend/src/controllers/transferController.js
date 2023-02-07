import { config as configureEnvVars } from "dotenv";
import BankAccount from "../models/BankAccount.js";
import Transaction from "../models/Transactions.js";
import Transfer from "../models/Transfer.js";


export async function createTransferWithin(request, response) {
    configureEnvVars();

    try {
        const {  date, amount,currency,id_account,id_account_destination } = request.body;
        let idUser=request.token.id;

        const accountsUser = await BankAccount.findAll({
            where: { id_user:idUser },
        });

        console.log("hola")
        if(accountsUser.length<2){
            return response.status(500).send({
                message:"You dont have more accounts to do a transfer"
            })
        }


        if(id_account===id_account_destination){
            return response.status(500).send({
                message:"Error, cant do the transfer to the same account"
            })
        }

        if(accountsUser){
            const transfer = await Transfer.build({
                date,
                amount,
                currency,
                id_account: id_account,
                id_account_destination: id_account_destination
            }).save();


            const category='transfer';
            const transactionOut = await Transaction.build({
                amount,
                date,
                category,
                type:'income',
                id_bank_account: id_account
            }).save();
            const transactionIn = await Transaction.build({
                amount,
                date,
                category,
                type:'expense',
                id_bank_account: id_account_destination
            }).save();
            console.log(transactionIn,transactionOut)
            return response.status(200).send({
                transfer
            })
        }else{
            return response.status(404).send({
                message:"Dont accounts in this user, please create one"
            })
        }


    } catch (error) {
        console.log(error);
        response.status(500).send({
            message: "Error creating the transfer"
        });
    }
}

