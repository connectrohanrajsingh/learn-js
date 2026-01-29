// 1. What are Data Types?
// ================================
// Data types define **what kind of value a variable holds**.
// Think of it like different kinds of boxes:
// - Some boxes hold text
// - Some hold numbers
// - Some hold true/false values
// - Some hold multiple items together

// JavaScript is **dynamically typed**:
// - You do NOT need to declare the type of variable explicitly
// - Variable type is determined by the value assigned

// Example:
let example = "Hello"; // JS knows this is a string
console.log("Dynamic typing example:", example);


// 2. Primitive vs Non-Primitive Data Types
// ================================

// 2.1 Primitive Data Types
// - Immutable (cannot be changed directly)
// - Stored by value
// - Types: String, Number, Boolean, Undefined, Null, Symbol, BigInt

// 2.1.1 String → Text
let greeting = "Hello, Maharaj!";
console.log("String example:", greeting);

// 2.1.2 Number → Integers and Floats
let age = 28;
let price = 499.99;
console.log("Number examples:", age, price);

// 2.1.3 Boolean → true / false
let isStudent = true;
let isAdult = false;
console.log("Boolean examples:", isStudent, isAdult);

// 2.1.4 Undefined → Variable declared but not assigned
let favoriteFood;
console.log("Undefined example:", favoriteFood);

// 2.1.5 Null → Intentionally empty
let emptyBox = null;
console.log("Null example:", emptyBox);

// 2.1.6 Symbol → Unique identifier
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log("Symbol example: id1 === id2 ?", id1 === id2); // false

// 2.1.7 BigInt → For very large integers
let bigNumber = 123456789012345678901234567890n;
console.log("BigInt example:", bigNumber);

// Edge cases:
console.log("Division by zero:", 10 / 0); // Infinity
console.log("Invalid number:", "abc" / 2); // NaN (Not a Number)



// 2.2 Non-Primitive Data Types (Reference Types)
// ================================
// - Stored by reference (not value)
// - Can be modified
// - Types: Object, Array, Function

// 2.2.1 Object → Key-value pairs
let person = { name: "Rohan", age: 28, city: "Patna" };
console.log("Object example:", person);

// Accessing values
console.log("Person name:", person.name);
console.log("Person city:", person["city"]);

// Updating values
person.age = 29;
console.log("Updated age:", person.age);

// 2.2.2 Array → List of items
let fruits = ["Apple", "Banana", "Mango"];
console.log("Array example:", fruits);

// Accessing elements
console.log("First fruit:", fruits[0]);

// Modifying array
fruits.push("Orange"); // Add at end
console.log("Array after push:", fruits);
fruits.pop(); // Remove last element
console.log("Array after pop:", fruits);

// 2.2.3 Function → A callable block of code
function greet(name) {
    return "Hello, " + name + "!";
}
console.log("Function example:", greet("Rohan"));



// 3. Type Checking
// ================================
console.log("\nType Checking:");
console.log("Type of 'Hello':", typeof "Hello"); // string
console.log("Type of 123:", typeof 123); // number
console.log("Type of true:", typeof true); // boolean
console.log("Type of undefined:", typeof undefined); // undefined
console.log("Type of null:", typeof null); // object (quirk)
console.log("Type of person object:", typeof person); // object
console.log("Type of array:", typeof fruits); // object
console.log("Check if array:", Array.isArray(fruits)); // true



// 4. Differences Between Primitive & Non-Primitive
// ================================
console.log("\nPrimitive vs Non-Primitive:");

// Primitive: stored by value
let x = 10;
let y = x;
y = 20;
console.log("Primitive - x:", x, "y:", y); // x unchanged

// Non-Primitive: stored by reference
let obj1 = { a: 10 };
let obj2 = obj1;
obj2.a = 20;
console.log("Non-Primitive - obj1:", obj1, "obj2:", obj2); // both changed



// 5. Type Conversion / Coercion
// ================================
let num = 10;
let str = "5";

console.log("String + Number:", num + str); // "105" → concatenation
console.log("Number + Number:", num + Number(str)); // 15 → addition

console.log("Boolean to Number:", Number(true)); // 1
console.log("Boolean to Number:", Number(false)); // 0

console.log("String to Boolean:", Boolean("")); // false
console.log("String to Boolean:", Boolean("Hello")); // true



// 6. Real-world Scenarios
// ================================
console.log("\nReal-world Examples:");

let playerName = "Rohan"; // string
let playerScore = 0;       // number
let isPlaying = true;      // boolean

console.log("Player:", playerName, "Score:", playerScore, "Playing?", isPlaying);

// Updating score
playerScore += 10;
console.log("Updated Score:", playerScore);

// Keeping track of items
let inventory = ["Sword", "Shield"];
inventory.push("Potion");
console.log("Player Inventory:", inventory);


// 7. Scope Behavior and Window Exposure
// ================================

// 7.1 var
// - Function-scoped (inside function) or global-scoped (outside function)
// - If declared globally, it attaches to the `window` object in browsers
var globalVar = "I am var global";
console.log("window.globalVar:", window.globalVar);

function testVarScope() {
    var localVar = "I am var local";
    console.log("Inside function localVar:", localVar);
    // localVar is not accessible outside function
}
testVarScope();


// 7.2 let
// - Block-scoped (inside { ... })
// - NOT attached to `window` even if declared globally
let globalLet = "I am let global";
console.log("window.globalLet:", window.globalLet);

{
    let blockLet = "I am let block";
    console.log("Inside block:", blockLet);
}
// console.log(blockLet); //Error

// 7.3 const
// - Block-scoped, immutable (cannot reassign), must initialize
// - NOT attached to `window` even if declared globally
const globalConst = "I am const global";
console.log("window.globalConst:", window.globalConst);

{
    const blockConst = "I am const block";
    console.log("Inside block:", blockConst);
}
// console.log(blockConst); //Error

// 7.4 var vs let/const summary

// Summary of var, let, const:
// - var: function-scoped, attaches to window if global
// - let: block-scoped, NOT attached to window
// - const: block-scoped, NOT attached to window



// 8. Summary Table
// ================================

// Primitive Types:
// - String: text ("Hello")
// - Number: numeric (123, 12.5)
// - Boolean: true / false
// - Undefined: variable declared but not assigned
// - Null: intentionally empty
// - Symbol: unique identifier
// - BigInt: very large integers

// Non-Primitive Types (Reference):
// - Object: key-value storage
// - Array: list of values
// - Function: callable block of code
