import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./database/database.js";

import app from "./app.js";

/**
 * Esta es la función principal que inicia la aplicación.
 * 
 * @param {none} No toma ningún parámetro.
 * @returns {Promise<void>} No devuelve nada.
 */
async function main() {
  try {
    await sequelize.sync({force: false});
    app.listen(process.env.PORT, () => {
      console.log("listen", process.env.PORT);
    });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
