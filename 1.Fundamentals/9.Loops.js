// ==========================================================
// LOOPS — All Loop Types, Labeled, Performance, Async
// ==========================================================

// 1. for Loop
// ======================
// for (init; condition; update)

for (let i = 0; i < 5; i++) {
  console.log(i)  // 0, 1, 2, 3, 4
}

// Without body:
let j = 0
for (; j < 5; ) {
  j++
}

// Infinite loop: for (;;) {}


// 2. while Loop
// ======================
let a = 0
while (a < 3) {
  console.log(a) // 0, 1, 2
  a++
}


// 3. do...while Loop
// ======================
// Always runs at least once
let b = 0
do {
  console.log(b) // 0, 1, 2
  b++
} while (b < 3)

do {
  console.log("runs once even if false")
} while (false)


// 4. for...of — Values
// ======================
// Works with any iterable (arrays, strings, maps, sets, generators)

let arr = [10, 20, 30]
for (let val of arr) {
  console.log(val) // 10, 20, 30
}

for (let char of "hello") {
  console.log(char) // h, e, l, l, o
}

// for...of with index (using entries):
for (let [index, value] of arr.entries()) {
  console.log(index, value)
}

// Iterating a Map:
let map = new Map([["a", 1], ["b", 2]])
for (let [key, val] of map) {
  console.log(key, val)
}


// 5. for...in — Keys/Indices
// ======================
// Iterates enumerable string keys (including inherited)

let obj = { name: "Rohan", age: 28 }
for (let key in obj) {
  console.log(key, obj[key]) // name Rohan, age 28
}

// With arrays — for...in gives indices (as strings):
let arr2 = [10, 20, 30]
for (let idx in arr2) {
  console.log(idx, arr2[idx]) // "0" 10, "1" 20, "2" 30
}
// Always use for...of for arrays, not for...in


// 6. break and continue
// ======================

// break — exits loop entirely
for (let i = 0; i < 10; i++) {
  if (i === 5) break
  console.log(i) // 0, 1, 2, 3, 4
}

// continue — skips to next iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue
  console.log(i) // 0, 1, 3, 4
}

// continue in while — careful with increment location:
let i = 0
while (i < 5) {
  i++
  if (i === 3) continue
  console.log(i) // 1, 2, 4, 5
}


// 7. Labeled Loops
// ======================
// Use labels to break/continue outer loops

outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer
    console.log(`i=${i}, j=${j}`)
  }
}
// Output: (0,0) (0,1) (0,2) (1,0) — exits outer at (1,1)

outer2: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer2
    console.log(`i=${i}, j=${j}`)
  }
}
// Output: (0,0) (1,0) (2,0)


// 8. Array Iteration Methods (Alternatives to Loops)
// ======================

let items = [1, 2, 3, 4, 5]

items.forEach((val, idx) => console.log(idx, val))

items.some(val => val > 3)    // true (one matches)
items.every(val => val > 0)   // true (all match)

items.find(val => val > 3)    // 4 (first match)
items.findIndex(val => val > 3) // 3

items.reduce((sum, val) => sum + val, 0)  // 15

// for...of vs forEach:
// - for...of: can break/continue, works with async/await
// - forEach: cannot break (must use some/every to short-circuit)


// 9. Performance Considerations
// ======================

// Cache array length:
let bigArr = [1, 2, 3]
for (let i = 0, len = bigArr.length; i < len; i++) {
  // len is cached, not looked up each iteration
}

// Avoid adding/removing elements during iteration:
let nums = [1, 2, 3, 4, 5]
for (let i = 0; i < nums.length; i++) {
  if (nums[i] === 3) nums.splice(i, 1)  // skips next element!
}
console.log(nums) // [1, 2, 4, 5] — 4 was skipped!

// Use while with manual index or filter instead


// 10. for-await-of (Async Iteration)
// ======================
// See Advance/Async-Await.js for details

async function processItems(iterable) {
  for await (let item of iterable) {
    console.log(item)
  }
}


// 11. Summary
// ======================
// - for: when you need index and full control
// - while: when iteration count is unknown
// - do...while: always runs at least once
// - for...of: iterate values of iterables (Array, Map, Set, String)
// - for...in: iterate object keys (avoid for arrays!)
// - break: exit loop, continue: skip iteration
// - Labeled loops: break/continue outer from inner
// - Cache .length for performance in large loops
// - Don't mutate arrays during iteration
