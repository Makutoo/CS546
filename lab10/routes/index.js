const express = require("express")
const router = express.Router()
const data = require("../data")
const userData = data.users
//const path = require('path');
const inputCheck = require("../checkInput")


const logger = function (req, res, next) {
    console.log("[%s]: %s %s (%s)",
    new Date().toUTCString(),
    req.method,
    req.originalUrl,
    `${isLoggedIn(req) ? "Authenticated User" :"Non-Authenticated User"}`
    )
    next()
}

router.use(logger) //apply logger middleware function to all router

const isLoggedIn = function (req) {
    if(req.session.user != undefined) {
        return true;
    } else {
        return false;
    }
};

router.get("/", async(req, res) => {
    if (isLoggedIn(req)) {
        res.redirect("/private")
    } else {
        res.redirect("/login")
    }
    return
})

router.get("/signup", async(req, res) => {
    if (isLoggedIn(req)) {
        res.redirect("/private")
    }
    res.render('signup')
    return
});

router.post("/signup", async(req, res) => {
    let signupStatus = false
    try {
        username = inputCheck.checkUsernameIsVaild(req.body.username)
        password = inputCheck.checkPasswordIsVaild(req.body.password)
        signupStatus = await userData.createUser(username,password)
    } catch (e) {
        res.status(400);
        res.render('signup', {error: e})
        return
    }
    if(signupStatus.userInserted) {
        res.redirect("/")
    } else {
        res.status(500).json("Internal Server Error");
    }
    return
});

router.get("/login", async(req, res) => {
    if (isLoggedIn(req)) {
        res.redirect("/private")
    }
    res.render('login')
    return
});
router.post("/login", async(req, res) => {
    if (isLoggedIn(req)) {
        res.redirect("/private")
    }
    try {
        username = inputCheck.checkUsernameIsVaild(req.body.username)
        password = inputCheck.checkPasswordIsVaild(req.body.password)
        signinStatus = await userData.checkUser(username, password)
        if(signinStatus.authenticated) {
            req.session.user = username;
            res.redirect('/private')
        }
    } catch (e) {
        res.status(400);
        res.render('login', {error: e})
    }
    return
});


const authentication_Middleware = function (req, res, next) {
    if (isLoggedIn(req)) {
        next()
    } else {
        res.status(403);
        res.render('notYetLoggedIn', {layout: false})
    }
}

router.use('/private', authentication_Middleware) //apply authentication middleware function to /private router

router.get('/private', function (req, res, next) {
    const username = req.session.user
    res.render('displayUsername', {layout: false, username : username})
});

router.get('/logout', async(req, res) => {
    if(isLoggedIn(req)) {
        const username = req.session.user
        req.session.destroy()
        req.session = null
        res.render('logout',{layout: false, username : username})
    } else {
        res.redirect('login')
    }
    
})


const constructorMethod = app => {
    app.use("/", router)
    app.use("*", (req, res) => {
        res.status(404).send("Invalid Page")
    })
}

module.exports = constructorMethod