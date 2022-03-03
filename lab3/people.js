const axios = require("axios");
const peopleUrl = 'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json';

async function getPeople(){ // this function is from Lab3 instruction
    const { data } = await axios.get(peopleUrl)
    return data // this will be the array of people objects
}

function checkID(id) {
    if(id === undefined) {
        throw 'id is undefined'
    }
    if(typeof(id) != 'string') {
        throw 'id is not a string'
    }
    if(id.trim().length == 0) {
        throw 'id is just empty spaces'
    }
}


function checkEmail(emailDomain) {
    if(emailDomain === undefined) {
        throw 'input email domain is undefined'
    }
    if(typeof(emailDomain) != 'string') {
        throw 'input email domain is not a string'
    }
    if(emailDomain.trim().length == 0) {
        throw 'email domain is just empty spaces'
    }
    if(emailDomain.indexOf('.') == -1) {
        throw 'email domain does not contain a dot'
    }
    let emailToArray = emailDomain.split('.');
    if(emailToArray.length < 2) {
        throw 'email domain is not complete'
    }
    for(let i = 1; i < emailToArray.length; i++) {
        if(emailToArray[i].length < 2) {
            throw 'email domain does not have at LEAST 2 LETTERS after the dot'
        }
    }
}

function checkDay(month, day) {
    const Month_Days = {
        1 : 31,
        2 : 28,
        3 : 31,
        4 : 30,
        5 : 31,
        6 : 30,
        7 : 31,
        8 : 31,
        9 : 30,
        10 : 31,
        11 : 30,
        12 : 31,
    }
    if(month === undefined) {
        throw 'month is undefined'
    }
    if(day === undefined) {
        throw 'day is undefined'
    }
    if(typeof(month) == 'string' && month.trim().length == 0) {
        throw 'month cannot be empty string'
    }
    if(typeof(day) == 'string' && day.trim().length == 0) {
        throw 'month cannot be empty string'
    }
    if(isNaN(month)) {
        throw 'month cannot convert to number'
    }
    if(isNaN(day)) {
        throw 'day cannot convert to number'
    }
    if(parseInt(month) > 12 || parseInt(month) < 1) {
        throw 'range of month is out of bound'
    }
    const maxDay = Month_Days[parseInt(month)]
    if(parseInt(day) < 0 || parseInt(day) > maxDay) {
        throw 'There are not ' +  day  + ' days in '  + month + ' month'
    }
}

async function getPersonById(id) {
    checkID(id);
    let arrayOfPeople = await getPeople();
    for(const person of arrayOfPeople) {
        if(person.id == id) {
            return person
        }
    }
    throw 'person not found';
}


async function sameEmail(emailDomain) {
    checkEmail(emailDomain)
    emailDomain = emailDomain.toLowerCase();
    let arrayOfPeople = await getPeople();
    let res = [];
    for(const person of arrayOfPeople) {
        const personEmail = person.email.toLowerCase()
        const personEmailReverse = personEmail.split("").reverse().join("");
        const personEmailDomain = personEmailReverse.substring(0, emailDomain.length).split("").reverse().join("");
        if(personEmailDomain === emailDomain) {
            res.push(person);
        }
    }
    if(res.length >= 2) {
        return res;
    }
    throw 'there are not at least two people that have the same email domain provided';
}


async function manipulateIp() {
    let arrayOfPeople = await getPeople();
    const firstPerson = arrayOfPeople[0];
    const firstPersonSSNS = getSSNS(firstPerson.ip_address);
    let hi = {
        firstName : firstPerson.first_name,
        lastName : firstPerson.last_name, 
        SSNS : firstPersonSSNS
    }
    let lo = {
        firstName : firstPerson.first_name,
        lastName : firstPerson.last_name, 
        SSNS : firstPersonSSNS
    }
    let sum = firstPersonSSNS;
    for(let i = 1; i <  arrayOfPeople.length; i++) {
        const ip = arrayOfPeople[i].ip_address
        let ssns = getSSNS(ip)
        if(hi.SSNS < ssns) {
            hi.firstName = arrayOfPeople[i].first_name
            hi.lastName = arrayOfPeople[i].last_name
            hi.SSNS = ssns
        } 
        if(lo.SSNS > ssns) {
            lo.firstName = arrayOfPeople[i].first_name
            lo.lastName = arrayOfPeople[i].last_name
            lo.SSNS = ssns
        }
        sum += ssns
    }
    const res = {
        hightest : {firstName : hi.firstName, lastName : hi.lastName},
        lowest : {firstName : lo.firstName, lastName : lo.lastName},
        average : Math.floor(sum / arrayOfPeople.length)
    }
    return res
}

function getSSNS(ip) {
    let ipWithOutDot = []
    for(element of ip) {
        if(element !== '.') {
            ipWithOutDot.push(element);
        }
    }
    let SSNS = ipWithOutDot.sort().join("");
    return parseInt(SSNS)
}



async function sameBirthday(month, day) {
    checkDay(month, day)
    let arrayOfPeople = await getPeople();
    let res = []
    for(const person of arrayOfPeople) {
        const dob = person.date_of_birth.split('/');
        if(parseInt(dob[0]) == parseInt(month) && parseInt(dob[1]) == parseInt(day)) {
            res.push(person.first_name + ' ' + person.last_name);
        }
    }
    if(res.length == 0) {
        throw 'there are no people with that birthday'
    }
    return res;
}



module.exports = {getPersonById, sameEmail, manipulateIp,sameBirthday};