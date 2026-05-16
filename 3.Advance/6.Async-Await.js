// ==========================================================
// ASYNC/AWAIT — Async Functions, Error Handling, Patterns
// ==========================================================

// 1. async Function
// ======================
// async keyword makes a function return a Promise
// Even if you return a value, it's wrapped in Promise.resolve()

async function greet() {
  return "Hello"
}

greet().then(console.log) // "Hello"

// Equivalent to:
// function greet() { return Promise.resolve("Hello") }


// 2. await — Wait for Promise
// ======================
// await pauses execution of the async function until promise settles
// Can ONLY be used inside async functions (or top-level in modules)

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchUser(id) {
  console.log("Fetching user...")
  await delay(1000)            // pauses 1 second
  return { id, name: "Rohan" }
}

async function main() {
  let user = await fetchUser(1)
  console.log(user.name) // "Rohan"
}
main()


// 3. Error Handling — try/catch
// ======================
async function getData(url) {
  try {
    let response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Failed:", error.message)
    return null
  }
}

// Without try/catch — rejection becomes unhandled:
async function bad() {
  let data = await Promise.reject("oops") // throws here
}
// bad().catch(console.error) // must catch at call site


// 4. Sequential vs Parallel Execution
// ======================

// SEQUENTIAL — each waits for previous:
async function sequential() {
  let user = await fetchUser(1)
  let posts = await fetchPosts(user.id)   // waits for user
  return { user, posts }
}

// PARALLEL — use Promise.all:
async function parallel() {
  let [user, posts] = await Promise.all([
    fetchUser(1),
    fetchPosts(1)
  ])
  return { user, posts }
}

// Parallel is faster — requests run concurrently


// 5. Async/Await with Promise.all
// ======================
async function loadDashboard(userId) {
  try {
    let [profile, posts, notifications] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/users/${userId}/posts`).then(r => r.json()),
      fetch(`/api/users/${userId}/notifications`).then(r => r.json())
    ])

    return { profile, posts, notifications }
  } catch (err) {
    console.error("Dashboard load failed:", err)
    throw err  // re-throw
  }
}


// 6. Async Iteration — for-await-of
// ======================
// For async generators and async iterables:

async function* asyncGenerator() {
  yield await Promise.resolve(1)
  yield await Promise.resolve(2)
  yield await Promise.resolve(3)
}

async function consumeAsync() {
  for await (let value of asyncGenerator()) {
    console.log(value) // 1, 2, 3
  }
}


// 7. Top-Level await (ES2022)
// ======================
// Only works in modules (<script type="module"> or .mjs):

// let config = await fetch("/config.json").then(r => r.json())
// export default config


// 8. Async Error Handling Patterns
// ======================

// Pattern 1 — wrap in helper:
async function safeAsync(promise) {
  try {
    let data = await promise
    return [data, null]
  } catch (err) {
    return [null, err]
  }
}

async function example() {
  let [data, err] = await safeAsync(fetchUser(1))
  if (err) return console.error("Failed:", err)
  console.log(data)
}

// Pattern 2 — IIFE for top-level async:
(async () => {
  try {
    let data = await fetchUser(1)
    console.log(data)
  } catch (err) {
    console.error(err)
  }
})()


// 9. Sequential vs Parallel Timing
// ======================
function wait(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function sequentialTwo() {
  console.time("sequential")
  await wait(1000)
  await wait(1000)
  console.timeEnd("sequential") // ~2000ms
}

async function parallelTwo() {
  console.time("parallel")
  await Promise.all([wait(1000), wait(1000)])
  console.timeEnd("parallel") // ~1000ms
}


// 10. Beware: Storing Promises Before awaiting
// ======================
async function earlyBird() {
  let p1 = wait(1000)  // starts immediately
  let p2 = wait(1000)  // starts immediately too
  await p1             // about 1 sec
  await p2             // resolves almost immediately (already running)
}


// 11. Summary
// ======================
// async: function returns a Promise
// await: pause until promise settles (only in async function)
// try/catch: handle rejections (avoid unhandled rejections)
// Sequential: multiple awaits in order
// Parallel: Promise.all for concurrency
// for-await-of: consume async iterables
// Top-level await: in modules only
// Error handling: try/catch in function, or .catch at call site
// Stored promises: start promises early, await later
