import express from "express";
import gardenRoutes from "./routes/gardenRoutes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/gardens", gardenRoutes);

// Basic health route
app.get("/", (req, res) => res.json({ message: "Mind Mapper server is up" }));

export default app;
