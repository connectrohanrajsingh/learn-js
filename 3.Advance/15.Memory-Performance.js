// ==========================================================
// MEMORY & PERFORMANCE — GC, Leaks, Optimization, Debugging
// ==========================================================

// 1. Memory Management — Stack vs Heap
// ======================
// Stack: primitives, function call frames (fast, limited)
// Heap: objects, closures, arrays (large, managed by GC)

// Primitives are stored on the stack:
let a = 10
let b = "hello"

// Objects are on the heap, reference is on the stack:
let obj = { data: new Array(10000) }
// obj (reference) → stack
// { data: [...] } → heap


// 2. Garbage Collection — Mark and Sweep
// ======================
// JS engine finds unreachable objects and frees their memory

// Reachable = can be accessed from the root (global, current call stack)

// Mark phase: traverse from roots, mark all reachable
// Sweep phase: free unmarked objects

// Generational GC:
// - Young generation: new objects (collected frequently)
// - Old generation: long-lived objects (collected less often)

let x = { data: "reachable" }
x = null  // object becomes unreachable → eligible for GC


// 3. Common Memory Leaks
// ======================

// Leak 1 — Accidental globals:
function leak() {
  leaked = "I'm global now"  // missing let/const
}
leak()
// Use "use strict" or always declare variables

// Leak 2 — Forgotten timers:
function startTimer() {
  let heavy = new Array(1000000)
  setInterval(() => {
    console.log(heavy.length)  // heavy kept alive
  }, 1000)
}
// FIX: clearInterval when no longer needed

// Leak 3 — Detached DOM references:
let elements = []
function addButton() {
  let btn = document.createElement("button")
  document.body.appendChild(btn)
  elements.push(btn)  // holds reference even if removed from DOM
}
// FIX: remove from array when element removed

// Leak 4 — Closures holding large data:
function createProcessor() {
  let hugeData = new Array(1000000).fill("x")
  return () => console.log("processing")
}
let proc = createProcessor()  // hugeData kept alive by closure
// FIX: nullify data when not needed, or structure differently

// Leak 5 — Event listeners not removed:
// element.addEventListener("click", handler)
// element.removeEventListener("click", handler)  // cleanup


// 4. Memory Debugging
// ======================
// Browser DevTools → Memory tab:
// - Heap snapshot: see all objects and their references
// - Allocation timeline: see objects allocated over time
// - Allocation sampling: see function-level allocation

// Check heap usage:
// console.log(process.memoryUsage())  // Node.js


// 5. Performance Optimization Patterns
// ======================

// Debouncing — limit rate of function calls:
function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
// window.addEventListener("resize", debounce(handler, 200))

// Throttling — ensure max frequency:
function throttle(fn, interval) {
  let lastTime = 0
  return function (...args) {
    let now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}
// window.addEventListener("scroll", throttle(handler, 100))

// Memoization — cache results:
// See 1.Fundamentals/10.Functions.js for details

// Batch DOM updates — use DocumentFragment:
// See 2.DOM/2.DOM-Manipulation.js for details


// 6. Avoid Common Performance Pitfalls
// ======================

// ❌ InnerHTML in loops:
// for (let i = 0; i < 1000; i++) {
//   list.innerHTML += `<li>${i}</li>`  // forces reflow each iteration
// }

// ✅ Use fragment or array:
// let fragment = document.createDocumentFragment()
// for (let i = 0; i < 1000; i++) {
//   let li = document.createElement("li")
//   li.textContent = i
//   fragment.appendChild(li)
// }
// list.appendChild(fragment)

// ❌ Layout thrashing — reading/writing layout in alternation:
// for (let el of elements) {
//   el.style.width = el.offsetWidth + 1 + "px"  // forces reflow each time
// }

// ✅ Batch reads then writes:
// let widths = elements.map(el => el.offsetWidth)
// elements.forEach((el, i) => { el.style.width = widths[i] + 1 + "px" })


// 7. WeakMap / WeakSet for Memory-Safe References
// ======================
// See 1.Fundamentals/13.Maps-Sets.js for details

// WeakMap allows garbage collection of keys:
let wm = new WeakMap()
let domElement = document.getElementById("temp")
wm.set(domElement, { meta: "data" })
// When domElement is removed from DOM and all references released,
// both the element and the metadata can be GC'd


// 8. requestAnimationFrame for Visual Updates
// ======================
// Syncs with browser's paint cycle (60fps)
// Pauses when tab is inactive (saves CPU/battery)

function animate() {
  // update positions
  requestAnimationFrame(animate)
}
// requestAnimationFrame(animate)

// vs setTimeout for animations — rAF is smoother


// 9. Web Workers — Multi-threading
// ======================
// Heavy computation off the main thread:
// let worker = new Worker("worker.js")
// worker.postMessage(largeArray)
// worker.onmessage = (e) => { /* result */ }

// See 3.Advance/13.Web-APIs.js for details


// 10. Performance Measurement
// ======================
// Use Performance API:

function measure(fn, label = "operation") {
  performance.mark(`${label}-start`)
  fn()
  performance.mark(`${label}-end`)
  performance.measure(label, `${label}-start`, `${label}-end`)
  let entries = performance.getEntriesByName(label)
  console.log(`${label}: ${entries[0].duration.toFixed(2)}ms`)
  performance.clearMarks()
  performance.clearMeasures()
}

// measure(() => {
//   let arr = new Array(1000000)
//   for (let i = 0; i < arr.length; i++) arr[i] = i
// }, "array-fill")


// 11. Summary
// ======================
// Stack: primitives, fast, limited (call frames)
// Heap: objects, GC-managed
// GC: Mark & Sweep, generational
// Leaks: globals, timers, detached DOM, closures, listeners
// Debounce: wait for pause before executing
// Throttle: limit execution frequency
// Memoization: cache computed results
// Layout thrashing: batch reads/writes separately
// WeakMap/WeakSet: safe references for GC
// rAF: smooth animations, pauses when inactive
// Workers: heavy computation off main thread
