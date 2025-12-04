// import  connectDB  from "connect";
import app from "./app";
import dotenv from "dotenv";
import  connectDB from "./db/connect"; 


dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

(async () => {
  // Connect to MongoDB first
  await connectDB();

  // Start express app
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
})();

