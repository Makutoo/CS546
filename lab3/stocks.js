const axios = require("axios");
const peopleUrl = 'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json';
const stockUrl = 'https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json';

async function getPeople(){ // this function is from Lab3 instruction
    const { data } = await axios.get(peopleUrl)
    return data // this will be the array of people objects
}

async function getStock(){ 
    const { data } = await axios.get(stockUrl)
    return data 
}

function checkStockName(stockName) {
    if(stockName === undefined) {
        throw 'stock name is undefined'
    }
    if(typeof(stockName) != 'string') {
        throw 'stock name is not a string'
    }
    if(stockName.trim().length == 0) {
        throw 'stock name is a empty string'
    }
}

function checkFirstLastName(firstName, lastName) {
    if(firstName === undefined) {
        throw 'firstName is undefined'
    }
    if(lastName === undefined) {
        throw 'lastName is undefined'
    }
    if(typeof(firstName) != 'string') {
        throw 'firstName is not a string'
    }
    if(typeof(lastName) != 'string') {
        throw 'lastName is not a string'
    }
    
    if(firstName.trim().length == 0) {
        throw 'firstName cannot be empty string'
    }
    if(lastName.trim().length == 0) {
        throw 'lastName cannot be empty string'
    }
}

function checkStockId(id) {
    if(id === undefined) {
        throw 'stock id is undefined'
    }
    if(typeof(id) != 'string') {
        throw 'stock id is not a string'
    }
    if(id.trim().length == 0) {
        throw 'stock id is a empty string'
    }
}

async function listShareholders(stockName) {
    checkStockName(stockName)
    const stocks = await getStock();
    const people = await getPeople();
    for(let stock of stocks) {
        if(stock.stock_name === stockName) {
            stock.shareholders = await Promise.all(stock.shareholders.map(async (obj) => ({
                first_name : await getFristName(obj.userId, people),
                last_name : await getLastName(obj.userId, people),
                number_of_shares : obj.number_of_shares
            })))
            return stock
        }
    }
    throw 'No stock with that name'
}

async function getFristName(id, people) {
    for(const person of people) {
        if(person.id == id) {
            return person.first_name
        }
    }
    throw 'person not found';
}

async function getLastName(id, people) {
    for(const person of people) {
        if(person.id == id) {
            return person.last_name
        }
    }
    throw 'person not found';
}

async function totalShares(stockName) {
    const companyStockShareDetail = await listShareholders(stockName)
    let sum = 0;
    for(const stockSharer of companyStockShareDetail.shareholders) {
        sum += stockSharer.number_of_shares
    }
    if(sum === 0) {
        return stockName + " currently has no shareholders."
    }
    return stockName + ", has " + companyStockShareDetail.shareholders.length + " that own a total of " + sum + " shares."
}

async function listStocks(firstName, lastName) {
    checkFirstLastName(firstName, lastName)
    const stocks = await getStock();
    const people = await getPeople();
    let theGuy = undefined
    for(const person of people) {
        if(person.first_name === firstName && person.last_name === lastName) {
            theGuy = person
            break
        }
    }
    if(theGuy === undefined) {
        throw 'the person is not in people.json'
    }
    let res = []
    const id = theGuy.id
    for(const company of stocks) {
        for(shareholder of company.shareholders) {
            if(id === shareholder.userId) {
                res.push({
                    stock_name : company.stock_name,
                    number_of_shares : shareholder.number_of_shares
                })
            }
        }
    }
    if(res.length === 0) {
        throw 'the person does not owns shares in any company'
    }
    return res;
}

async function getStockById(id) {
    checkStockId(id)
    const stocks = await getStock();
    for(const company of stocks) {
        if(id === company.id) {
            return company
        }
    }
    throw 'stock not found'
}

module.exports = {listShareholders, totalShares, listStocks, getStockById};