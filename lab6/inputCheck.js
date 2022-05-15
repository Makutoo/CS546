const { ObjectId } = require('mongodb');


function checkIdIsVaild(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0) {
        throw 'id cannot be an empty string or just spaces';
    }
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    return id
}

function checkNameIsVaild(name) {
    if(!name) throw 'You must provided name'
    if(typeof(name) !== 'string') throw 'Name is not a string'
    name = name.trim();
    if (name.trim().length === 0) {
        throw 'name cannot be an empty string or just spaces';
    }
    return name;
}

function checkGenreIsVaild(genre) {
    if(!genre) throw 'You must provided genre'
    if(!Array.isArray(genre)) {
        throw 'genre must be an arrays'
    }
    if(genre.length < 1) {
        throw 'genre must have at least one element'
    }
    genre.forEach(element => {
        if(typeof(element) !== 'string') {
            throw 'some element in genre is not a string'
        }
        if(element.trim().lenght == 0) {
            throw 'some element in genre is empty string'
        }
        element = element.trim();
    })
    return genre
}

function checkWebsiteIsVaild(website) {
    if(!website) throw 'You must provided website'
    if(typeof(website) !== 'string') throw 'website is not a string'
    if (website.trim().length === 0) {
        throw 'website cannot be an empty string or just spaces';
    }
    website = website.trim();
    if(!website.startsWith("http://www.")) {
            throw 'webstie does not start with http://www.'
    }
    if(!website.endsWith(".com")) {
        throw 'webstie does not end with .com'
    }
    if(website.substring(11, website.length - 4).length < 5) {
        throw 'There needs to be 5 characters between http://www. And .com'
    }
    return website
}

function checkRecordLabelIsVaild(recordLabel) {
    if(!recordLabel) throw 'You must provided recordLabel'
    if(typeof(recordLabel) !== 'string') throw 'recordLabel is not a string'
    if (recordLabel.trim().length === 0) {
        throw 'recordLabel cannot be an empty string or just spaces';
    }
    recordLabel = recordLabel.trim();
    return recordLabel
}

function checkBandMembers(bandMembers) {
    if(!bandMembers) throw 'You must provided bandMembers'
    if(!Array.isArray(bandMembers)) {
        throw 'bandMembers must be an arrays'
    }
    if(bandMembers.length < 1) {
        throw 'bandMembers must have at least one element'
    }
    bandMembers.forEach(element => {
        if(typeof(element) !== 'string') {
            throw 'some element in bandMembers is not a string'
        }
        if(element.trim().lenght == 0) {
            throw 'some element in bandMembers is empty string'
        }
        element = element.trim();
    })
    return bandMembers
}

function checkYearFormed(yearFormed) {
    if(!yearFormed) throw 'You must provided yearFormed'
    if(typeof(yearFormed) !== 'number') {
        throw 'yearFormed is not a number'
    }
    if(yearFormed < 1900 || yearFormed > 2022) {
        throw 'yearFromed is not Vaild (only years 1900-2022 are valid values)'
    }
    return yearFormed
}

function checkTitleIsVaild(title) {
    if(!title) throw 'You must provided title'
    if(typeof(title) !== 'string') throw 'Title is not a string'
    if (title.trim().length === 0) {
        throw 'title cannot be an empty string or just spaces';
    }
    title = title.trim();
    return title
}

function checkReleaseDateIsVaild(releaseDate) {
    if(!releaseDate) throw 'You must provided releaseDate'
    if(typeof(releaseDate) !== 'string') throw 'ReleaseDate is not a string'
    if (releaseDate.trim().length === 0) {
        throw 'ReleaseDate cannot be an empty string or just spaces';
    }
    releaseDate = releaseDate.trim()
    const data = releaseDate.split("/");
    checkDate(data[0], data[1], data[2]);
    return releaseDate;
}

function checkTracksIsVaild(tracks) {
    if(!tracks) throw 'You must provided tracks'
    if(!Array.isArray(tracks)) {
        throw 'tracks must be an arrays'
    }
    if(tracks.length < 3) {
        throw 'tracks must have at three one element'
    }
    tracks.forEach(element => {
        if(typeof(element) !== 'string') {
            throw 'some element in tracks is not a string'
        }
        if(element.trim().lenght == 0) {
            throw 'some element in tracks is empty string'
        }
        element = element.trim();
    })
    return tracks
}

function checkRatingIsVaild(rating) {
    if(!rating) throw 'You must provided rating'
    if(typeof(rating) !== 'number' || rating < 0 || rating > 5) {
        throw 'rating is not a number from 0 to 5'
    }
    return Number(rating.toFixed(1))
}

module.exports = {
    checkIdIsVaild,
    checkNameIsVaild,
    checkGenreIsVaild,
    checkWebsiteIsVaild,
    checkRecordLabelIsVaild,
    checkBandMembers,
    checkYearFormed,
    checkTitleIsVaild,
    checkReleaseDateIsVaild,
    checkTracksIsVaild,
    checkRatingIsVaild
}

function checkDate(month, day, year) {
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
        throw 'releasemonth is undefined'
    }
    if(day === undefined) {
        throw 'releaseday is undefined'
    }
    if(year === undefined) {
        throw 'releaseyead is undefined'
    }
    if(typeof(month) == 'string' && month.trim().length == 0) {
        throw 'releasemonth cannot be empty string'
    }
    if(typeof(day) == 'string' && day.trim().length == 0) {
        throw 'release day cannot be empty string'
    }
    if(typeof(year) == 'string' && year.trim().length == 0) {
        throw 'release year cannot be empty string'
    }

    if(isNaN(month)) {
        throw 'release month cannot convert to number'
    }
    if(isNaN(day)) {
        throw 'release day cannot convert to number'
    }
    if(isNaN(year)) {
        throw 'release year cannot convert to number'
    }

    if(parseInt(month) > 12 || parseInt(month) < 1) {
        throw 'range of release month is out of bound'
    }

    if(parseInt(year) > 2022 || parseInt(year) < 1900) {
        throw 'range of release year is out of bound'
    }

    const maxDay = Month_Days[parseInt(month)]
    if(parseInt(day) < 0 || parseInt(day) > maxDay) {
        throw 'release day error: there are not ' +  day  + ' days in '  + month + ' month'
    }
}