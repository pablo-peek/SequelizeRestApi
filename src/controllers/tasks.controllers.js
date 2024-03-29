import { where } from "sequelize";
import {Task} from "../models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);   
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something goes wrong retrieving the tasks",
            data: {}
        });
    }
 
};

export const createTask = async (req, res) => {
    try {
        const { name, done, projectId } = req.body;
        const newTasks = await Task.create({
            name,
            done,
            projectId
        });
        res.json(newTasks);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something goes wrong creating a task",
            data: {}
        });
    }
};

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            where: {id},
            attributes: ["name"]
        });
        res.json(task);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something goes wrong retrieving a task",
            data: {}
        });
    }
};
export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({
            where: {id} 
        })
        task.set(req.body);
        await task.save();
        return res.json(task);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something goes wrong updating a task",
            data: {}
        });
    }
};
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.destroy({
            where: {id}
        });
        res.json({
            message: "Task deleted successfully",
            count: task
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something goes wrong deleting a task",
            data: {}
        });
    }
};