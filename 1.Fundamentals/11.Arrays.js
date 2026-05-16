// ==========================================================
// ARRAYS — All Methods, Immutable Operations, Sparse, Multi-dim
// ==========================================================

// 1. Creating Arrays
// ======================
let a1 = [1, 2, 3]
let a2 = new Array(3)        // sparse array of length 3 (empty slots)
let a3 = new Array(3).fill(0) // [0, 0, 0]
let a4 = Array.from("hello") // ["h", "e", "l", "l", "o"]
let a5 = Array.of(1, 2, 3)   // [1, 2, 3]


// 2. Sparse Arrays
// ======================
let sparse = [1, , , 4]
console.log(sparse.length)     // 4
console.log(sparse[1])         // undefined
console.log(sparse.hasOwnProperty(1)) // false (slot doesn't exist)
sparse.forEach(v => console.log(v))   // skips empty slots!


// 3. at() — Negative Indexing (ES2022)
// ======================
let arr = [10, 20, 30, 40]
console.log(arr.at(0))   // 10
console.log(arr.at(-1))  // 40 (last)
console.log(arr.at(-2))  // 30
// arr[-1] doesn't work — that's a property access


// 4. Adding/Removing — Mutating
// ======================
let items = [1, 2, 3]

items.push(4)         // end:    [1, 2, 3, 4]  → returns length
items.pop()           // end:    [1, 2, 3]      → returns removed
items.unshift(0)      // start:  [0, 1, 2, 3]  → returns length
items.shift()         // start:  [1, 2, 3]      → returns removed

// splice — insert, remove, replace at any position:
items.splice(1, 0, 99)    // at index 1, remove 0, add 99
// [1, 99, 2, 3]
items.splice(1, 1)        // at index 1, remove 1
// [1, 2, 3]
items.splice(1, 1, 42)    // at index 1, remove 1, add 42
// [1, 42, 3]


// 5. Searching
// ======================
let nums = [10, 20, 30, 20, 40]

nums.indexOf(20)           // 1 (first)
nums.lastIndexOf(20)       // 3 (last)
nums.includes(30)          // true

nums.find(n => n > 20)     // 30 (first element)
nums.findIndex(n => n > 20) // 2
nums.findLast(n => n > 20)  // 40 (ES2023, last element)
nums.findLastIndex(n => n > 20) // 4


// 6. Iterating
// ======================
nums.forEach((val, idx, arr) => console.log(idx, val))
// forEach: no break/continue (use some or for...of)


// 7. Transforming — Creates New Array
// ======================
console.log(nums.map(n => n * 2))         // [20, 40, 60, 40, 80]
console.log(nums.filter(n => n > 20))     // [30, 40]
console.log(nums.flatMap(n => [n, n * 2]))// [10,20,20,40,30,60,20,40,40,80]


// 8. Reducing to Single Value
// ======================
let sum = nums.reduce((acc, n) => acc + n, 0)     // 120
let max = nums.reduce((acc, n) => Math.max(acc, n), -Infinity)
let product = nums.reduce((acc, n) => acc * n, 1)

// No initial value — uses first element as accumulator:
let avg = nums.reduce((acc, n, i, arr) => {
  acc += n
  if (i === arr.length - 1) return acc / arr.length
  return acc
})
console.log(avg)


// 9. Testing
// ======================
console.log(nums.some(n => n > 30))  // true (at least one)
console.log(nums.every(n => n < 50)) // true (all)
console.log(nums.includes(20))       // true


// 10. Sorting and Reversing — Mutates!
// ======================
let vals = [3, 30, 1, 20]

// Default: converts to string first!
vals.sort()
console.log(vals) // [1, 20, 3, 30] — wrong numeric sort!

// Correct numeric sort:
vals.sort((a, b) => a - b)   // ascending  [1, 3, 20, 30]
vals.sort((a, b) => b - a)   // descending [30, 20, 3, 1]
console.log(vals)

vals.reverse()

// toSorted / toReversed (ES2023) — non-mutating:
let sorted = vals.toSorted((a, b) => a - b)
let reversed = vals.toReversed()
console.log(vals)     // original unchanged


// 11. Flat and FlatMap
// ======================
let nested = [1, [2, [3, 4]]]
console.log(nested.flat())       // [1, 2, [3, 4]] (depth 1)
console.log(nested.flat(2))      // [1, 2, 3, 4]

// flatMap = map + flat(1):
let phrases = ["hello world", "foo bar"]
console.log(phrases.flatMap(s => s.split(" "))) // ["hello", "world", "foo", "bar"]


// 12. Immutable Update Methods (ES2023)
// ======================
let orig = [1, 2, 3]

orig.with(1, 99)        // [1, 99, 3] (replace at index)
orig.toSpliced(1, 1)    // [1, 3] (remove)
orig.toSpliced(1, 0, 99)// [1, 99, 2, 3] (insert)
orig.toReversed()        // [3, 2, 1]
orig.toSorted()          // [1, 2, 3]

console.log(orig)        // [1, 2, 3] — unchanged


// 13. Array-like to Array Conversion
// ======================
let nodeList = document?.querySelectorAll?.("div") || []

// Convert:
let arrDivs = Array.from(nodeList)
let spreadDivs = [...nodeList]

// Array.from with map:
let doubled = Array.from([1, 2, 3], x => x * 2)


// 14. fill and copyWithin
// ======================
console.log(new Array(5).fill(0))       // [0, 0, 0, 0, 0]
console.log([1, 2, 3, 4, 5].fill(0, 1, 3)) // [1, 0, 0, 4, 5]

let ca = [1, 2, 3, 4, 5]
ca.copyWithin(0, 3)   // copy index 3..end to index 0
console.log(ca)        // [4, 5, 3, 4, 5]


// 15. Multi-dimensional Arrays
// ======================
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
console.log(matrix[1][2]) // 6


// 16. Summary
// ======================
// Mutating: push/pop, shift/unshift, splice, sort, reverse, fill, copyWithin
// Non-mutating: slice, concat, map, filter, flat, flatMap, toSorted, toReversed, toSpliced, with
// Search: indexOf, lastIndexOf, includes, find, findIndex, findLast, findLastIndex
// Test: some, every
// Reduce: reduce, reduceRight
// Create: Array.from, Array.of, [...], []
// at(n): negative index support
// Avoid mutations: prefer toSorted, toReversed, toSpliced, with
