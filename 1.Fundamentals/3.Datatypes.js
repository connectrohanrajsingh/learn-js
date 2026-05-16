// ==========================================================
// DATA TYPES — Primitive & Reference, Type Checking
// ==========================================================

// 1. Seven Primitive Types
// ======================
// - string
// - number
// - boolean
// - null
// - undefined
// - symbol
// - bigint

// Everything else is an Object (reference type)


// 2. Each Type in Detail
// ======================

// string — UTF-16 encoded, immutable
let str = "hello"

// number — IEEE-754 double precision (64-bit)
let num = 42

// boolean — true / false
let bool = true

// null — intentional absence, typeof returns "object" (historical bug)
let empty = null

// undefined — variable declared but not assigned
let notDefined

// symbol — unique, immutable, used as object keys
let sym = Symbol("id")

// bigint — arbitrary precision integers
let big = 9007199254740991n


// 3. typeof Operator Nuances
// ======================
console.log(typeof "hello")     // "string"
console.log(typeof 42)          // "number"
console.log(typeof true)        // "boolean"
console.log(typeof undefined)   // "undefined"
console.log(typeof null)        // "object"  ★ BUG
console.log(typeof Symbol())    // "symbol"
console.log(typeof 42n)         // "bigint"

console.log(typeof {})          // "object"
console.log(typeof [])          // "object"
console.log(typeof function(){}) // "function"

console.log(typeof NaN)         // "number" (NaN is numeric)


// 4. The typeof null Bug
// ======================
// typeof null === "object" is a JS bug from 1996
// The type tag for objects was 0, and null's pointer was 0
// Fix would break existing code — so it stays
console.log(null === null)      // true (null is the only null)
console.log(null == undefined)   // true (loose equality)


// 5. Primitive Wrappers
// ======================
// When you call a method on a primitive, JS wraps it temporarily

let name = "rohan"
console.log(name.toUpperCase())  // "ROHAN"

// Behind the scenes:
// 1. new String("rohan") — create wrapper object
// 2. Call toUpperCase()
// 3. Discard wrapper

// You can explicitly create wrappers (but don't):
let strObj = new String("hello")
console.log(typeof strObj)       // "object"
console.log(strObj === "hello")  // false (object vs primitive)


// 6. Value vs Reference
// ======================
// Primitives: stored by VALUE
let x = 10
let y = x
y = 20
console.log(x) // 10 (independent copy)

// Objects: stored by REFERENCE
let objA = { val: 10 }
let objB = objA
objB.val = 20
console.log(objA.val) // 20 (both point to same object)


// 7. Undefined vs Null — When to Use
// ======================
// undefined — JS default for uninitialized variables, missing properties
// null — developer-intended "no value"

function greet(name) {
  // name is undefined if not passed
  if (name === undefined) {
    console.log("No name provided")
  }
}

let config = {
  theme: null,   // explicitly no theme
  // timeout is undefined (not set)
}


// 8. Symbol Use Cases
// ======================
const ID = Symbol("id")
const user = {
  name: "Rohan",
  [ID]: 12345  // Symbol key — hidden from enumeration
}
console.log(user[ID])           // 12345
console.log(Object.keys(user))  // ["name"] — Symbol hidden
console.log(Object.getOwnPropertySymbols(user)) // [ Symbol(id) ]


// 9. BigInt Operations
// ======================
const max = Number.MAX_SAFE_INTEGER // 9007199254740991
const big1 = 9007199254740992n
const big2 = 100n
console.log(big1 + big2)   // 9007199254741092n
// console.log(big1 + 1)   // TypeError: Cannot mix BigInt and other types
console.log(big1 + BigInt(1)) // OK


// 10. Checking Array vs Object
// ======================
console.log(Array.isArray([]))       // true
console.log(Array.isArray({}))       // false
console.log([] instanceof Array)     // true
console.log({}.constructor === Object) // true


// 11. Summary
// ======================
// - 7 primitives: string, number, boolean, null, undefined, symbol, bigint
// - typeof null === "object" is a bug
// - Primitives are immutable, stored by value
// - Objects are mutable, stored by reference
// - Primitive wrappers exist temporarily for method calls
// - Symbol creates unique, hidden keys
// - BigInt for numbers beyond MAX_SAFE_INTEGER
