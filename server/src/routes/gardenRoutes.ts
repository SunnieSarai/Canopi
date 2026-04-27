import express from "express";
import {
  createGarden,
  getGardens,
  deleteGarden,
  addPlot,
  deletePlot,
  addSeedToPlot,
  deleteSeed,
  addTaskToSeed,
  deleteTask,
  toggleTaskCompletion,
} from "../controllers/gardenControllers";

const router = express.Router();

// ===== GARDEN ROUTES =====
// Create a garden
router.post("/", createGarden);

// Get all gardens
router.get("/", getGardens);

// Delete a garden
router.delete("/:gardenId", deleteGarden);

// ===== PLOT ROUTES (nested under garden) =====
// Add a plot to a garden
router.post("/:gardenId/plots", addPlot);

// Delete a plot from a garden
router.delete("/:gardenId/plots/:plotId", deletePlot);

// ===== SEED ROUTES (nested under garden + plot) =====
// Add a seed to a plot
router.post("/:gardenId/plots/:plotId/seeds", addSeedToPlot);

// Delete a seed from a plot
router.delete("/:gardenId/plots/:plotId/seeds/:seedId", deleteSeed);

// ===== TASK ROUTES (nested under garden + plot + seed) =====
// Add a task to a seed
router.post("/:gardenId/plots/:plotId/seeds/:seedId/tasks", addTaskToSeed);

// Delete a task from a seed
router.delete("/:gardenId/plots/:plotId/seeds/:seedId/tasks/:taskId", deleteTask);

// Toggle task completion (check/uncheck)
router.patch("/:gardenId/plots/:plotId/seeds/:seedId/tasks/:taskId/toggle", toggleTaskCompletion);

export default router;