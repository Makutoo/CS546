function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
}

function checkUsernameIsVaild(username) {
    if (!username) throw 'must provide username';
    if (typeof username !== 'string') throw 'username must be a string';
    if (username.trim().length < 4) {
        throw 'username should be at least 4 characters long';
    }
    username = username.trim();
    let USERNAME = "";
    for (var i = 0; i < username.length; i++) {
        let c = username.charAt(i)
        if(isCharacterALetter(c)) {
            USERNAME += c.toUpperCase();
        } else {
            throw'no spaces in the username and only alphanumeric characters'
        }
    };
    return USERNAME
}


function checkPasswordIsVaild(password) {
    if(!password) throw 'must provide password'
    if (typeof password !== 'string') throw 'password must be a string';
    if (password.trim().length < 6) {
        throw 'password should be at least 6 characters long';
    }
    for (var i = 0; i < password.length; i++) {
        if(password.charAt(i) === ' ') {
            throw 'password cannot contain space'
        }
    };
    return password
}

module.exports = {
    checkPasswordIsVaild,
    checkUsernameIsVaild
}