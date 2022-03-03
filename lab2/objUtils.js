function checkArrayExists(array, which) {
    if(array === undefined) {
        if(which === undefined) {
            throw 'Array is undefined';
        }else {
            throw which + ' array is undefined';
        }
    }
}

function checkArrayIsArray(array, which) {
    if(!Array.isArray(array)) {
        if(which === undefined) {
            throw 'Input is not an array';
        }else {
            throw which + ' input is not an array';
        }
    }
}

function checkArrayIsNotEmptyAndMoreThanOneElements(array) {
    if(array.length == 0) {
        throw 'Array is empty';
    }else if(array.length < 2) {
        throw 'It required at least 2 elements(object) in the array'
    }
}

function checkElementInArrayIsVaildObj(array) {
    array.forEach(element => {
        if(typeof(element) != "object") {
            throw 'Something in the array is not an object';
        }else {
            if(Object.keys(element).length == 0) {
                throw 'Some object is empty';
            }
        }
    })
}

function checkIsVaildObject(obj, which) {
    if(Array.isArray(obj) || typeof(obj) != "object") {
        if(which !== undefined) {
            throw which + ' input is not a proper object for this function';
        }else {
            throw 'Input is not a proper object for this function';
        }
    }
}

function checkIsObject(obj, which) {
    if(typeof(obj) != "object") {
        if(which !== undefined) {
            throw which + ' input is not a proper object for this function';
        }else {
            throw 'Input is not a proper object for this function';
        }
    }
}

function checkFunctionExistsAndProperType(func) {
    if(func === undefined) {
        throw 'Function is undefined';
    }
    if(typeof(func) != "function") {
        throw 'func parameter is not function type'
    }
}

function checkValuesInObjectAreAllNumber(object) {
    Object.entries(object).forEach(entry => {
        let [key, value] = entry;
        if(typeof(value) != "number") {
            throw 'Something value in the object is not a number';
        }
    })
}


const makeArrays = function makeArrays(objs) {
    checkArrayExists(objs);
    checkArrayIsArray(objs);
    checkArrayIsNotEmptyAndMoreThanOneElements(objs);
    checkElementInArrayIsVaildObj(objs);
    let res = [];
    objs.forEach(obj => {
        Object.entries(obj).forEach(entry => {
            let arr = [];
            const[key, value] = entry;
            arr.push(key);
            arr.push(value);
            res.push(arr);
        })
    });
    return res;
}

const isDeepEqual = function isDeepEqual(obj1, obj2) {
    checkIsVaildObject(obj1, 'Frist');
    checkIsVaildObject(obj2, 'Second')
    for(const[key, value] of Object.entries(obj1)) {
        if(!obj2.hasOwnProperty(key)) {
            return false;
        }
        if(typeof(obj1[key]) != typeof(obj2[key])) {
            return false;
        }
        if(typeof(obj1[key]) == "object") {
            return isDeepEqual(obj1[key], obj2[key]);
        }else {
            if(obj1[key] !== obj2[key]) {
                return false;
            }
        }
    };
    return true;
}

const computeObject = function computeObject(object, func) {
    checkIsObject(object);
    checkValuesInObjectAreAllNumber(object);
    checkFunctionExistsAndProperType(func);
    Object.entries(object).forEach(entry => {
        let [key, value] = entry;
        object[key] = func(value);
    });
    return object;
}


module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
};