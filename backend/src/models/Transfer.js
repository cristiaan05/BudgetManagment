import { DataTypes } from "sequelize";
import db from "../db/configDB.js";
import BankAccount from "./BankAccount.js";

const Transfer = db.get().define(
    "Transfer",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    },
    {
        schema: "PDBADMIN",
    }
);
/*
BankAccount.hasMany(Transfer, { foreignKey: 'id_account', sourceKey: 'id' });
Transfer.belongsTo(BankAccount, { foreignKey: 'id_account', targetKey: 'id' });*/
export default Transfer;