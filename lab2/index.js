const myArray = require("./arrayUtils");
const myString = require("./stringUtils"); 
const myObject = require("./objUtils");
// Mean Tests
try {
    // Should Pass
    const meanOne = myArray.mean([2, 3, 4]);
    console.log('mean passed successfully, retrun ' +  meanOne);
 } catch (e) {
    console.error('mean failed test case');
 }

 try {
    // Should Fail
    const meanTwo = myArray.mean(1234);
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully because ' + e);
 }

// medianSquared Tests
 try {
    // Should Pass
    const medianSquareOne = myArray.medianSquared([3, 4, 5, 2, 10]);
    console.log('medianSquared passed successfully, retrun ' +  medianSquareOne);
 } catch (e) {
    console.error('medianSquared failed test case');
 }

 try {
    // Should Fail
    const medianSquaredTwo = myArray.medianSquared([3,'a', 5, 2, 10]);
    console.error('medianSquared did not error');
 } catch (e) {
    console.log('medianSquared failed successfully because ' + e);
 }


 // maxElement Tests
 try {
    // Should Pass
    const maxElementOne = myArray.maxElement([5, 6, 7]);
    console.log('maxElement passed successfully, retrun ' + JSON.stringify(maxElementOne));
    
 } catch (e) {
    console.error('maxElement failed test case');
 }

 try {
    // Should Fail
    const medianSquaredTwo = myArray.maxElement();
    console.error('maxElement did not error');
 } catch (e) {
    console.log('maxElement failed successfully because ' + e);
 }

 //fill Tests 
 try {
    // Should Pass
    const fillOne = myArray.fill(3,"Welcome");
    console.log('fill passed successfully, retrun ' + JSON.stringify(fillOne));
 } catch (e) {
    console.error('fill failed test case');
 }

 try {
    // Should Fail
    const fillTwo = myArray.fill(3.2);
    console.error('fill did not error');
 } catch (e) {
    console.log('fill failed successfully because ' + e);
 }

//countRepeating Tests 
  try {
    // Should Pass
    const countRepeatingOne = myArray.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
    console.log('countRepeating passed successfully, retrun ' + JSON.stringify(countRepeatingOne));
 } catch (e) {
    console.error('countRepeating failed test case');
 }

 try {
    // Should Fail
    const countRepeatingTwo = myArray.countRepeating({a: 1, b: 2, c: "Patrick"});
    console.error('countRepeating did not error');
 } catch (e) {
    console.log('countRepeating failed successfully because ' + e);
 }

 //isEqual Tests
 try {
    // Should Pass
    const isEqualOne = myArray.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]);
    console.log('isEqual passed successfully, retrun ' + isEqualOne);
 } catch (e) {
    console.error('countRepeating failed test case');
 }

 try {
    // Should Fail
    const isEqualTwo = myArray.isEqual([ 1, 2, 3 ],"Patrick");
    console.error('isEqual did not error');
 } catch (e) {
    console.log('isEqual failed successfully because ' + e);
 }

 //camelCase Tests
 try {
   // Should Pass
   const camelCaseOne = myString.camelCase("How now brown cow");
   console.log('camelCase passed successfully, retrun ' + camelCaseOne);
} catch (e) {
   console.error('camelCase failed test case');
}

try {
   // Should Fail
   const camelCaseTwo = myString.camelCase(["Hello", "World"]);
   console.error('camelCase did not error');
} catch (e) {
   console.log('camelCase failed successfully because ' + e);
}


//replaceChar Tests
try {
   // Should Pass
   const replaceCharOne = myString.replaceChar("babbbbble");
   console.log('replaceChar passed successfully, retrun ' + replaceCharOne);
} catch (e) {
   console.error('replaceChar failed test case');
}

try {
   // Should Fail
   const replaceCharTwo = myString.replaceChar("");
   console.error('replaceChar did not error');
} catch (e) {
   console.log('replaceChar failed successfully because ' + e);
}

//mashUp Tests
try {
   // Should Pass
   const mashUpOne = myString.mashUp("Patrick", "Hill");
   console.log('mashUp passed successfully, retrun ' + mashUpOne);
} catch (e) {
   console.error('mashUp failed test case');
}

try {
   // Should Fail
   const mashUpTwo = myString.mashUp("Patrick", "");
   console.error('mashUp did not error');
} catch (e) {
   console.log('mashUp failed successfully because ' + e);
}

//makeArrays Tests 
try {
   const first = { x: 2, y: 3};
   const second = { a: 70, x: 4, z: 5 };
   const third = { x: 0, y: 9, q: 10 };
   // Should Pass
   const makeArraysOne = myObject.makeArrays([third, first, second]);
   console.log('makeArrays passed successfully, retrun ' + JSON.stringify(makeArraysOne));
} catch (e) {
   console.error('makeArrays failed test case');
}

try {
   const first = { x: 2, y: 3};
   const second = {};
   const third = { x: 0, y: 9, q: 10 };
   // Should Fail
   const makeArraysTwo = myObject.makeArrays([first,second,third]);
   console.error('makeArrays did not error');
} catch (e) {
   console.log('makeArrays failed successfully because ' + e);
}

//isDeepEqual Tests 
try {
   // Should Pass
   const first = {a: 2, b: 3};
   const second = {a: 2, b: 4};
   const third = {a: 2, b: 3};
   const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
   const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
   const isDeepEqualOne = myObject.isDeepEqual(forth, fifth);
   console.log('isDeepEqual passed successfully, retrun ' + JSON.stringify(isDeepEqualOne));
} catch (e) {
   console.error('isDeepEqual failed test case');
}

try {
   // Should Fail
   const first = {a: 2, b: 3};
   const second = {a: 2, b: 4};
   const third = {a: 2, b: 3};
   const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
   const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
   const isDeepEqualTwo = myObject.isDeepEqual("foo", "bar");
   console.error('isDeepEqual did not error');
} catch (e) {
   console.log('isDeepEqual failed successfully because ' + e);
}


//computeObject Tests 
try {
   // Should Pass
   const computeObjectOne = myObject.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
   console.log('computeObject passed successfully, retrun ' + JSON.stringify(computeObjectOne));
} catch (e) {
   console.error('computeObject failed test case');
}

try {
   // Should Fail
   const computeObjectTwo = myObject.computeObject({ a: 3, b: 7, c: 5 });
   console.error('computeObject did not error');
} catch (e) {
   console.log('computeObject failed successfully because ' + e);
}
