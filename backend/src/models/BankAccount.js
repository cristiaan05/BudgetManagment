import { DataTypes } from "sequelize";
import db from "../db/configDB.js";

const BankAccount = db.get().define(
    "BankAccount",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        account_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    },
    {
        schema: "PDBADMIN",
    }
);
/*
const UserBankAccount = sequelize.define('UserBankAccount', {});
User.belongsToMany(BankAccount, { through: UserBankAccount });
BankAccount.belongsToMany(User, { through: UserBankAccount });
*/
export default BankAccount;