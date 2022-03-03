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

function checkArrayIsNotEmpty(array) {
    if(array.length == 0) {
        throw 'Array is empty';
    }
}

function checkEachElementInArrayIsNumber(array) {
    array.forEach(element => {
        if(typeof(element) != "number") {
            throw 'Something in array is not a number'
        }
    });
}

const mean = function mean(array) {
    checkArrayExists(array);
    checkArrayIsArray(array);
    checkArrayIsNotEmpty(array);
    checkEachElementInArrayIsNumber(array);
    let sum = 0;
    array.forEach(element => {
        sum += element;
    });
    return sum / array.length;
}

const medianSquared = function medianSquared(array) {
    checkArrayExists(array);
    checkArrayIsArray(array);
    checkArrayIsNotEmpty(array);
    checkEachElementInArrayIsNumber(array);
    array.sort();
    let median = 0;
    if(array.length % 2 == 0) {
        median = (array[array.length/2] + array[array.length/2-1])/2;
    }else {
        median = array[Math.floor(array.length / 2)];
    }
    return median * median;
}

const maxElement = function maxElement(array) {
    checkArrayExists(array);
    checkArrayIsArray(array);
    checkArrayIsNotEmpty(array);
    checkEachElementInArrayIsNumber(array);
    let max = array[0]
    let index = 0;
    for(let i = 1; i < array.length; i++) {
        if(array[i] > max) {
            max = array[i];
            index = i;
        }
    }
    return {[max] : index};
}

const fill = function fill(end, value) {
    if(end == undefined) {
        throw 'end param is undefined';
    }
    if(typeof(end) != 'number') {
        throw 'end param is not a number';
    }
    if(!Number.isInteger(end)) {
        throw 'end param is not an interger';
    }
    if(end <= 0) {
        throw 'end param is not greater than zero';
    }
    let array = [];
    if(value != undefined) {
        for(let i = 0; i < end; i++) {
            array.push(value);
        }
    }else {
        for(let i = 0; i < end; i++) {
            array.push(i);
        }
    }
    return array;
}

const countRepeating = function countRepeating(array) {
    checkArrayExists(array);
    checkArrayIsArray(array);
    let map = new Map()
    for(let i = 0; i < array.length; i++) {
        let cur_element = array[i];
        if(typeof(cur_element) === "number") {
            cur_element = cur_element.toString();
        }
        if(map.has(cur_element)) {
            map.set(cur_element, map.get(cur_element) + 1);
        }else {
            map.set(cur_element, 1);
        }
    }
    for(let[key, value] of map) {
        if(value === 1) {
            map.delete(key);
        }
    }
    return Object.fromEntries(map);
}

const isEqual = function isEqual(arrayOne, arrayTwo) {
    checkArrayExists(arrayOne, 'First');
    checkArrayIsArray(arrayOne, 'First');
    checkArrayExists(arrayTwo, 'Sceond');
    checkArrayIsArray(arrayTwo, 'Sceond');
    if(arrayOne.length != arrayTwo.length) return false;
    arrayOne.sort();
    arrayTwo.sort();
    for(let i = 0; i < arrayOne.length; i++) {
        if(typeof(arrayOne[i]) != typeof(arrayTwo[i])) return false;
        if(Array.isArray(arrayOne[i]) && Array.isArray(arrayTwo[i])) {
            if(!isEqual(arrayOne[i], arrayTwo[i])) {
                return false;
            }
        }else if(arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
        
    }
    return true;
}


module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};