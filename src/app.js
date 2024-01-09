import express from 'express';
import projectsRoutes from './routes/projects.routes.js';
import taskRoutes from './routes/tasks.routes.js';


const app = express();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(projectsRoutes);
app.use(taskRoutes);

export default app;