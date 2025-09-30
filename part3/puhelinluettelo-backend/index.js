require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const app = express();
const morgan = require("morgan");

app.use(express.static("dist"));

app.use(express.json());

morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
});

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then((result) => {
            response.json(result);
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const { name, number } = request.body;

    if (!name || !number)
        return response.status(400).json({
            error: "required parameter is missing",
        });

    const person = new Person({
        name: name,
        number: number,
    });

    person
        .save()
        .then((result) => {
            return response.json(result);
        })
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;

    const { name, number } = request.body;

    Person.findById(id).then((person) => {
        if (!person) return response.status(404).end();

        person.name = name;
        person.number = number;

        person
            .save()
            .then((result) => {
                return response.json(result);
            })
            .catch((error) => next(error));
    });
});

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;

    const person = persons.find((person) => person.id === id);

    if (person) {
        return response.json(person);
    }

    return response.status(404).end();
});

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;

    Person.findByIdAndDelete(id)
        .then((result) => response.status(204).end())
        .catch((error) => {
            next(error);
        });
});

app.get("/info", (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        
        `);
});

const unknownEndpoint = (request, response, next) => {
    next({ name: "UnknownEndpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === "CastError")
        return response.status(400).send({ error: "malformatted id" });

    if (error.name === "UnknownEndpoint") return response.status(404).end();

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
