const questionOne = function questionOne(arr) {
    let sum = 0;
    arr.forEach(element => {
        sum += element * element;
    });
    return sum;
}

const questionTwo = function questionTwo(num) { 
    if(num === 0 || num === 1) return num;
    else {
        return questionTwo(num-2) +  questionTwo(num-1);
    }
}

const questionThree = function questionThree(text) {
    let count = 0;
    for(let i = 0; i < text.length; i++) {
        let curChar = text.charAt(i);
        if(curChar === 'a' || curChar === 'e' || curChar === 'i' || curChar === 'o' || curChar === 'u') {
            count++;
        }
    }
    return count;
}

const questionFour = function questionFour(num) {
    if(num < 0) return NaN;
    let result = 1;
    while(num >= 2) {
        result *= num;
        num--;
    }
    return result;
}


module.exports = {
    firstName: "Ziheng", 
    lastName: "Zhu", 
    studentId: "10474431",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};