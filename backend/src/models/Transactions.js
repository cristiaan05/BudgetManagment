import { DataTypes } from "sequelize";
import db from "../db/configDB.js";

const Transaction = db.get().define(
    "BankAccount",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false    
        },
        type: {
            type: DataTypes.ENUM,
            values: ['expense', 'income'],
            allowNull: true
        }
    },
    {
        schema: "PDBADMIN",
    }
);

export default Transaction;