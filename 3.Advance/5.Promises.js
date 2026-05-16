// ==========================================================
// PROMISES — States, Chaining, Static Methods, Error Handling
// ==========================================================

// 1. Promise States
// ======================
// pending   → initial state
// fulfilled → resolved successfully (resolved)
// rejected  → failed (rejected)
// Settled = fulfilled or rejected (not pending)

let promise = new Promise((resolve, reject) => {
  // async work
  setTimeout(() => {
    resolve("Done!")    // → fulfilled
    // reject(new Error("Failed"))  // → rejected
  }, 1000)
})


// 2. then, catch, finally
// ======================
promise
  .then(result => {
    console.log(result)  // "Done!"
    return "Next value"
  })
  .then(next => {
    console.log(next)    // "Next value"
  })
  .catch(error => {
    console.error(error) // handles any rejection in chain
  })
  .finally(() => {
    console.log("Always runs")  // cleanup
  })

// finally doesn't receive the value — passes it through
// finally can't change the resolved value


// 3. Chaining — Returning Values vs Promises
// ======================
// .then() returns a new Promise
// Return value → wrapped in resolved promise
// Return promise → flattened (no nested promises)

Promise.resolve(1)
  .then(x => {
    console.log(x)        // 1
    return x + 1
  })
  .then(x => {
    console.log(x)        // 2
    return Promise.resolve(x + 1)
  })
  .then(x => {
    console.log(x)        // 3
    throw new Error("Boom!")
  })
  .catch(err => {
    console.log(err.message) // "Boom!"
    return "Recovered"
  })
  .then(x => {
    console.log(x)        // "Recovered"
  })


// 4. Error Handling — Rejections
// ======================
// Errors propagate down the chain until caught

function risky() {
  return new Promise((_, reject) => {
    reject(new Error("Something went wrong"))
  })
}

risky()
  .then(r => console.log(r))         // skipped
  .catch(e => {
    console.log("Caught:", e.message)
    return "fallback"
  })
  .then(r => console.log(r))         // "fallback"

// Unhandled rejection — if no catch at end of chain
// Node: process.on("unhandledRejection")
// Browser: window.addEventListener("unhandledrejection")


// 5. Promise.resolve / Promise.reject
// ======================
let resolved = Promise.resolve(42)
let rejected = Promise.reject(new Error("fail"))

resolved.then(console.log)  // 42
rejected.catch(console.log) // Error: fail

// Useful for converting values to promises:
function fetchConfig() {
  if (cachedConfig) return Promise.resolve(cachedConfig)
  return fetch("/config.json").then(r => r.json())
}


// 6. Promise.all — Wait for ALL
// ======================
let p1 = Promise.resolve(1)
let p2 = new Promise(r => setTimeout(() => r(2), 100))
let p3 = Promise.resolve(3)

Promise.all([p1, p2, p3])
  .then(results => console.log(results)) // [1, 2, 3] (preserves order)
  .catch(err => console.error(err))      // first rejection → whole promise rejected

// Fail-fast: if ANY promise rejects, Promise.all rejects immediately


// 7. Promise.allSettled — Wait for ALL (regardless of outcome)
// ======================
let p4 = Promise.resolve("ok")
let p5 = Promise.reject(new Error("fail"))
let p6 = Promise.resolve("also ok")

Promise.allSettled([p4, p5, p6])
  .then(results => {
    results.forEach(r => {
      if (r.status === "fulfilled") console.log("✅", r.value)
      if (r.status === "rejected") console.log("❌", r.reason)
    })
  })


// 8. Promise.race — First to settle
// ======================
Promise.race([
  fetch("/api/data"),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), 5000)
  )
])
  .then(r => console.log("Response:", r))
  .catch(e => console.error("Failed:", e.message))

// Useful for timeouts — first settled wins


// 9. Promise.any — First to fulfill
// ======================
Promise.any([
  Promise.reject(new Error("fail1")),
  Promise.resolve("winning!"),
  Promise.reject(new Error("fail2"))
])
  .then(r => console.log(r))  // "winning!" (first fulfilled)
  .catch(e => console.log(e)) // AggregateError if ALL reject

// Ignores rejections until all reject


// 10. Promisification — Callback → Promise
// ======================
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}

// Node-style callback:
// const fs = require("fs")
// const readFile = promisify(fs.readFile)
// readFile("file.txt", "utf8").then(console.log)


// 11. Summary
// ======================
// States: pending → fulfilled / rejected
// then(onFulfilled, onRejected): handle result or error
// catch(onRejected): handle rejection
// finally(fn): cleanup (always runs)
// Chaining: each then returns a new Promise
// Promise.all: all fulfilled → results array; any reject → fail-fast
// Promise.allSettled: all settled → array of {status, value/reason}
// Promise.race: first settled wins
// Promise.any: first fulfilled wins; all reject → AggregateError
// Promisification: convert callback APIs to Promise
