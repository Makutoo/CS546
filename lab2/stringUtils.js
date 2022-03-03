function stringExists(string, which) {
    if(string === undefined) {
        if(which !== undefined) {
            throw which + ' string is undefined';
        }else {
            throw 'string is undefined';
        }
    }
}

function stringIsNotEmpty(string, which) {
    if(string.length == 0) {
        if(which !== undefined) {
            throw which + ' string is empty';
        }else {
            throw 'string is empty';
        }
    }
}

function stringIsStringType(string, which) {
    if(typeof(string) != "string") {
        if(which !== undefined) {
            throw which + ' input is not a string';
        }else {
            throw 'input is not a string';
        }
        
    }
}

function stringLengthAtLeast2(string, which) {
    if(string.length < 2) {
        if(which !== undefined) {
            throw which + ' string length is less than 2';
        }else {
            throw 'string length is less than 2';
        }
    }
}

const camelCase = function camelCase(string) {
    stringExists(string);
    stringIsStringType(string);
    string = string.trim();
    stringIsNotEmpty(string);
    let stringArr = string.trim().split(" ");
    let res = stringArr[0].toLowerCase();
    for(let i = 1; i < stringArr.length; i++) {
        res +=  stringArr[i].charAt(0).toUpperCase();
        res += stringArr[i].slice(1).toLowerCase();
    }
    return res;
}


const replaceChar = function replaceChar(string) {
    stringExists(string);
    stringIsStringType(string);
    string = string.trim();
    stringIsNotEmpty(string);
    let count = 0;
    let headChar = string.charAt(0);
    let res = headChar;
    for(let i = 1; i < string.length; i++) {
        if(string.charAt(i).toLowerCase() === headChar.toLowerCase()) {
            if(count % 2 == 0) {
                res += '*';
            }else {
                res += '$';
            }
            count++;
        }else {
            res += string.charAt(i);
        }
    }
    return res;
}


const mashUp = function mashUp(string1, string2) {
    stringExists(string1, 'First');
    stringExists(string2, 'Second');
    stringIsStringType(string2, 'First');
    stringIsStringType(string2, 'Second');
    string1 = string1.trim();
    string2 = string2.trim();
    stringLengthAtLeast2(string1, 'First');
    stringLengthAtLeast2(string2, 'Second');
    let newString1 = string2.substring(0, 2) + string1.substring(2);
    let newString2 = string1.substring(0, 2) + string2.substring(2);
    let newString = newString1 + " " + newString2;
    return newString;
}

module.exports = {
    camelCase,
    replaceChar,
    mashUp
};
