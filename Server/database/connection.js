import mongoose from 'mongoose'
import config from'./config.json'

// Connect to the database in mongoDB atlas
mongoose.connect(config.URL)

const db = mongoose.connection

export default db
