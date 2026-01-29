// Hoisting: JS moves declarations to the top of their scope
// But initialization/assignment stays in place

// 1. VAR HOISTING
// ==================================================
console.log(a); // undefined (variable exists, but not yet initialized)
var a = 10;
console.log(a); // 10

// How it works internally:
// var a;
// console.log(a); // undefined
// a = 10;
// console.log(a); // 10

// Var is hoisted to function/global scope
// Can be accessed before declaration (value = undefined)
// Not recommended due to confusion



// 2. LET & CONST HOISTING + TDZ
// ==================================================

// TDZ = Temporal Dead Zone
// Variables declared with let/const exist in memory during their scope
// but CANNOT be accessed until they are actually declared

// Example with let:
try {
  console.log(b); // ReferenceError: Cannot access 'b' before initialization
} catch(e) {
  console.log(e.message);
}
let b = 20;
console.log(b); // 20 



// Example with const:
try {
  console.log(c); // ReferenceError: Cannot access 'c' before initialization
} catch(e) {
  console.log(e.message);
}
const c = 30;
console.log(c); // 30 

// TDZ starts at the beginning of the block and ends at the line of declaration
// Accessing inside TDZ causes ReferenceError




// 3. FUNCTION HOISTING
// ==================================================

// 3.1 Function Declarations are fully hoisted
console.log(sum(5,3));

function sum(x, y) {
  return x + y;
}

// 3.2 Function Expressions (var) hoisting
console.log(multiply); // undefined 
var multiply = function(x,y){
  return x*y;
};
console.log(multiply(2,3)); // 6 

// 3.3 Function Expressions (let/const) hoisting + TDZ
try {
  console.log(divide(6,2)); // ReferenceError: Cannot access 'divide' before initialization
} catch(e){
  console.log(e.message);
}

const divide = function(x,y){ return x/y; }
console.log(divide(6,2)); // 3 




// 4. HOISTING SUMMARY
// ==================================================

// VAR:
// - Hoisted to top of function/global
// - Initialized as undefined
// - Can be accessed before declaration (value = undefined)

// LET / CONST:
// - Hoisted to top of block
// - NOT initialized
// - Access before declaration → ReferenceError (TDZ)

// FUNCTION DECLARATIONS:
// - Fully hoisted (can be called before declaration)

// FUNCTION EXPRESSIONS:
// - var → hoisted, value undefined
// - let/const → hoisted, in TDZ (cannot access before declaration)
