

function numberIsPrime(number) {
    if(number <= 1) {
        return false;
    } else if(number == 2) {
        return true;
    } else {
        for(let i = 2; i < number; i++) {
            if(number % i == 0) {
                return false;
            }
        }
        return true;
    }
}


const form = document.getElementById("checkPrime")

form.addEventListener('submit', function(event){
    event.preventDefault();
    const inputNumber = document.getElementById("number")
    const attemptsList = document.getElementById("attempts");
    const isPrime = numberIsPrime(inputNumber.value)
    const listNode = document.createElement("li");
    if(isPrime) {
        listNode.appendChild(document.createTextNode(inputNumber.value + " is a prime number"))
        listNode.setAttribute("class", "is-prime")
    } else {
        listNode.appendChild(document.createTextNode(inputNumber.value + " is not a prime number"))
        listNode.setAttribute("class", "not-prime")
    }
    attemptsList.appendChild(listNode);
    inputNumber.value = "";
})








//console.log(inputNumber)
//console.log(numberIsPrime(5))