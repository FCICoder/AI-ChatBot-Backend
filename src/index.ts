import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const PORT = process.env.PORT; 
// ! connections and listeners
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT} 😎`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
    process.exit(1);
  });
