import { where } from "sequelize";
import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something goes wrong retrieving the projects",
      data: {},
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const {id} = req.params;
    const project = await Project.findOne({
      where: { 
        id: id
      },
    })

    if(!project) {
      return res.status(404).json({
        message: "Project not found",
        data: {},
      });
    }
    res.json(project);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something goes wrong retrieving the project",
      data: {},
    });
  }
};

export const createProject = async (req, res) => {
  const { name, priority, description } = req.body;
  try {
    const newProject = await Project.create({
      name,
      priority,
      description,
    });
    res.send(newProject);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something goes wrong creating a project",
      data: {},
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, priority, description } = req.body;
    const project = await Project.findByPk(id);
    project.name = name;
    project.priority = priority;
    project.description = description;
    await project.save();
    res.json(project);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something goes wrong updating a project",
      data: {},
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.destroy({
      where: { id },
    });
    res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something goes wrong deleting a project",
      data: {},
    });
  }
};

export const getProjectTasks = async (req, res) => {
  const {id} = req.params;
  try {
    const tasks = await Task.findAll({
      where: { projectId: id },
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
      data: {},
    });
  }
};
