import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { Ticket } from '../controller/ticket.controller.js'

const router = Router()

router.get('/ticket', Ticket.getTickets)

router.get('/ticket/:id', Ticket.getTicket)

router.post('/ticket', Ticket.createTicket)

router.delete('/ticket/:id', authRequired, Ticket.deleteTicket)

router.put('/ticket/:id', authRequired, Ticket.updateTicket)

export default router
