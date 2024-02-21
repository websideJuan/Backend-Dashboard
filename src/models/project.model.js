import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  nameproject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pathImage: {
    type: String
  }
})

export default mongoose.model('Project', projectSchema)
