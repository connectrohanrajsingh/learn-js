// 1. What is a Function?
// ================================
// A function is a reusable block of code designed to perform a task.

function greet() {
    console.log("Hello from a function");
}

greet(); // calling/executing the function



// 2. Function Declaration
// ================================
// Hoisted → can be called before it appears in code

sayHi(); // works due to hoisting

function sayHi() {
    console.log("Hi!");
}



// 3. Function Expression
// ================================
// Not hoisted like declarations

// hello(); Error if called before definition

const hello = function () {
    console.log("Hello from function expression");
};

hello();



// 4. Arrow Functions
// ================================
// Shorter syntax, no own 'this', cannot be used as constructors

const add = (a, b) => {
    return a + b;
};

console.log("Arrow add:", add(2, 3));

// Single line return (implicit return)
const square = x => x * x;
console.log("Square:", square(5));



// 5. Parameters and Arguments
// ================================

function sum(a, b) { // a and b are parameters
    console.log("Sum:", a + b);
}

sum(4, 6); // 4 and 6 are arguments



// 6. Default Parameters
// ================================

function multiply(a, b = 2) {
    console.log("Multiply:", a * b);
}

multiply(5);    // 10 (b default = 2)
multiply(5, 3); // 15



// 7. Rest Parameters (...)
// ================================
// Collects multiple arguments into an array

function total(...numbers) {
    console.log("Numbers array:", numbers);
}

total(1, 2, 3, 4);



// 8. arguments Object (non-arrow only)
// ================================

function showArgs() {
    console.log("arguments:", arguments);
}

showArgs(10, 20, 30);



// 9. Return Statement
// ================================
// Stops execution and sends value back

function subtract(a, b) {
    return a - b;
}

let result = subtract(10, 4);
console.log("Returned value:", result);



// 10. Function Scope
// ================================
// Variables declared inside are not accessible outside

function testScope() {
    let inside = "I am inside";
    console.log(inside);
}

testScope();
// console.log(inside); Error



// 11. Closures
// ================================
// Inner function remembers outer variables

function outer() {
    let count = 0;

    return function inner() {
        count++;
        console.log("Count:", count);
    };
}

const counter = outer();
counter(); // 1
counter(); // 2




// 12. Function Hoisting Difference
// ================================

hoisted();

function hoisted() {
    console.log("I am hoisted");
}

// notHoisted(); // Will not work since it is an expression
// const notHoisted = function() {};




// 13. this Keyword in Functions
// ================================

const obj = {
    value: 10,
    regularFunc: function () {
        console.log("regularFunc this.value:", this.value);
    },
    arrowFunc: () => {
        console.log("arrowFunc this:", this);
    }
};

obj.regularFunc(); // this refers to obj
obj.arrowFunc();   // this refers to outer/global




// 14. call(), apply(), bind()
// ================================

function showValue() {
    console.log("Value:", this.num);
}

const context = { num: 42 };

showValue.call(context);  // call
showValue.apply(context); // apply

const boundFunc = showValue.bind(context);
boundFunc(); // bind




// 15. Immediately Invoked Function (IIFE)
// ================================

(function () {
    console.log("IIFE runs immediately");
})();




// 16. Recursive Functions
// ================================

function countdown(n) {
    if (n <= 0) return;
    console.log(n);
    countdown(n - 1);
}

countdown(3);




// 17. Functions as First-Class Citizens
// ================================
// Can be assigned, passed, returned

function sayHello() {
    console.log("Hello!");
}

function execute(fn) {
    fn();
}

execute(sayHello);




// 18. Higher-Order Functions
// ================================
// Function that takes or returns another function

function multiplier(factor) {
    return function (num) {
        return num * factor;
    };
}

const double = multiplier(2);
console.log("Double 5:", double(5));




// 19. Function Properties
// ================================

function example(a, b, c) { }

console.log("Function name:", example.name);
console.log("Expected parameters (length):", example.length);




// 20. Constructor Functions
// ================================
// Used with 'new'

function Person(name) {
    this.name = name;
}

const p1 = new Person("Rohan");
console.log("Constructor function object:", p1);



// 21. Summary
// ================================
// Functions Summary:
// 
// - Function Declaration (hoisted)
// - Function Expression (not hoisted)
// - Arrow Functions (no own this, short syntax)
// - Parameters vs Arguments
// - Default Parameters
// - Rest Parameters (...)
// - arguments object
// - return statement
// - Function scope
// - Closures
// - Hoisting behavior
// - this keyword differences
// - call, apply, bind
// - IIFE
// - Recursion
// - First-class functions
// - Higher-order functions
// - Function properties (name, length)
// - Constructor functions with new
