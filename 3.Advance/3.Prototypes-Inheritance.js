// ==========================================================
// PROTOTYPES & INHERITANCE — Prototypal Chain, Object.create, __proto__
// ==========================================================

// 1. What is a Prototype?
// ======================
// Every JS object has an internal [[Prototype]] (accessible via __proto__)
// When a property isn't found on the object, JS looks up the prototype chain

let animal = {
  eats: true,
  walk() { console.log("walking...") }
}

let rabbit = {
  jumps: true,
  __proto__: animal  // inherit from animal
}

console.log(rabbit.eats)  // true (from animal)
console.log(rabbit.jumps) // true (own property)


// 2. Prototype Chain
// ======================
// rabbit → animal → Object.prototype → null

console.log(rabbit.__proto__)                  // animal
console.log(rabbit.__proto__.__proto__)         // Object.prototype
console.log(rabbit.__proto__.__proto__.__proto__) // null

// Object.prototype is at the top of most prototype chains
// Its __proto__ is null


// 3. The prototype of Functions (Constructor Functions)
// ======================
// Functions have a .prototype property (NOT __proto__)
// This .prototype is assigned as [[Prototype]] of new instances

function Dog(name) {
  this.name = name
}

Dog.prototype.bark = function () {
  console.log(`${this.name} says woof!`)
}

let rex = new Dog("Rex")
rex.bark() // "Rex says woof!"

console.log(rex.__proto__ === Dog.prototype)         // true
console.log(Dog.prototype.__proto__ === Object.prototype) // true


// 4. Object.create — Explicit Prototype Assignment
// ======================
let base = { type: "base" }
let derived = Object.create(base)

derived.name = "derived"
console.log(derived.type)  // "base" (from prototype)

// Object.create(null) — no prototype:
let pure = Object.create(null)
console.log(pure.toString) // undefined (no Object.prototype)


// 5. Property Shadowing
// ======================
let parent = { value: "parent" }
let child = Object.create(parent)

console.log(child.value)  // "parent" (inherited)

child.value = "child"     // shadow — creates OWN property
console.log(child.value)  // "child"
console.log(parent.value) // "parent" (unchanged)

// Only own properties are shadowed — prototype unchanged


// 6. hasOwnProperty vs in
// ======================
let obj = { own: "yes" }
let proto = Object.create(obj)
proto.foo = "bar"

console.log("foo" in proto)          // true (own)
console.log("own" in proto)          // true (inherited)
console.log(proto.hasOwnProperty("own")) // false
console.log(proto.hasOwnProperty("foo")) // true

// Object.hasOwn() — ES2022:
console.log(Object.hasOwn(proto, "own")) // false


// 7. Getting/Setting Prototype
// ======================
let a = {}
let b = {}

// Modern way:
console.log(Object.getPrototypeOf(a))        // Object.prototype
Object.setPrototypeOf(b, a)                  // set prototype

// Legacy (avoid):
// b.__proto__ = a

// setPrototypeOf is slow — prefer Object.create for new objects


// 8. Methods in Prototype — "this" Binding
// ======================
// When a prototype method is called, "this" is the object BEFORE the dot
// (NOT the prototype)

let protoObj = {
  show() {
    console.log(this.name)
  }
}

let objA = { name: "A", __proto__: protoObj }
let objB = { name: "B", __proto__: protoObj }

objA.show() // "A"  (this = objA)
objB.show() // "B"  (this = objB)


// 9. for...in and Prototype
// ======================
let proto2 = { inherited: true }
let child2 = Object.create(proto2)
child2.own = "value"

for (let key in child2) {
  console.log(key) // "own", "inherited" (includes inherited)
}

// Use hasOwnProperty to filter:
for (let key in child2) {
  if (child2.hasOwnProperty(key)) {
    console.log("Own:", key) // only "own"
  }
}


// 10. Prototype vs __proto__ vs [[Prototype]]
// ======================
// [[Prototype]]: internal, not directly accessible
// __proto__: getter/setter for [[Prototype]] (legacy, widely supported)
// Object.getPrototypeOf(obj): standard way to read
// .prototype: property on constructor functions/classes

// Key distinction:
// - __proto__ is the actual prototype of an instance
// - .prototype is what gets assigned to new instances via new


// 11. Summary
// ======================
// Prototype: fallback object for property lookup
// Chain: obj → prototype → Object.prototype → null
// Shadowing: own property overrides prototype property
// Object.create(proto): create object with specific prototype
// getPrototypeOf / setPrototypeOf: modern API
// hasOwnProperty: check if property is own (not inherited)
// .prototype: on functions (used by new)
// __proto__: on instances (the actual prototype)
