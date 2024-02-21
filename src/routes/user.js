import { Router } from 'express'
import {
  loginUser,
  logoutUser,
  profileUser,
  registerUser,
  verifyToken
} from '../controller/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const userRoter = Router()

userRoter.post('/login', loginUser)

userRoter.post('/register', registerUser)

userRoter.post('/logout', logoutUser)

userRoter.get('/verify', verifyToken)

userRoter.get('/profile', authRequired, profileUser)

export default userRoter
