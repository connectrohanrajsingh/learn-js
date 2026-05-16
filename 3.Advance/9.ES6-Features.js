// ==========================================================
// ES6+ FEATURES — Comprehensive Modern Syntax Reference
// ==========================================================

// 1. let and const (ES6)
// ======================
// See 1.Fundamentals/2.Variables.js for full coverage

let mutable = "can reassign"
const immutable = "cannot reassign"


// 2. Arrow Functions (ES6)
// ======================
// See 1.Fundamentals/10.Functions.js for full coverage

let add = (a, b) => a + b
let square = x => x * x
let noArgs = () => 42


// 3. Template Literals (ES6)
// ======================
// See 1.Fundamentals/6.Strings.js for full coverage

let name = "Rohan"
console.log(`Hello, ${name}!`)

// Tagged templates:
function upper(strings, ...values) {
  return strings.reduce((acc, str, i) =>
    acc + str + (values[i] ? String(values[i]).toUpperCase() : ""), "")
}
console.log(upper`Hi ${"rohan"}!`) // "Hi ROHAN!"


// 4. Destructuring (ES6)
// ======================
// See 1.Fundamentals/15.Destructuring.js for full coverage

let [a, b] = [1, 2]
let { x, y } = { x: 10, y: 20 }


// 5. Spread and Rest Operators (ES6)
// ======================

// Spread — expands iterable:
let arr1 = [1, 2, 3]
let arr2 = [...arr1, 4, 5]  // [1, 2, 3, 4, 5]
let obj1 = { a: 1 }
let obj2 = { ...obj1, b: 2 } // { a: 1, b: 2 }

// Spread in function calls:
let nums = [3, 1, 4, 1, 5]
console.log(Math.max(...nums))

// Rest — collects into array:
function sum(...args) {
  return args.reduce((a, b) => a + b, 0)
}
let [first, ...rest] = [1, 2, 3, 4]


// 6. Default Parameters (ES6)
// ======================
function greet(name = "Guest", greeting = "Hello") {
  return `${greeting}, ${name}`
}
console.log(greet())             // "Hello, Guest"
console.log(greet("Rohan"))      // "Hello, Rohan"
console.log(greet(undefined, "Hi")) // "Hi, Guest"


// 7. Enhanced Object Literals (ES6)
// ======================
let city = "Patna"
let age = 28

let user = {
  // Property shorthand:
  name,       // name: name
  city,       // city: city

  // Method shorthand:
  greet() { return `Hi, I'm ${this.name}` },

  // Computed property name:
  [`age_${age}`]: true,

  // Dynamic key:
  [Symbol("id")]: 123
}
console.log(user.name)      // variable value
console.log(user.greet())   // "Hi, I'm ..."


// 8. Classes (ES6)
// ======================
// See 3.Advance/4.OOP-Classes.js for full coverage

class Animal {
  constructor(name) { this.name = name }
  speak() { console.log(this.name) }
}


// 9. Promises (ES6)
// ======================
// See 3.Advance/5.Promises.js for full coverage
// See 3.Advance/6.Async-Await.js for async/await (ES8/ES2017)


// 10. Symbols (ES6)
// ======================
// See 1.Fundamentals/14.Symbols-Iterators.js for full coverage

let sym = Symbol("unique")
let sym2 = Symbol.for("shared")


// 11. Iterators and for...of (ES6)
// ======================
// See 1.Fundamentals/14.Symbols-Iterators.js

for (let val of [1, 2, 3]) console.log(val)


// 12. Map, Set, WeakMap, WeakSet (ES6)
// ======================
// See 1.Fundamentals/13.Maps-Sets.js for full coverage

let map = new Map()
let set = new Set([1, 2, 2, 3])  // [1, 2, 3]


// 13. Modules (ES6)
// ======================
// See 1.Fundamentals/17.Modules.js for full coverage

// export / import / dynamic import()


// 14. String Methods (ES6+)
// ======================
"hello".startsWith("he")      // true
"hello".endsWith("lo")        // true
"hello".includes("ell")       // true
"hello".repeat(3)             // "hellohellohello"


// 15. Array Methods (ES6+)
// ======================
[1, 2, 3].find(x => x > 1)      // 2
[1, 2, 3].findIndex(x => x > 1) // 1
[1, 2, 3].includes(2)            // true
[1, [2]].flat()                  // [1, 2]
[1, 2].flatMap(x => [x, x * 2]) // [1, 2, 2, 4]

// Array static:
Array.from("hello")             // ["h","e","l","l","o"]
Array.of(1, 2, 3)               // [1, 2, 3]


// 16. Object Methods (ES6+)
// ======================
let obj = { a: 1, b: 2 }
Object.keys(obj)                // ["a", "b"]
Object.values(obj)              // [1, 2]
Object.entries(obj)             // [["a",1], ["b",2]]
Object.fromEntries([["a", 1]])  // { a: 1 }

// ES2019:
Object.fromEntries


// 17. Nullish Coalescing ?? (ES2020)
// ======================
let val = null ?? "default"     // "default"
let val2 = 0 ?? "default"       // 0


// 18. Optional Chaining ?. (ES2020)
// ======================
let user2 = {}
console.log(user2?.profile?.name) // undefined


// 19. Logical Assignment (ES2021)
// ======================
let x2 = 0
x2 ||= 10       // x2 = 10 (because 0 is falsy)

let y2 = 1
y2 &&= 10       // y2 = 10 (because 1 is truthy)

let z = null
z ??= "default" // z = "default"


// 20. Promise combinators (ES2020-2021)
// ======================
Promise.allSettled([])  // ES2020
Promise.any([])          // ES2021


// 21. Private Fields # (ES2022)
// ======================
class Foo { #x = 1 }


// 22. at() method (ES2022)
// ======================
[1, 2, 3].at(-1)       // 3
"hello".at(-1)          // "o"


// 23. Array findLast / findLastIndex (ES2023)
// ======================
[1, 2, 3, 2].findLast(x => x === 2) // 2 (last occurrence)
[1, 2, 3, 2].findLastIndex(x => x === 2) // 3


// 24. toSorted / toReversed / toSpliced / with (ES2023)
// ======================
let orig = [3, 1, 2]
orig.toSorted()   // [1, 2, 3] (new)
orig.toReversed() // [2, 1, 3] (new)
orig.toSpliced(0, 1) // [1, 2] (new)
orig.with(0, 99)  // [99, 1, 2] (new)
console.log(orig) // [3, 1, 2] (unchanged)


// 25. Summary by Language Version
// ======================
// ES6/ES2015: let, const, arrow, template literals, destructuring,
//   spread/rest, default params, enhanced objects, classes,
//   promises, symbols, Map/Set, modules, for...of, iterators
// ES2016: ** operator, Array.includes
// ES2017: async/await, Object.values/entries, String.padStart/End
// ES2018: rest/spread for objects, Promise.finally, async iteration
// ES2019: Array.flat/flatMap, Object.fromEntries, String.trimStart/End
// ES2020: ??, ?., Promise.allSettled, globalThis, dynamic import
// ES2021: Promise.any, logical assignment, String.replaceAll
// ES2022: Array.at, String.at, private fields, top-level await, Object.hasOwn
// ES2023: toSorted, toReversed, toSpliced, with, findLast, findLastIndex
