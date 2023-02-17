import { config as configureEnvVars } from "dotenv";
import { Op } from "sequelize";
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

        /*if (type != 'income' || type != 'expense') {
            return response.status(500).send({
                message: "Invalid Type"
            })
        }*/

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


export async function transactionHistory(request, response) {
    configureEnvVars();

    if (request.body.id_bank_account && request.body.dateStart && request.body.dateEnd && request.body.category) {
        const { id_bank_account, dateStart, dateEnd, category } = request.body;
        const history = await Transaction.findAll({
            where: {

                date: {
                    //$.between: [dateStart, dateEnd]
                    [Op.between]: [dateStart, dateEnd]
                },
                [Op.and]: [
                    { category: category }
                ],
                [Op.and]: [
                    { id_bank_account: id_bank_account }
                ],
            },
            order: [
                ['date', 'DESC'],
            ],
        });

        if (!history) {
            return response.status(500).send({
                message: "Not history founded"
            })
        }

        return response.status(200).send({
            history
        })

    /*} else if (request.body.id_bank_account) {
        const { id_bank_account } = request.body;
        const history = await Transaction.findAll({
            where: {

                // date: {
                //     [Op.between]: [dateStart, dateEnd],
                // },
                // category: {
                //     [Op.or]: [category, null],
                // },
                id_bank_account: {
                    [Op.or]: [id_bank_account, null],
                },
            },
            order: [
                ['date', 'DESC'],
            ],
        });

        if (!history) {
            return response.status(500).send({
                message: "Not history founded"
            })
        }

        return response.status(200).send({
            history
        })*/
    } else {

        const filters = {};

        if (request.body.startDate) {
            filters.date = {
                [Op.gte]: request.body.startDate
            };
        }

        if (request.body.endDate) {
            if (filters.date) {
                filters.date[Op.lte] = request.body.endDate;
            } else {
                filters.date = {
                    [Op.lte]: request.body.endDate
                };
            }
        }
        

        if (request.body.category) {
            filters.category = request.body.category;
        }

        if (request.body.id_bank_account) {
            filters.id_bank_account = request.body.id_bank_account;
        }

        const transactions = await Transaction.findAll({
            where: filters
        });
        console.log(filters)

        if (transactions) {
            response.status(200).send({
                transactions
            })
        }
    }
}

