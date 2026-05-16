// ==========================================================
// VARIABLES — var, let, const, TDZ, Naming
// ==========================================================

// 1. Declaration Keywords
// ======================

// var — function scoped, hoisted with undefined, no TDZ
var a = 1

// let — block scoped, hoisted but not initialized (TDZ)
let b = 2

// const — block scoped, must be assigned at declaration, cannot reassign
const c = 3
// c = 4  // TypeError: Assignment to constant variable

// 2. Hoisting Deep Dive
// ======================

console.log(hoistedVar) // undefined (not error)
var hoistedVar = "var is hoisted with undefined"

// How JS sees the above:
// var hoistedVar
// console.log(hoistedVar) // undefined
// hoistedVar = "var is hoisted with undefined"

// TDZ — Temporal Dead Zone
{
  // console.log(x) // ReferenceError: Cannot access 'x' before init
  let x = 10
}

// TDZ is the region from block start to declaration line
{
  // TDZ starts here for y
  const fn = () => console.log(y)
  // TDZ still active for y
  let y = 20
  fn() // 20 — accessing after declaration is fine
}


// 3. var vs let vs const — Complete Comparison
// ======================

// Scoping:
if (true) {
  var v = "var leaks"
  let l = "let stays"
}
console.log(v) // "var leaks"
// console.log(l) // ReferenceError

// Re-declaration:
var v2 = 1
var v2 = 2 // OK — var can be re-declared
let l2 = 1
// let l2 = 2 // SyntaxError: Identifier already declared

// Window object attachment (browser):
var globalVar = "attached"
// console.log(window.globalVar) // "attached"  (browser global scope)

let globalLet = "not attached"
// console.log(window.globalLet) // undefined


// 4. Const Gotchas
// ======================
const obj = { name: "Rohan" }
obj.name = "Amit" // OK — const prevents reassignment, not mutation
// obj = {}       // TypeError

const arr = [1, 2, 3]
arr.push(4) // OK
// arr = []   // TypeError


// 5. Naming Conventions
// ======================
let camelCase = "standard for variables and functions"
const UPPER_SNAKE = "constants (true constants, magic values)"
let _private = "starting _ often means 'internal/private'"
let $dollar = "used in jQuery, valid but uncommon"
let PascalCase = "used for classes and constructors"


// 6. Global Variables — Avoid
// ======================
// Implicit globals (without declaration):
function bad() {
  leak = "I just became global"
}
bad()
console.log(leak) // accessible — this is dangerous

// Always declare with let, const, or var


// 7. Variable Lifecycle
// ======================
// 1. Declaration — name registered in scope
// 2. Initialization — memory allocated, value assigned
// 3. Assignment — value may change (for let/var)

// var:     declaration + initialization (to undefined) hoisted together
// let:     declaration hoisted, but NOT initialized (TDZ)
// const:   same as let, but MUST be assigned in declaration


// 8. Block Scoping in Practice
// ======================
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 0)
}
// Output: 3, 3, 3 (all share same var i)

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 0)
}
// Output: 0, 1, 2 (each iteration gets own let j)


// 9. Summary
// ======================
// - var: function scope, hoisted with undefined, re-declarable, attaches to window
// - let: block scope, TDZ, no re-declaration, doesn't attach to window
// - const: like let + cannot reassign, but objects/arrays can mutate
// - Always prefer const, use let when reassigning, never use var
// - TDZ: accessing before declaration throws ReferenceError
