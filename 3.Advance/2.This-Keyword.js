// ==========================================================
// "this" KEYWORD — Binding Rules, call, apply, bind, Arrow Functions
// ==========================================================

// 1. The 5 Binding Rules
// ======================
// 1. Default: global (window/browser, undefined in strict)
// 2. Implicit: object.method() → the object
// 3. Explicit: call, apply, bind
// 4. new binding: newly created instance
// 5. Arrow: lexical (surrounding scope)


// 2. Default Binding
// ======================
function showThis() {
  console.log(this)
}
showThis()
// Browser (non-strict): window
// Node (non-strict): global
// Strict mode: undefined

// "use strict" makes default binding undefined
// This prevents accidental global pollution


// 3. Implicit Binding
// ======================
let user = {
  name: "Rohan",
  greet() {
    console.log(`Hello, ${this.name}`)
  }
}
user.greet() // "Hello, Rohan" — this = user

// BUT — losing this:
let greetFn = user.greet
greetFn() // "Hello, undefined" (default binding, this = global/undefined)

// Why? greetFn is called WITHOUT object context


// 4. Explicit Binding — call, apply, bind
// ======================

function introduce(age, city) {
  console.log(`I'm ${this.name}, ${age}, from ${city}`)
}

let person1 = { name: "Rohan" }
let person2 = { name: "Amit" }

// call — args individually:
introduce.call(person1, 28, "Patna")

// apply — args as array:
introduce.apply(person2, [25, "Delhi"])

// bind — returns NEW function with this fixed:
let bound = introduce.bind(person1, 30, "Mumbai")
bound()

// Partial application with bind:
let greetRohan = introduce.bind(person1)
greetRohan(22, "Bangalore")


// 5. new Binding
// ======================
function Person(name) {
  // 1. New empty object created
  // 2. Prototype linked
  // 3. this = new object
  // 4. Return this (if no object returned)
  this.name = name
}

let p = new Person("Rohan")
console.log(p.name) // "Rohan"

// If constructor returns object, that object is used instead:
function BadPerson(name) {
  this.name = name
  return { name: "OVERRIDE" }
}
let bp = new BadPerson("Rohan")
console.log(bp.name) // "OVERRIDE"


// 6. Arrow Function — Lexical this
// ======================
// Arrow functions DON'T have their own this
// They capture this from the enclosing (lexical) scope

let obj = {
  name: "Rohan",
  regular: function () {
    console.log(this.name) // "Rohan" (obj)
  },
  arrow: () => {
    console.log(this.name) // undefined (outer this, likely window)
  }
}

obj.regular() // "Rohan"
obj.arrow()   // undefined — arrow doesn't bind obj

// Practical use — preserving this in callbacks:
function Timer() {
  this.seconds = 0

  // setInterval(function () {
  //   this.seconds++  // WRONG — this = global/undefined
  // }, 1000)

  setInterval(() => {
    this.seconds++  // CORRECT — this = Timer instance
  }, 1000)
}


// 7. this in Event Handlers
// ======================
let btn = { id: "myBtn" }

// Regular function → this = element:
btn.addEventListener?.("click", function () {
  console.log(this) // the button element
})

// Arrow → this = outer scope:
btn.addEventListener?.("click", () => {
  console.log(this) // window/undefined (lexical)
})


// 8. this in Nested Functions
// ======================
let nested = {
  name: "outer",
  method() {
    console.log("outer:", this.name) // "outer"

    function inner() {
      console.log("inner:", this.name) // undefined (default binding)
    }
    inner()

    // Fix — store this:
    let self = this
    function innerFixed() {
      console.log("innerFixed:", self.name) // "outer"
    }
    innerFixed()
  }
}
nested.method()


// 9. call vs apply vs bind Summary
// ======================
// call:     fn.call(thisArg, arg1, arg2, ...)    → runs immediately
// apply:    fn.apply(thisArg, [arg1, arg2, ...]) → runs immediately
// bind:     fn.bind(thisArg, arg1, ...)          → returns new fn

// Performance: call is slightly faster than apply
// (apply has to handle array arguments)

// apply useful with Math methods:
let nums = [3, 1, 4, 1, 5]
console.log(Math.max.apply(null, nums)) // ES5
console.log(Math.max(...nums))          // ES6 spread


// 10. this Priorities
// ======================
// 1. new binding (highest)
// 2. explicit (call/apply/bind)
// 3. implicit (object.method)
// 4. default (lowest)


// 11. Summary
// ======================
// Default: this = global (window) in sloppy, undefined in strict
// Implicit: method() → object before the dot
// Explicit: call, apply, bind — force this
// new: newly created instance
// Arrow: this = enclosing lexical scope (no own this)
// Event handlers: regular = element, arrow = outer scope
// Lost this: use bind, arrow, or store reference (self = this)
// Priority: new > explicit > implicit > default
