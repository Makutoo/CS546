let axios = require("axios")

async function getMoivesByTerm(term) {
    const { data } = await axios.get("http://api.tvmaze.com/search/shows?q=" + term)
    return data
}

async function getMoiveById(id) {
    const { data } = await axios.get("http://api.tvmaze.com/shows/" + id)
    return data
}

module.exports = 
{
    getMoivesByTerm,
    getMoiveById
}