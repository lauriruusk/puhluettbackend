const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]



const url =
`mongodb+srv://fullstack:${password}@trainercluster.sgmzt.mongodb.net/persons?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

if(process.argv.length === 5) {   

    person.save().then(response => {
        console.log('note saved')
        mongoose.connection.close()
    })

} else {
    console.log('phonebook:')
    Person.find({}).then(result =>{
        result.forEach(p => {
            console.log(p.name + ' ' + p.number)
        })
        mongoose.connection.close()
    })
}

