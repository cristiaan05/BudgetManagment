import { DataTypes } from "sequelize";
import db from "../db/configDB.js";
//import Transfer from "./Transfer.js";
import User from "./User.js";

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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_user: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
        }
    },
    {
        schema: "PDBADMIN",
    }
);



// User.hasMany(BankAccount, { foreignKey: 'id_user', sourceKey: 'id', onDelete: 'restrict' });
// BankAccount.belongsTo(User, { foreignKey: 'id_user', targetKey: 'id', });


// BankAccount.hasMany(Transfer, { foreignKey: 'id_account', sourceKey: 'id' });
// BankAccount.hasMany(Transfer, { foreignKey: 'id_account_destination', sourceKey: 'id' });
export default BankAccount;