// ==========================================================
// SCOPE & CLOSURES — Lexical, Scope Chain, Closure Patterns
// ==========================================================

// 1. Types of Scope
// ======================
// Global — accessible everywhere
// Function — accessible inside function (var, function decl)
// Block — inside { } (let, const)

let global = "accessible everywhere"

function funcScope() {
  let funcVar = "only inside function"
  if (true) {
    let blockVar = "only inside block"
    var functionScoped = "leaks out of block"
    console.log(global)      // OK
    console.log(funcVar)     // OK
  }
  // console.log(blockVar)   // ReferenceError
  console.log(functionScoped) // OK (var is function-scoped)
}


// 2. Lexical Scoping
// ======================
// Scope is determined by WHERE code is written, not where it's called

function outer() {
  let x = "outer"

  function inner() {
    console.log(x) // "outer" (lexical — inner is defined inside outer)
  }

  inner()
}
outer()


// 3. Scope Chain
// ======================
// JS looks for variables: current scope → parent → ... → global

let a = "global"
function f1() {
  let a = "f1"
  function f2() {
    let a = "f2"
    function f3() {
      console.log(a) // "f2" (closest in scope chain)
    }
    f3()
  }
  f2()
}
f1()

// Variable shadowing:
// f3's a → f2's a → f1's a → global a
// Inner scope "shadows" outer scope


// 4. Closures — Definition
// ======================
// A closure is a function that "remembers" its outer variables
// even after the outer function has returned

function createCounter() {
  let count = 0  // closed-over variable

  return {
    increment() { return ++count },
    decrement() { return --count },
    get() { return count }
  }
}

let counter = createCounter()
console.log(counter.increment()) // 1
console.log(counter.increment()) // 2
console.log(counter.decrement()) // 1
// count is NOT accessible directly — private variable


// 5. Closure in Loops (Classic Interview Problem)
// ======================

// Problem with var:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// Output: 3, 3, 3 (all share same `i`)

// Fix 1 — let (block scope):
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// Output: 0, 1, 2

// Fix 2 — IIFE (pre-ES6):
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 100)
  })(i)
}
// Output: 0, 1, 2


// 6. Closure Use Cases
// ======================

// Data encapsulation / private variables:
function createBankAccount(initialBalance) {
  let balance = initialBalance

  return {
    deposit(amount) {
      balance += amount
      return balance
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds"
      balance -= amount
      return balance
    },
    getBalance() { return balance }
  }
}

let account = createBankAccount(1000)
console.log(account.deposit(500))   // 1500
console.log(account.withdraw(2000)) // "Insufficient funds"
// balance cannot be accessed from outside

// Factory functions:
function multiply(factor) {
  return (num) => num * factor
}
let double = multiply(2)
let triple = multiply(3)
console.log(double(5))  // 10
console.log(triple(5))  // 15

// Partial application / currying:
function add(x) {
  return (y) => x + y
}
let add5 = add(5)
console.log(add5(3))  // 8


// 7. Memory and Closures
// ======================
// Closures keep outer variables alive in memory
// Until the closure itself is garbage collected

function heavyClosure() {
  let bigData = new Array(1000000).fill("data")
  return () => console.log(bigData.length)
}

let fn = heavyClosure()
// bigData is NOT garbage collected — fn holds reference
fn() // 1000000

fn = null  // now bigData can be garbage collected


// 8. Lexical vs Dynamic Scope
// ======================
// JS uses LEXICAL scope (also called static scope)
// NOT dynamic scope

let name = "Global"

function showName() {
  console.log(name)
}

function run() {
  let name = "Local"
  showName()
}

run() // "Global" (not "Local")

// With dynamic scope, it would print "Local"
// JS always uses lexical scope based on where function was DEFINED


// 9. Summary
// ======================
// Scope: global, function, block
// Lexical: determined by WHERE defined, not where called
// Scope chain: inner → outer → global (shadowing)
// Closure: function + its lexical environment
// Closures enable: private variables, factories, currying
// var in loops: use let or IIFE to capture correctly
// Memory: closures keep references alive
// JS: lexical scope (NOT dynamic)
