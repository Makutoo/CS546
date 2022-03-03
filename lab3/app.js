const people = require('./people');
const stock = require('./stocks');



async function main() {
    //getPersonById success case
    try {
        const getPersonById = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10")
        console.log(getPersonById)
    } catch (error) {
        console.log(error)
    }
    //getPersonById fail case 
    try {
        const getPersonById = await people.getPersonById("d58-23c8d9ef5a10")
        console.log(getPersonById)
    } catch (error) {
        console.log(error)
    }
    //sameEmail success case
    try {
        const sameEmail = await people.sameEmail("HARVARD.edu")
        console.log(sameEmail)
    } catch (error) {
        console.log(error)
    }
    //sameEmail fail case
    try {
        const sameEmail = await people.sameEmail('@google.com.hk')
        console.log(sameEmail)
    } catch (error) {
        console.log(error)
    }
    //manipulateIp 
    try {
        const manipulateIp = await people.manipulateIp()
        console.log(manipulateIp)
    } catch (error) {
        console.log(error)
    }
    //sameBirthday success case
    try {
        const sameBirthday = await people.sameBirthday("09", 25)
        console.log(sameBirthday)
    } catch (error) {
        console.log(error)
    }
    //sameBirthday fail case
    try {
        const sameBirthday = await people.sameBirthday("09", "31")
        console.log(sameBirthday)
    } catch (error) {
        console.log(error)
    }
    //listShareholders success case
    try {
        const listShareholders = await stock.listShareholders("Aeglea BioTherapeutics, Inc.")
        console.log(listShareholders)
    } catch (error) {
        console.log(error)
    }
    //listShareholders fail case
    try {
        const listShareholders = await stock.listShareholders('foobar')
        console.log(listShareholders)
    } catch (error) {
        console.log(error)
    }
    //totalShares success case
    try {
        const totalShares = await stock.totalShares('Aeglea BioTherapeutics, Inc.')
        console.log(totalShares)
    } catch (error) {
        console.log(error)
    }
    //totalShares fail case
    try {
        const totalShares = await stock.totalShares('Foobar Inc')
        console.log(totalShares)
    } catch (error) {
        console.log(error)
    }
    //listStocks success case
     try {
        const listStocks = await stock.listStocks("Grenville", "Pawelke")
        console.log(listStocks)
    } catch (error) {
        console.log(error)
    }
    //listStocks fail case
    try {
        const listStocks = await stock.listStocks('Patrick', "Hill")
        console.log(listStocks)
    } catch (error) {
        console.log(error)
    }
    //getStockById success case
    try {
        const getStockById = await stock.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0")
        console.log(getStockById)
    } catch (error) {
        console.log(error)
    }
    //getStockById fail case
    try {
        const getStockById = await stock.getStockById('')
        console.log(getStockById)
    } catch (error) {
        console.log(error)
    }
}

main()