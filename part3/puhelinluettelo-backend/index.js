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

app.get("/api/persons", (request, response) => {
    Person.find({}).then((result) => {
        response.json(result);
    });
});

app.post("/api/persons", (request, response) => {
    const { name, number } = request.body;

    if (!name || !number)
        return response.status(400).json({
            error: "required parameter is missing",
        });

    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then((result) => {
        return response.json(result);
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

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;

    Person.findByIdAndDelete(id)
        .then((result) => response.status(204).end())
        .catch((error) => {
            console.log(error);
            response.status(400).send({ error: "malformatted id" });
        });
});

app.get("/info", (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        
        `);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
