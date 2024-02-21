import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  pathIMG: {
    type: String,
    required: true
  },
  hastag: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

export default mongoose.model('Ticket', ticketSchema)
