import UserModel from '../models/user.model.js'
import bcrypts from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'
import { createdAccessToken } from '../libs/jwt.js'

export const registerUser = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const userFound = await UserModel.findOne({ email })

    if (userFound) return res.status(200).json(['This email already exists'])
    const passwordHash = await bcrypts.hash(password, 10)

    const newUser = new UserModel({
      username,
      email,
      password: passwordHash
    })

    const userSaved = await newUser.save()
    const token = await createdAccessToken({ id: userSaved._id })

    res.cookie('token', token)
    res.status(200).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await UserModel.findOne({ email })
    if (!userFound) return res.status(400).json(['Invalid credential'])

    const isMatch = await bcrypts.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json(['User or password incorrect'])

    const token = await createdAccessToken({ id: userFound._id })

    res.cookie('token', token)
    res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const logoutUser = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) })
  return res.sendStatus(200)
}

export const profileUser = async (req, res) => {
  const userFound = await UserModel.findById(req.user.id)
  if (!userFound) return res.status(400).json(['User not found'])

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json(['unauthorized'])

  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json(['unauthorized'])

    const userFound = await UserModel.findById(user.id)
    if (!userFound) return res.status(401).json(['User not found'])

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}
