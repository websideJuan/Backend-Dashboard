// import projectModel from '../models/project.model'

export class Project {
  static getProjects (req, res) {
    res.json({ message: 'projects' })
  }

  static getProject (req, res) {

  }

  static createProject (req, res) {
    res.status(200).json({ message: 'ok' })
  }

  static deleteProject (req, res) {

  }

  static updateProject (req, res) {

  }
}
