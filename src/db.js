import mongoose from 'mongoose'
const URI = 'mongodb+srv://Adminuser:Portador10@dashboard.rrzc8i6.mongodb.net/?retryWrites=true&w=majority'

export const connectDB = async () => {
  try {
    await mongoose.connect(URI)
    console.log('>>>> DB is connected')
  } catch (error) {
    console.log(error)
  }
}
