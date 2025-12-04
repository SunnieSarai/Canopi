"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gardenRoutes_1 = __importDefault(require("./routes/gardenRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/gardens", gardenRoutes_1.default);
// Basic health route
app.get("/", (req, res) => res.json({ message: "Mind Mapper server is up" }));
exports.default = app;
