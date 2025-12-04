import express from "express";
import { createGarden, getGardens, addSeed, addTask, deleteTask } from "../controllers/gardenControllers";

const router = express.Router();

/**
 * Routes:
 * POST   /api/gardens                 -> createGarden
 * GET    /api/gardens                 -> getGardens (single call returns nested seeds & tasks)
 * POST   /api/gardens/:gardenId/seeds -> addSeed
 * POST   /api/seeds/:seedId/tasks     -> addTask
 * DELETE /api/seeds/:seedId/tasks/:taskId -> deleteTask
 */

// create garden
router.post("/", createGarden);

// get all gardens (with seeds + tasks)
router.get("/", getGardens);

// add seed to a garden
router.post("/:gardenId/seeds", addSeed);

// add task to a seed
router.post("/seeds/:seedId/tasks", addTask);

// delete a task
router.delete("/seeds/:seedId/tasks/:taskId", deleteTask);

export default router;
