const {response} = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('cont', function getCont(req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :cont'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info for ' + persons.length + ' people</p><p>' + new Date + '</p>')
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log(body.name)
    // console.log(persons[1].name)
    // console.log(persons.some(i => i.name === body.name))
    
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: "content missing"
        })
    }
    
    if(persons.some(i => i.name === body.name)) {
        return response.status(400).json({
            error: "name already in list"
        })
    }

    const person = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    
    response.json(person)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }   
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)