"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gardenControllers_1 = require("../controllers/gardenControllers");
const router = express_1.default.Router();
/**
 * Routes:
 * POST   /api/gardens                 -> createGarden
 * GET    /api/gardens                 -> getGardens (single call returns nested seeds & tasks)
 * POST   /api/gardens/:gardenId/seeds -> addSeed
 * POST   /api/seeds/:seedId/tasks     -> addTask
 * DELETE /api/seeds/:seedId/tasks/:taskId -> deleteTask
 */
// create garden
router.post("/", gardenControllers_1.createGarden);
// get all gardens (with seeds + tasks)
router.get("/", gardenControllers_1.getGardens);
// add seed to a garden
router.post("/:gardenId/seeds", gardenControllers_1.addSeed);
// add task to a seed
router.post("/seeds/:seedId/tasks", gardenControllers_1.addTask);
// delete a task
router.delete("/seeds/:seedId/tasks/:taskId", gardenControllers_1.deleteTask);
exports.default = router;
