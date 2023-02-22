import { config as configureEnvVars } from "dotenv";
import { Op } from "sequelize";
import BankAccount from "../models/BankAccount.js";
import Transaction from "../models/Transactions.js";


export async function addTransaction(request, response) {
    configureEnvVars();
    try {
        const { amount, date, category, type } = request.body;
        let idBankAccount
        if(request.params.id){
            idBankAccount = request.params.id
        }else{
            idBankAccount=request.body.id_bank_account
        }

        //console.log(idBankAccount,amount,date,category,type)
        if (!amount || !date || !category || !type || !idBankAccount) {
            return response
                .status(404)
                .send({ message: "transaction data missing" });
        }

        const bankAccountFound = await BankAccount.findOne({
            where: { id: idBankAccount },
        });

        if (!bankAccountFound) {
            return response.status(404).send({ 
                successfull:false,
                message: "Bank Account not found" 
            });
        }

        /*if (type != 'income' || type != 'expense') {
            return response.status(500).send({
                message: "Invalid Type"
            })
        }*/

        const transaction = await Transaction.build({
            amount:parseFloat(amount),
            date,
            category,
            type,
            id_bank_account: idBankAccount
        }).save();

        response.status(200).send({
            successfull:true,
            message: "Transaction Successfully",
            transaction: transaction
        });

    } catch (error) {
        console.log(error);
        return response.status(500).send({
            successfull:false,
            message: "Error creating the transaction"
        });
    }
}


export async function transactionHistory(request, response) {
    configureEnvVars();

    // if (request.body.id_bank_account && request.body.dateStart && request.body.dateEnd && request.body.category) {
    //     const { id_bank_account, dateStart, dateEnd, category } = request.body;
    //     const history = await Transaction.findAll({
    //         //findAndCountAll
    //         where: {

    //             date: {
    //                 //$.between: [dateStart, dateEnd]
    //                 [Op.between]: [dateStart, dateEnd]
    //             },
    //             [Op.and]: [
    //                 { category: category }
    //             ],
    //             [Op.and]: [
    //                 { id_bank_account: id_bank_account }
    //             ],
    //         },
    //         order: [
    //             ['date', 'DESC'],
    //         ],
    //     });

    //     if (!history) {
    //         return response.status(500).send({
    //             succesfull:false,
    //             message: "Not history founded"
    //         })
    //     }
    //     console.log(history)
    //     return response.status(200).send({
    //         succesfull:true,
    //         transactions:history
    //     })

    // /*} else if (request.body.id_bank_account) {
    //     const { id_bank_account } = request.body;
    //     const history = await Transaction.findAll({
    //         where: {

    //             // date: {
    //             //     [Op.between]: [dateStart, dateEnd],
    //             // },
    //             // category: {
    //             //     [Op.or]: [category, null],
    //             // },
    //             id_bank_account: {
    //                 [Op.or]: [id_bank_account, null],
    //             },
    //         },
    //         order: [
    //             ['date', 'DESC'],
    //         ],
    //     });

    //     if (!history) {
    //         return response.status(500).send({
    //             message: "Not history founded"
    //         })
    //     }

    //     return response.status(200).send({
    //         history
    //     })*/
    // } else {

    const filters = {};

    if (request.body.startDate && request.body.endDate) {
        filters.date = {
            [Op.between]: [request.body.startDate, request.body.endDate]
        }
    } else if (request.body.startDate) {
        filters.date = {
            [Op.gte]: request.body.startDate
        }
    } else if (request.body.endDate) {
        filters.date = {
            [Op.lte]: request.body.endDate
        }
    }

    // if (request.body.startDate) {
    //     filters.date = {
    //         [Op.gte]: request.body.startDate
    //     };
    // }

    // if (request.body.endDate) {
    //     if (filters.date) {
    //         filters.date[Op.lte] = request.body.endDate;
    //     } else {
    //         filters.date = {
    //             [Op.lte]: request.body.endDate
    //         };
    //     }
    // }


    if (request.body.category) {
        filters.category = request.body.category;
    }

    if (request.body.id_bank_account) {
        filters.id_bank_account = request.body.id_bank_account;
    }

    const decodedToken = request.token
    const idUser = decodedToken.id
    //filters.id_user = idUser
    console.log("xxx", filters)
    const transactions = await Transaction.findAll({
        include: {
            model: BankAccount,
            where: {id_user:idUser}
        },
        where:filters
    });
    

    if (transactions) {
        return response.status(200).send({
            succesfull: true,
            transactions: transactions
        })
    }
    else {
        return response.status(500).send({
            succesfull: false,
        })
    }
    // }
}

export async function getTransactions(request, response) {
    configureEnvVars()
    try {
        //extract the id of user logged by the token in cookies authorization
        const decodedToken = request.token
        const idUser = decodedToken.id
        //console.log("this is the token loggin: ", decodedToken.id);


        const transactions = await Transaction.findAll({
            include: {
                model: BankAccount,
                where: { id_user: idUser }
            }
            //where: { id_user: idUser },
        });

        if (!transactions) {
            return response.status(404).send({
                successfull: false,
                message: "User not found"
            });
        }

        return response.status(200).send({
            successfull: true,
            message: "Transactions User",
            transactions: transactions
        });


    } catch (error) {
        console.log(error);
        return response.status(404).send({
            successfull: false,
            message: "Error getting the accounts"
        });
    };
};