import { DataTypes } from "sequelize";
import db from "../db/configDB.js";
import BankAccount from "./BankAccount.js";

const Transaction = db.get().define(
    "Transaction",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: ['expense', 'income'],
            allowNull: true
        },
        id_bank_account: {
            type: DataTypes.UUID,
            references: {
                model: BankAccount,
                key: 'id',
            },
        }

    },
    {
        schema: "APPUSER",
    }
);

// BankAccount.hasMany(Transaction, { foreignKey: 'id_bank_account', sourceKey: 'id' });
// Transaction.belongsTo(BankAccount, { foreignKey: 'id_bank_account', targetKey: 'id', });


export default Transaction;

/**
 * como poner FK en sequelize
 *  como funciona la parte de currencies y exchanges es necesario una tabla
 * 
 */