// ==========================================================
// FUNCTIONS — Declarations, Expressions, Arrow, Generators, Memoization
// ==========================================================

// 1. Function Declaration (Hoisted)
// ======================
console.log(add(2, 3)) // 5 (hoisted)
function add(a, b) { return a + b }


// 2. Function Expression (Not Hoisted)
// ======================
const subtract = function (a, b) {
  return a - b
}
console.log(subtract(5, 2)) // 3

// Named function expression:
const multiply = function mult(a, b) {
  return a * b
}
// mult is only accessible inside the function


// 3. Arrow Functions
// ======================
// Concise, no own 'this', no arguments, can't be constructors

const add2 = (a, b) => a + b          // implicit return
const square = x => x * x              // single param, no parens
const noParams = () => console.log("hi")
const returnObj = () => ({ key: "value" }) // object needs parens

// Arrow function 'this' — captured from surrounding scope:
function Timer() {
  this.seconds = 0
  // setInterval(function() { this.seconds++ }  // wrong 'this'
  setInterval(() => { this.seconds++ }, 1000)    // correct
}


// 4. Parameters Deep Dive
// ======================

// Default parameters:
function greet(name = "Guest") {
  return `Hello, ${name}`
}
console.log(greet())          // "Hello, Guest"
console.log(greet(null))      // "Hello, null" (null is not undefined)
console.log(greet(undefined)) // "Hello, Guest" (undefined triggers default)

// Default with previous params:
function calc(a, b = a * 2) {
  return a + b
}
console.log(calc(3)) // 9 (3 + 6)

// Rest parameters:
function sumAll(...nums) {
  return nums.reduce((acc, n) => acc + n, 0)
}
console.log(sumAll(1, 2, 3, 4)) // 10


// 5. arguments Object
// ======================
// Array-like, only available in regular functions

function showArgs() {
  console.log(arguments[0])        // first arg
  console.log(arguments.length)   // number of args
  console.log(Array.from(arguments)) // convert to real array
}
showArgs(1, 2, 3)

// Arrow functions don't have arguments:
const noArgs = () => { /* console.log(arguments) */ } // ReferenceError


// 6. Return Values
// ======================
// Every function returns something — undefined if no explicit return

function nothing() { /* no return */ }
console.log(nothing()) // undefined


// 7. IIFE — Immediately Invoked Function Expression
// ======================
(function () {
  console.log("runs immediately")
})()

// With parameters:
(function (msg) {
  console.log(msg)
})("hello")

// Arrow IIFE:
(() => console.log("arrow iife"))()

// Use case: creating private scope (pre-modules):
const counter = (function () {
  let count = 0
  return {
    inc: () => ++count,
    dec: () => --count,
    get: () => count
  }
})()
console.log(counter.inc()) // 1
console.log(counter.inc()) // 2
// count is not accessible directly


// 8. Recursion
// ======================
function factorial(n) {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}
console.log(factorial(5)) // 120

// Tail recursion (not optimized in most JS engines):
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc
  return factorialTail(n - 1, n * acc)
}


// 9. Memoization
// ======================
// Cache function results to avoid recomputation

function memoize(fn) {
  const cache = new Map()
  return function (...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

const fib = memoize(function (n) {
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
})
console.log(fib(40)) // 102334155 (fast with memoization)


// 10. First-Class and Higher-Order Functions
// ======================

// First-class: functions are values
const fn = function () { return 1 }
const arr = [fn, fn]

// Higher-order: takes or returns a function
function repeat(times, action) {
  for (let i = 0; i < times; i++) action(i)
}
repeat(3, console.log)

function multiplier(factor) {
  return x => x * factor
}
const double = multiplier(2)
console.log(double(5)) // 10


// 11. Generator Functions
// ======================
// Can pause (yield) and resume

function* countUp() {
  yield 1
  yield 2
  yield 3
}

const gen = countUp()
console.log(gen.next()) // { value: 1, done: false }
console.log(gen.next()) // { value: 2, done: false }
console.log(gen.next()) // { value: 3, done: false }
console.log(gen.next()) // { value: undefined, done: true }

// Generators are iterable:
for (let val of countUp()) console.log(val) // 1, 2, 3

// Infinite generator:
function* idGenerator() {
  let id = 1
  while (true) yield id++
}
const ids = idGenerator()
console.log(ids.next().value) // 1
console.log(ids.next().value) // 2


// 12. Function Properties
// ======================
function foo(a, b, c) {}
console.log(foo.name)   // "foo"
console.log(foo.length) // 3 (number of parameters declared)


// 13. Callback Functions
// ======================
function fetchData(callback) {
  // simulate async
  setTimeout(() => {
    callback("data received")
  }, 100)
}
fetchData(data => console.log(data))


// 14. Summary
// ======================
// - Declaration: hoisted, callable before definition
// - Expression: not hoisted, assigned to variable
// - Arrow: concise, no own this/arguments, not constructable
// - Default params: undefined triggers default, null does NOT
// - Rest (...) collects remaining args into array
// - IIFE: run function immediately, create private scope
// - Recursion: function calls itself (watch stack limit)
// - Memoization: cache results for performance
// - Generators: function* with yield, return {value, done}
// - Higher-order: functions operating on functions
