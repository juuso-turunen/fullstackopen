require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()
const morgan = require('morgan')

app.use(express.static('dist'))

app.use(express.json())

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
)

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  const person = new Person({
    name: name,
    number: number,
  })

  person
    .save()
    .then((result) => {
      return response.json(result)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  const { name, number } = request.body

  Person.findById(id).then((person) => {
    if (!person) return response.status(404).end()

    person.name = name
    person.number = number

    person
      .save()
      .then((result) => {
        return response.json(result)
      })
      .catch((error) => next(error))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      if (person) return response.json(person)

      response.status(404).end()
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((error) => {
      next(error)
    })
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
            `)
  })
})

const unknownEndpoint = (request, response, next) => {
  next({ name: 'UnknownEndpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })

  if (error.name === 'UnknownEndpoint') return response.status(404).end()

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
