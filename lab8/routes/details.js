const express = require("express")
const router = express.Router()
const data = require('../data');
const mvData = data.mv

router.get("/:id", async (req, res) => {
    try {
        const id = checkIdIsVaild(req.params.id)
        const show = await mvData.getMoiveById(id)
        const cleanSummary = removeHtmlTags(show.summary);
        res.render("shows/details", { show: show, summary: cleanSummary, layout: false })
    } catch(e) {
        res.render("shows/error",{layout: false, error: e});
    }
})

function removeHtmlTags(summary) {
    let cleanText = summary.replace(/<\/?[^>]+(>|$)/g, "");
    return cleanText
}

function checkIdIsVaild(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0) {
        throw 'id cannot be an empty string or just spaces';
    }
    if (parseInt(id) == NaN) {
        throw 'id is not vaild'
    }
    id = id.trim();
    return id
}

module.exports = router