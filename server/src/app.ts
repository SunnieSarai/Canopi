import express from "express";
import gardenRoutes from "./routes/gardenRoutes";
import cors from "cors"

const app = express();

// Middleware
app.use(express.json());

app.use(
    cors({
     origin: "http://localhost:5173",
    })
);
// Routes
app.use("/api/gardens", gardenRoutes);

// Basic health route
app.get("/", (req, res) => res.json({ message: "Mind Mapper server is up" }));

export default app;
// import express from "express";
// import gardenRoutes from "./routes/gardenRoutes";
// import cors from "cors";

// const app = express();

// app.use(express.json());

// app.use(cors({
//   origin: "http://localhost:5173"
// }));

// // Mount ALL routes at /api
// app.use("/api", gardenRoutes);

// app.get("/", (req, res) => {
//   res.json({ message: "Mind Mapper server is up" });
// });

// export default app;

