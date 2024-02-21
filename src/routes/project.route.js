import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { Project } from '../controller/project.controller.js'

const router = Router()

router.get('/project', Project.getProjects)

router.get('/project/:id', Project.getProject)

router.post('/project', authRequired, Project.createProject)

router.delete('/project/:id', authRequired, Project.deleteProject)

router.put('/project/:id', authRequired, Project.updateProject)

export default router
