const axios = require("axios");
const validation = require('./validation');
const workUrl = "https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json";

async function getCompanies(){ // this function is from Lab3 instruction
    const { data } = await axios.get(workUrl)
    return data // this will be the array of people objects
}


async function getCompanyById(id) {
    id = validation.checkId(id);
    const companies = await getCompanies();
    for(const company of companies) {
        if(company.id == id) {
            return company
        }
    }
    throw 'company with this id did not found'
}

async function getAllCompany() {
    const companies = await getCompanies();
    return companies;
}


module.exports = {
    getCompanyById,
    getAllCompany
}