import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Task } from './Task.js';

export const Project = sequelize.define(
  "projects",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

// hasMany -> Un proyecto puede tener muchas tareas
Project.hasMany(Task, {
  foreingKey: 'projectId',
  sourceKey: 'id',
});

// belongsTo -> Una tarea pertenece a un proyecto
Task.belongsTo(Project, {
    foreingKey: 'projectId',
    targetId: 'id',
});
