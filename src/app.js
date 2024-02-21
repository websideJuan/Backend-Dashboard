import express from 'express'
import userRoter from './routes/user.js'
import projectRoter from './routes/project.route.js'
import ticketsRouter from './routes/project.tickets.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './db.js'

const app = express()

connectDB()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
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
