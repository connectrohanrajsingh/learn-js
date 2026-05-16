// ==========================================================
// MAPS, SETS, WEAKMAP, WEAKSET
// ==========================================================

// 1. Map — Key-Value with Any Key Type
// ======================
// Unlike Object: keys can be ANY type (object, function, primitive)
// Maintains insertion order
// Has size property (vs Object needs Object.keys(obj).length)

let map = new Map()

map.set("name", "Rohan")
map.set(42, "the answer")
map.set({ id: 1 }, "object key")
map.set(true, "boolean key")

console.log(map.get("name"))  // "Rohan"
console.log(map.get(42))      // "the answer"
console.log(map.has(42))      // true
console.log(map.size)         // 4

map.delete(42)
console.log(map.size)         // 3
map.clear()
console.log(map.size)         // 0


// 2. Map vs Object — When to Use
// ======================
// Map:
//   - Keys are frequently added/removed
//   - Keys aren't strings/symbols
//   - Order matters
//   - Need size property
//   - Frequency of lookups is high (Map is optimized for this)

// Object:
//   - JSON serialization needed
//   - Need prototype chain
//   - Fixed set of known keys
//   - Using this/self context

// Performance: Map is generally faster for add/delete operations


// 3. Map Iteration
// ======================
let scores = new Map([
  ["Alice", 95],
  ["Bob", 87],
  ["Charlie", 92]
])

for (let [key, value] of scores) {
  console.log(key, value)
}

scores.forEach((value, key) => console.log(key, value))

for (let key of scores.keys()) console.log(key)
for (let value of scores.values()) console.log(value)
for (let [k, v] of scores.entries()) console.log(k, v)

// Spread:
console.log([...scores])          // [["Alice",95], ["Bob",87], ["Charlie",92]]
console.log([...scores.keys()])   // ["Alice", "Bob", "Charlie"]


// 4. Set — Unique Values
// ======================
let set = new Set()

set.add(1)
set.add(2)
set.add(2)  // ignored (exists)
set.add(3)

console.log(set.size)    // 3
console.log(set.has(2))  // true
console.log(set.delete(2)) // true
console.log(set.has(2))  // false

// Set from array (deduplication):
let dupes = [1, 2, 2, 3, 3, 4]
let unique = [...new Set(dupes)]
console.log(unique) // [1, 2, 3, 4]

// Set operations:
let a = new Set([1, 2, 3])
let b = new Set([2, 3, 4])

// Union:
let union = new Set([...a, ...b])

// Intersection:
let intersection = new Set([...a].filter(x => b.has(x)))

// Difference:
let difference = new Set([...a].filter(x => !b.has(x)))

console.log([...union])        // [1, 2, 3, 4]
console.log([...intersection]) // [2, 3]
console.log([...difference])   // [1]


// 5. Set Iteration
// ======================
let fruits = new Set(["apple", "banana", "mango"])

for (let fruit of fruits) console.log(fruit)
fruits.forEach(fruit => console.log(fruit))
console.log([...fruits]) // ["apple", "banana", "mango"]


// 6. WeakMap — Garbage-Collectible Keys
// ======================
// Keys MUST be objects (not primitives)
// No reference to key = key-value pair is garbage collected
// Not iterable (no keys(), values(), entries())
// No size property

let wm = new WeakMap()
let user = { id: 1 }

wm.set(user, "sensitive data")
console.log(wm.get(user)) // "sensitive data"

user = null // now the entry can be garbage collected

// Use case: private data, caching, DOM element metadata


// 7. WeakSet — Garbage-Collectible Values
// ======================
// Values MUST be objects
// Not iterable, no size
// Values garbage collected when no other references exist

let ws = new WeakSet()
let element = { node: "div" }

ws.add(element)
console.log(ws.has(element)) // true

element = null // can be collected

// Use case: marking objects as "processed" without preventing GC


// 8. Practical Map Use Cases
// ======================

// Caching function results:
const cache = new Map()
function expensive(n) {
  if (cache.has(n)) return cache.get(n)
  let result = n * n  // expensive computation
  cache.set(n, result)
  return result
}

// Object key map:
let clickCounts = new Map()
function trackClick(btn) {
  clickCounts.set(btn, (clickCounts.get(btn) || 0) + 1)
}


// 9. Map vs Object Summary
// ======================
//                Map                    Object
// Key type       Any                    String/Symbol
// Order          Insertion              Integer keys first, then insertion
// Size           .size                  Object.keys().length
// Iteration      Directly iterable      Need Object.keys/entries
// Performance    Optimized add/delete   Optimized create/access
// Inherited      No inherited keys      Has prototype chain
// JSON           Not serializable       JSON.stringify friendly
// When to use    Frequent changes       Fixed keys, JSON needed
