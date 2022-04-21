const axios = require("axios");
const validation = require('./validation');
const peopleUrl = "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json";

async function getPeople(){ // this function is from Lab3 instruction
    const { data } = await axios.get(peopleUrl)
    return data // this will be the array of people objects
}


async function getPersonById(id) {
    try{
        id = validation.checkId(id);
    }catch(e) {
        throw e
    }
    const people = await getPeople();
    for(const person of people) {
        if(person.id == id) {
            return person
        }
    }
    throw 'person with this id did not found'
}

async function getAllPeople() {
    const people = await getPeople();
    return people;
}

module.exports = {
    getPersonById,
    getAllPeople
}
