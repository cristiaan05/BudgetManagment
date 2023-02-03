import { config as configureEnvVars } from "dotenv";
import app from "../src/api/api.js";
import db from "../src/db/configDB.js"

configureEnvVars();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API IS RUNNING IN http://localhost:${PORT}`);
  db.connect();
});