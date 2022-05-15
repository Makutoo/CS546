const express = require("express")
const router = express.Router()
router.use(express.json())
const mvData = require("../data/mv")

router.post("/", async (req, res) => {
    try {
        let searchBody = req.body
        let term = checkTermIsVaild(searchBody.showSearchTerm)
        const moives = await mvData.getMoivesByTerm(term)
        let topFiveShows= []
        let i = 0
        while(i < 5 && moives[i] != undefined) {
            topFiveShows.push(moives[i++])
        }
        term = "<p>" + term + "</p>"
        
        res.render("shows/search",{layout: false, shows: topFiveShows, showSearchTerm: term})
    } catch(e) {
        res.render("shows/error",{layout: false, error: e});
    }
})

function checkTermIsVaild(term) {
    if (!term) throw 'You must provide an term to search for';
    if (typeof term !== 'string') throw 'term must be a string';
    if (term.trim().length === 0) {
        throw 'term cannot be an empty string or just spaces';
    }
    term = term.trim();
    return term
}

module.exports = router