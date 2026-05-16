// ==========================================================
// EVENT LOOP — Call Stack, Task/Microtask Queue, requestAnimationFrame
// ==========================================================

// 1. JavaScript is Single-Threaded
// ======================
// ONE call stack, ONE thread of execution
// Non-blocking via event loop + async callbacks


// 2. Call Stack
// ======================
// LIFO structure tracking function calls

function third() { console.log("third") }
function second() { third(); console.log("second") }
function first() { second(); console.log("first") }

first()
// Stack: global → first → second → third
// Output: "third", "second", "first" (LIFO order unwinds)


// 3. Event Loop — The Mechanism
// ======================
// While (true) {
//   1. Execute all tasks in microtask queue
//   2. Execute one task from macrotask queue
//   3. Render UI (browser)
//   4. Repeat
// }


// 4. Microtasks vs Macrotasks
// ======================
// Microtasks (higher priority, between macrotasks):
// - Promise.then/catch/finally
// - queueMicrotask()
// - MutationObserver
// - process.nextTick (Node.js)

// Macrotasks (lower priority, queued after microtasks):
// - setTimeout, setInterval
// - I/O callbacks
// - UI rendering
// - requestAnimationFrame (before rendering)
// - Event listeners (click, scroll, etc.)

console.log("1: sync")

setTimeout(() => console.log("2: macrotask"), 0)

Promise.resolve().then(() => console.log("3: microtask 1"))
Promise.resolve().then(() => console.log("4: microtask 2"))

console.log("5: sync")

// Output:
// 1: sync
// 5: sync
// 3: microtask 1
// 4: microtask 2
// 2: macrotask


// 5. Deep Dive — Order of Execution
// ======================
console.log("A")

setTimeout(() => console.log("B"), 0)

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"))

console.log("E")

// A, E, C, D, B

// Explanation:
// 1. Sync: A, E
// 2. Microtasks: C, D (Promise callbacks run in same microtask batch)
// 3. Macrotask: B (setTimeout callback)

// Each microtask batch runs COMPLETELY before next macrotask


// 6. Microtask Queue Draining
// ======================
// Microtasks can add more microtasks — they all drain before
// moving on

Promise.resolve()
  .then(() => {
    console.log("first")
    return Promise.resolve()
  })
  .then(() => {
    console.log("second")
    return Promise.resolve()
  })
  .then(() => {
    console.log("third")
  })

setTimeout(() => console.log("macrotask"), 0)

// Output: first, second, third, macrotask
// All microtasks drain before macrotask


// 7. requestAnimationFrame (rAF)
// ======================
// Scheduled before browser repaint
// Runs between microtasks and macrotasks
// Perfect for animations

// function animate() {
//   element.style.transform = `translateX(${pos}px)`
//   pos += 1
//   requestAnimationFrame(animate)
// }
// requestAnimationFrame(animate)

// Order: sync → microtasks → rAF → render → macrotasks


// 8. setTimeout(fn, 0) — Defer to Next Macrotask
// ======================
// "Execute this after all currently queued microtasks"

// Use cases:
// - Break up long synchronous work
// - Allow UI to update before expensive work
// - Defer execution to avoid stack overflow

function processInBatches(items) {
  let i = 0
  function nextBatch() {
    for (let j = 0; j < 50 && i < items.length; j++, i++) {
      // process items[i]
    }
    if (i < items.length) setTimeout(nextBatch, 0)
  }
  nextBatch()
}


// 9. queueMicrotask vs Promise.resolve().then()
// ======================
// Both queue microtasks, identical behavior:

queueMicrotask(() => console.log("microtask"))
Promise.resolve().then(() => console.log("also microtask"))


// 10. Blocking the Event Loop
// ======================
// Long synchronous operations freeze everything:

// ❌ Blocks both rendering AND event handling:
// while (true) {} // freezes forever

// ❌ Long loop blocks UI:
// let arr = new Array(1000000)
// for (let i = 0; i < arr.length; i++) {
//   arr[i] = heavyComputation(i)
// }

// ✓ Use chunking or Web Workers:
// function processChunk(start, end) {
//   for (let i = start; i < end; i++) {
//     arr[i] = heavyComputation(i)
//   }
//   if (end < arr.length) {
//     setTimeout(() => processChunk(end, end + 1000), 0)
//   }
// }
// processChunk(0, 1000)


// 11. Visualizing the Event Loop
// ======================
// ┌──────────────┐
// │  Call Stack  │ ← JS engine executes here
// └──────┬───────┘
//        │
// ┌──────▼───────┐
// │  Microtasks  │ ← Promise callbacks, queueMicrotask
// └──────┬───────┘
//        │
// ┌──────▼───────┐
// │  Render      │ ← requestAnimationFrame, paint
// └──────┬───────┘
//        │
// ┌──────▼───────┐
// │  Macrotasks  │ ← setTimeout, I/O, UI events
// └──────────────┘


// 12. Summary
// ======================
// Single thread + event loop = async concurrency
// Call Stack: LIFO, executes synchronous code
// Microtasks: Promise.then, queueMicrotask (runs after sync, before render)
// Macrotasks: setTimeout, setInterval, events (runs after microtasks + render)
// rAF: runs before browser render (for animations)
// Blocking: long sync work freezes everything
// Chunking: break big work with setTimeout(fn, 0) to allow renders
// Order: sync → microtasks → rAF → render → macrotasks
