const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('erroe connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String,
})

module.exports = mongoose.model('Person', personSchema)
