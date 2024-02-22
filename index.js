import express from 'express'
import userRoter from './src/routes/user.js'
import projectRoter from './src/routes/project.route.js'
import ticketsRouter from './src/routes/project.tickets.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './src/db.js'

const app = express()

connectDB()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(cookieParser())

app.use('/api', userRoter)
app.use('/api', projectRoter)
app.use('/api', ticketsRouter)

const PORT = process.env.PORT ?? '8080'

app.listen(PORT, () => {
  console.log(`server on PORT: http://localhost:${PORT}`)
})
