// ==========================================================
// OOP & CLASSES — ES6 Classes, Static, Private, Inheritance, Mixins
// ==========================================================

// 1. Class Syntax — ES6
// ======================
class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(`${this.name} makes a sound`)
  }
}

let dog = new Animal("Rex")
dog.speak() // "Rex makes a sound"

// typeof class: "function" (class is syntactic sugar over constructor function)
console.log(typeof Animal) // "function"


// 2. Getters and Setters
// ======================
class User {
  constructor(first, last) {
    this.first = first
    this.last = last
  }

  get fullName() {
    return `${this.first} ${this.last}`
  }

  set fullName(value) {
    [this.first, this.last] = value.split(" ")
  }
}

let u = new User("Rohan", "Singh")
console.log(u.fullName) // "Rohan Singh"
u.fullName = "Amit Kumar"
console.log(u.first)    // "Amit"


// 3. Static Properties and Methods
// ======================
class MathUtil {
  static PI = 3.14159

  static max(a, b) {
    return a > b ? a : b
  }
}

console.log(MathUtil.PI)       // 3.14159
console.log(MathUtil.max(3, 7)) // 7

// Static members are on the CLASS, not instances
// let m = new MathUtil()
// console.log(m.PI)  // undefined


// 4. Private Fields (#)
// ======================
class BankAccount {
  #balance = 0  // private field — only accessible within class

  constructor(initial) {
    this.#balance = initial
  }

  deposit(amount) {
    this.#balance += amount
    return this.#balance
  }

  withdraw(amount) {
    if (amount > this.#balance) return null
    this.#balance -= amount
    return this.#balance
  }

  get balance() {
    return this.#balance
  }
}

let acct = new BankAccount(1000)
acct.deposit(500)
// console.log(acct.#balance)  // SyntaxError: private field!
console.log(acct.balance)        // 1500

// Private methods also supported:
class Foo {
  #privateMethod() {
    return "secret"
  }
  publicMethod() {
    return this.#privateMethod()
  }
}


// 5. Inheritance — extends
// ======================
class Mammal extends Animal {
  constructor(name, furColor) {
    super(name)  // must call super before using this
    this.furColor = furColor
  }

  speak() {
    console.log(`${this.name} makes a mammal sound`)
  }

  describe() {
    return `${this.name} has ${this.furColor} fur`
  }
}

let cat = new Mammal("Whiskers", "gray")
cat.speak()       // "Whiskers makes a mammal sound" (overridden)
console.log(cat.describe()) // "Whiskers has gray fur"


// 6. super — Access Parent
// ======================
class ExtendedArray extends Array {
  first() { return this[0] }
  last() { return this[this.length - 1] }
  average() {
    return this.reduce((a, b) => a + b, 0) / this.length
  }
}

let nums = new ExtendedArray(1, 2, 3, 4, 5)
console.log(nums.first())    // 1
console.log(nums.last())     // 5
console.log(nums.average())  // 3
console.log(nums.length)     // 5 (inherited from Array)


// 7. instanceof Check
// ======================
console.log(cat instanceof Mammal)   // true
console.log(cat instanceof Animal)   // true (parent)
console.log(cat instanceof Object)   // true
console.log(cat instanceof Array)    // false
console.log(nums instanceof Array)   // true


// 8. Class Expressions
// ======================
const Rectangle = class {
  constructor(w, h) {
    this.w = w
    this.h = h
  }
  get area() { return this.w * this.h }
}

// Named class expression:
const Circle = class CircleClass {
  constructor(r) { this.r = r }
  get area() { return Math.PI * this.r ** 2 }
  // CircleClass only accessible inside class
}


// 9. Mixins — Composing Behaviors
// ======================
// JS classes support single inheritance only
// Mixins combine behaviors from multiple sources

const CanFly = {
  fly() { console.log(`${this.name} is flying`) }
}

const CanSwim = {
  swim() { console.log(`${this.name} is swimming`) }
}

class Duck extends Animal {
  constructor(name) { super(name) }
}

// Mix in:
Object.assign(Duck.prototype, CanFly, CanSwim)

let duck = new Duck("Daffy")
duck.fly()   // "Daffy is flying"
duck.swim()  // "Daffy is swimming"


// 10. Summary
// ======================
// class: syntactic sugar over constructor + prototype
// constructor: initialize instance
// get/set: computed properties
// static: class-level members
// #private: true privacy (ES2022)
// extends: single inheritance
// super: call parent constructor/methods
// instanceof: check inheritance chain
// Mixins: Object.assign for multiple inheritance
// Class expressions: anonymous and named
