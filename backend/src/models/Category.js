import { DataTypes } from "sequelize";
import db from "../db/configDB.js";



const Category = db.get().define(
    'Category',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique:true,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        schema: "PDBADMIN",
    }
);

export default Category;