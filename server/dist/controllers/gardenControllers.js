"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.addTask = exports.addSeed = exports.createGarden = exports.getGardens = void 0;
const gardenModels_1 = __importDefault(require("../models/gardenModels"));
// Get all gardens with seeds and tasks
const getGardens = async (req, res) => {
    const gardens = await gardenModels_1.default.find();
    res.json(gardens);
};
exports.getGardens = getGardens;
// Create a new garden
const createGarden = async (req, res) => {
    const { name, location } = req.body;
    const garden = new gardenModels_1.default({ name, location, seeds: [] });
    await garden.save();
    res.status(201).json(garden);
};
exports.createGarden = createGarden;
// Add a seed to a garden
const addSeed = async (req, res) => {
    const { gardenId } = req.params;
    const { name, displayId } = req.body; // displayId can start at 100
    const garden = await gardenModels_1.default.findById(gardenId);
    if (!garden)
        return res.status(404).json({ message: "Garden not found" });
    garden.seeds.push({ name, displayId, tasks: [] });
    await garden.save();
    res.status(201).json(garden);
};
exports.addSeed = addSeed;
// Add a task to a seed
const addTask = async (req, res) => {
    const { seedId } = req.params;
    const { text } = req.body;
    const garden = await gardenModels_1.default.findOne({ "seeds._id": seedId });
    if (!garden)
        return res.status(404).json({ message: "Seed not found" });
    const seed = garden.seeds.id(seedId);
    seed?.tasks.push({ text });
    await garden.save();
    res.status(201).json(seed);
};
exports.addTask = addTask;
// Delete a task from a seed
const deleteTask = async (req, res) => {
    const { seedId, taskId } = req.params;
    const garden = await gardenModels_1.default.findOne({ "seeds._id": seedId });
    if (!garden)
        return res.status(404).json({ message: "Seed not found" });
    const seed = garden.seeds.id(seedId);
    const task = seed?.tasks.id(taskId);
    if (!task)
        return res.status(404).json({ message: "Task not found" });
    task.remove();
    await garden.save();
    res.json(seed);
};
exports.deleteTask = deleteTask;
