import { Sequelize } from "sequelize";
import { config as configureEnvVars } from "dotenv";

class DB {
    sequelize;
    constructor() {
        configureEnvVars();
        this.sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USERNAME,
            process.env.DB_PASSWORD,
            {
                dialect: 'oracle',
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
            }
        );
    }

    async connect() {
        //748afaa64e9b8085c8fe342fe1bfc8206a494e26c70829b475cac232a5962ff1
        try {
            await this.sequelize.authenticate();
            await this.sequelize.sync({ force: true })
            console.log('DB IS RUNNING');
        } catch (error) {
            console.error('ERROR IN DB CONNECTION', error)
        }
    }

    get() {
        return this.sequelize;
    }
}


const db = new DB();
export default db;