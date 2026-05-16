// ==========================================================
// OBJECTS — Properties, Descriptors, Getters/Setters, Prototype
// ==========================================================

// 1. Creating Objects
// ======================
let obj1 = {}                             // literal
let obj2 = new Object()                   // constructor
let obj3 = Object.create(null)            // no prototype
let obj4 = Object.create(Object.prototype) // standard prototype

let person = {
  name: "Rohan",
  age: 28,
  greet() { return `Hi, I'm ${this.name}` } // method shorthand
}


// 2. Property Access
// ======================
console.log(person.name)         // dot notation
console.log(person["name"])      // bracket (dynamic keys)

let key = "age"
console.log(person[key])         // dynamic access

// Computed property keys:
let dynamicKey = "score"
let player = {
  [dynamicKey]: 100,
  ["player" + "Id"]: 42
}
console.log(player.score) // 100


// 3. Property Descriptors
// ======================
// Each property has attributes beyond its value

let item = { price: 100 }
let desc = Object.getOwnPropertyDescriptor(item, "price")
console.log(desc)
// { value: 100, writable: true, enumerable: true, configurable: true }

// defineProperty — fine-grained control:
Object.defineProperty(item, "id", {
  value: 1,
  writable: false,     // can't reassign
  enumerable: false,   // hidden in loops/deep cloning
  configurable: false  // can't delete or redefine
})

console.log(item.id)       // 1
item.id = 2                 // no effect (writable: false)
console.log(item.id)       // still 1
console.log(Object.keys(item)) // ["price"] — id is not enumerable

// defineProperties — multiple at once:
Object.defineProperties(item, {
  x: { value: 10, writable: true },
  y: { value: 20, writable: true }
})


// 4. Getters and Setters
// ======================
let user = {
  firstName: "Rohan",
  lastName: "Singh",

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  },

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ")
  }
}

console.log(user.fullName)  // "Rohan Singh" (getter)
user.fullName = "Amit Kumar"
console.log(user.firstName) // "Amit"

// Object.defineProperty getter/setter:
let data = {}
Object.defineProperty(data, "timestamp", {
  get() { return Date.now() },
  enumerable: true
})
console.log(data.timestamp) // current timestamp


// 5. Property Enumeration Control
// ======================
let obj = { a: 1, b: 2 }
Object.defineProperty(obj, "hidden", {
  value: 3,
  enumerable: false
})

console.log(Object.keys(obj))             // ["a", "b"]
console.log(Object.getOwnPropertyNames(obj)) // ["a", "b", "hidden"]
console.log("hidden" in obj)             // true


// 6. Object Comparison
// ======================
let o1 = { x: 1 }
let o2 = { x: 1 }
console.log(o1 === o2)     // false (different references)
console.log(o1 === o1)     // true (same reference)

// JSON comparison:
console.log(JSON.stringify(o1) === JSON.stringify(o2)) // true (shallow)

// Deep equality — recursive check:
function deepEqual(a, b) {
  if (a === b) return true
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false
  let keysA = Object.keys(a), keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  return keysA.every(key => keysB.includes(key) && deepEqual(a[key], b[key]))
}


// 7. Spread and Rest in Objects
// ======================
let base = { x: 1, y: 2 }
let clone = { ...base }
let merged = { ...base, z: 3 }       // { x:1, y:2, z:3 }
let override = { ...base, x: 99 }    // x becomes 99

// Rest in destructuring:
let { x, ...rest } = merged
console.log(x)      // 1
console.log(rest)   // { y: 2, z: 3 }


// 8. Object.assign — Merge/Copy
// ======================
let src1 = { a: 1 }, src2 = { b: 2 }
let target = Object.assign({}, src1, src2)
console.log(target) // { a: 1, b: 2 }

// Note: shallow copy only (nested objects shared)


// 9. Freeze, Seal, PreventExtensions
// ======================
let freeze = { x: 1 }
Object.freeze(freeze)
freeze.x = 2      // no effect
delete freeze.x   // no effect
console.log(freeze.x) // 1
console.log(Object.isFrozen(freeze)) // true

let seal = { x: 1 }
Object.seal(seal)
seal.x = 2        // allowed (existing writable property)
delete seal.x     // not allowed
seal.y = 3        // not allowed (can't add new)
console.log(Object.isSealed(seal)) // true

let ext = { x: 1 }
Object.preventExtensions(ext)
ext.y = 2         // can't add new properties
console.log(Object.isExtensible(ext)) // false


// 10. Object.keys, values, entries
// ======================
let car = { brand: "Toyota", model: "Camry", year: 2020 }

console.log(Object.keys(car))     // ["brand", "model", "year"]
console.log(Object.values(car))   // ["Toyota", "Camry", 2020]
console.log(Object.entries(car))  // [["brand","Toyota"], ["model","Camry"], ["year",2020]]

// entries → Map:
let map = new Map(Object.entries(car))
console.log(map.get("brand")) // "Toyota"

// fromEntries — Map/Object back to object:
let fromMap = Object.fromEntries(map)
console.log(fromMap) // { brand: "Toyota", model: "Camry", year: 2020 }


// 11. hasOwnProperty and in
// ======================
let animal = { type: "cat" }
console.log("type" in animal)                // true
console.log("toString" in animal)            // true (inherited)
console.log(animal.hasOwnProperty("type"))    // true
console.log(animal.hasOwnProperty("toString")) // false

// Object.hasOwn() — ES2022:
console.log(Object.hasOwn(animal, "type"))   // true


// 12. Object.fromEntries
// ======================
// Reverse of Object.entries:
let entries = [["a", 1], ["b", 2]]
let fromEntries = Object.fromEntries(entries) // { a: 1, b: 2 }

// Transform object values:
let doubled = Object.fromEntries(
  Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 2])
)
console.log(doubled) // { a: 2, b: 4 }


// 13. Summary
// ======================
// - dot vs bracket notation (bracket for dynamic keys)
// - Property descriptors: writable, enumerable, configurable
// - Getters/setters: computed properties accessed as values
// - freeze (immutable), seal (no add/delete), preventExtensions (no add)
// - Object.keys/values/entries/fromEntries for transformation
// - Spread (...) for shallow clone/merge
// - hasOwnProperty vs in (inherited vs own)
// - Object.hasOwn() — modern replacement
