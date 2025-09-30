const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});
const Person = mongoose.model("Person", personSchema);

const add = (newPerson) => {
    const person = new Person({
        name: newPerson.name,
        number: newPerson.number,
    });

    person.save().then((result) => {
        console.log(
            `added ${person.name} number ${person.number} to phonebook`
        );
        mongoose.connection.close();
    });
};

const printAll = () => {
    Person.find({}).then((result) => {
        console.log("phonebook:");
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
};

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
} else if (process.argv.length === 3) {
    printAll();
} else if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];
    add({ name, number });
} else {
    console.log("something went wrong");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Spellbind6088:${password}@cluster0.fe4y9kk.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);
