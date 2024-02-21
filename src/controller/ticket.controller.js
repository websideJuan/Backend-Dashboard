import TicketModel from '../models/ticket.model.js'

export class Ticket {
  static async getTickets (req, res) {
    try {
      const result = await TicketModel.find()
      res.status(200).json(result)
    } catch (error) {
      res.status(404).json(['Entrada no encontrada'])
    }
  }

  static async getTicket (req, res) {
    const { id } = req.params
    try {
      const postFund = await TicketModel.findById(id)
      res.status(200).json(postFund)
    } catch (error) {
      res.status(400).json([error.message])
    }
  }

  static async createTicket (req, res) {
    const { title, description, rating, hastag, pathIMG } = req.body
    try {
      const newTicket = new TicketModel({
        title,
        description,
        rating,
        pathIMG,
        hastag
      })
      const saveTicket = await newTicket.save()

      res.status(200).json({
        id: saveTicket._id,
        title: saveTicket.title,
        pathIMG: saveTicket.pathIMG,
        description: saveTicket.description,
        createdAt: saveTicket.createdAt
      })
    } catch (error) {
      console.log(error)
      res.status(200).json(['Created succesfull'])
    }
  }

  static deleteTicket (req, res) {

  }

  static async updateTicket (req, res) {
    const { id } = req.params
    const { rating } = req.body
    const ratingSRV = 1

    try {
      const postFound = await TicketModel.findByIdAndUpdate({ _id: id }, { rating: rating + ratingSRV })
      if (!postFound) {
        return res.status(404).json(['Entrada no encontrada'])
      }

      res.status(200).json(postFound)
    } catch (error) {
      res.status(400).json(['not found'])
    }
  }
}
