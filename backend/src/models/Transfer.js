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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
        ,
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_account: {
            type: DataTypes.UUID,
            references: {
                model: BankAccount,
                key: 'id',
            },
        },
        id_account_destination: {
            type: DataTypes.UUID,
            references: {
                model: BankAccount,
                key: 'id',
            },
        }
    },
    {
        schema: "PDBADMIN",
    }
);
// BankAccount.hasMany(Transfer, { foreignKey: 'id_account', sourceKey: 'id' });
// Transfer.belongsTo(BankAccount, { foreignKey: 'id_account', targetKey: 'id' });

// BankAccount.hasMany(Transfer, { foreignKey: 'id_account_destination', sourceKey: 'id' });
// Transfer.belongsTo(BankAccount, { foreignKey: 'id_account_destination', targetKey: 'id' });


// BankAccount.hasMany(Transfer, { foreignKey: 'id_account', sourceKey: 'id' });
// BankAccount.hasMany(Transfer, { foreignKey: 'id_account_destination', sourceKey: 'id' });
// Transfer.belongsTo(BankAccount, { foreignKey: 'id_account', targetKey: 'id' });
// Transfer.belongsTo(BankAccount, { foreignKey: 'id_account_destination', targetKey: 'id' });
export default Transfer;