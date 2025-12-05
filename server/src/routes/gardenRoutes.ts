
import express from "express";
import {
  createGarden,
  getGardens,
  addSeed,
  addTask,
  deleteTask,
} from "../controllers/gardenControllers";

const router = express.Router();

/**
 * /api/gardens/
 */
router.post("/seeds/:seedId/tasks", addTask);

// delete a task
router.delete("/seeds/:seedId/tasks/:taskId", deleteTask);

// create a garden
router.post("/", createGarden);

// get all gardens
router.get("/", getGardens);

// add a seed to a garden
router.post("/:gardenId/seeds", addSeed);

/**
 * Task routes (NOT nested under /gardens)
 */
// router.post("/seeds/:seedId/tasks", addTask);

// // delete a task
// router.delete("/seeds/:seedId/tasks/:taskId", deleteTask);

export default router;
