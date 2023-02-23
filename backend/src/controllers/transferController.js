import { config as configureEnvVars } from "dotenv";
import BankAccount from "../models/BankAccount.js";
import Transaction from "../models/Transactions.js";
import Transfer from "../models/Transfer.js";


export async function createTransferWithin(request, response) {
    configureEnvVars();

    try {
        const { date, amount, currency, id_account, id_account_destination } = request.body;
        let idUser = request.token.id;

        const accountsUser = await BankAccount.findAll({
            where: { id_user: idUser },
        });

        if (accountsUser.length < 2) {
            return response.status(500).send({
                successfull: false,
                message: "You dont have more accounts to do a transfer"
            })
        }

        if (id_account === id_account_destination) {
            return response.status(500).send({
                successfull: false,
                message: "Error, cant do the transfer to the same account"
            })
        }

        if (accountsUser) {
            //Verifying if id bank accounts exists
            const bankAccountFrom = await BankAccount.findOne({
                where: { id: id_account },
            });
            if (!bankAccountFrom) {
                return response.status(404).send({
                    successfull: false,
                    message: "Bank Account not found"
                });
            }
            const bankAccountTo = await BankAccount.findOne({
                where: { id: id_account_destination },
            });
            if (!bankAccountTo) {
                return response.status(404).send({
                    successfull: false,
                    message: "Bank Account not found"
                });
            }

            if (parseFloat(bankAccountFrom.balance) >= parseFloat(amount)) {
                const transfer = await Transfer.build({
                    date,
                    amount: parseFloat(amount),
                    currency,
                    id_account: id_account,
                    id_account_destination: id_account_destination
                }).save();


                const category = 'transfer';
                const transactionOut = await Transaction.build({
                    amount: parseFloat(amount),
                    date,
                    category,
                    type: 'income',
                    id_bank_account: id_account
                }).save();
                console.log(bankAccountFrom.balance, transactionOut.amount)
                const amountWithCommaFrom = amount.replace(".", ",");
                bankAccountFrom.decrement('balance', { by: amountWithCommaFrom });
                await bankAccountFrom.save();

                const transactionIn = await Transaction.build({
                    amount: parseFloat(amount),
                    date,
                    category,
                    type: 'expense',
                    id_bank_account: id_account_destination
                }).save();
                console.log(bankAccountTo.balance, parseFloat(amount))
                const amountWithComma = amount.replace(".", ",");
                bankAccountTo.increment('balance', { by: amountWithComma });
                await bankAccountTo.save();

                //console.log(transactionIn, transactionOut)
                return response.status(200).send({
                    successfull: true,
                    message: "Transfert created successfuly",
                    transfer
                })
            } else {
                return response.status(200).send({
                    successfull: false,
                    message: "Insufficient funds to do the transfer"
                })
            }

        } else {
            return response.status(404).send({
                successfull: false,
                message: "Dont accounts in this user, please create one"
            })
        }


    } catch (error) {
        console.log(error);
        response.status(500).send({
            successfull: false,
            message: "Error creating the transfer"
        });
    }
}

