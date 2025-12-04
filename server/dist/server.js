"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import  connectDB  from "connect";
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./db/connect"));
dotenv_1.default.config();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
(async () => {
    // Connect to MongoDB first
    await (0, connect_1.default)();
    // Start express app
    app_1.default.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
})();
