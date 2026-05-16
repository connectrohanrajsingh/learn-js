// ==========================================================
// DESTRUCTURING — Array, Object, Nested, Rest, Defaults
// ==========================================================

// 1. Array Destructuring
// ======================
let [a, b, c] = [1, 2, 3]
console.log(a, b, c) // 1 2 3

// Skipping elements:
let [first, , third] = [10, 20, 30]
console.log(first, third) // 10 30

// Swap variables:
let x = 1, y = 2
;[x, y] = [y, x]
console.log(x, y) // 2 1

// Default values:
let [p = 0, q = 0] = [5]
console.log(p, q) // 5 0

// Rest pattern:
let [head, ...tail] = [1, 2, 3, 4]
console.log(head) // 1
console.log(tail) // [2, 3, 4]


// 2. Object Destructuring
// ======================
let person = { name: "Rohan", age: 28, city: "Patna" }
let { name, age } = person
console.log(name, age) // "Rohan" 28

// Renaming:
let { name: fullName, age: years } = person
console.log(fullName, years) // "Rohan" 28

// Default values:
let { salary = 50000 } = person
console.log(salary) // 50000

// Rest:
let { name: n, ...rest } = person
console.log(n)     // "Rohan"
console.log(rest)  // { age: 28, city: "Patna" }


// 3. Nested Destructuring
// ======================
let data = {
  user: {
    id: 1,
    profile: {
      firstName: "Rohan",
      lastName: "Singh"
    }
  },
  tags: ["js", "web"]
}

let {
  user: {
    id,
    profile: { firstName, lastName }
  },
  tags: [tag1, tag2]
} = data

console.log(id)         // 1
console.log(firstName)  // "Rohan"
console.log(tag1)       // "js"


// 4. Destructuring Function Parameters
// ======================

// Object params:
function greet({ name, age }) {
  return `${name} is ${age} years old`
}
console.log(greet({ name: "Rohan", age: 28 }))

// With defaults:
function createUser({ name = "Guest", role = "user" } = {}) {
  return { name, role }
}
console.log(createUser())                    // { name: "Guest", role: "user" }
console.log(createUser({ name: "Admin" }))   // { name: "Admin", role: "user" }

// Array params:
function sumThree([a, b, c]) {
  return a + b + c
}
console.log(sumThree([1, 2, 3])) // 6


// 5. Mixed Destructuring
// ======================
let response = {
  status: 200,
  data: [{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }]
}

let {
  status: code,
  data: [{ title: firstPost }, { title: secondPost }]
} = response

console.log(code)        // 200
console.log(firstPost)   // "Post 1"
console.log(secondPost)  // "Post 2"


// 6. String Destructuring
// ======================
let [ch1, ch2, ...remaining] = "hello"
console.log(ch1, ch2, remaining.join("")) // h e llo


// 7. Practical Use Cases
// ======================

// Extracting API response:
let apiResponse = { data: { user: { email: "test@test.com" } }, meta: {} }
let { data: { user: { email } } } = apiResponse
console.log(email) // "test@test.com"

// Swapping without temp variable:
let left = "L", right = "R"
;[left, right] = [right, left]
console.log(left, right) // R L

// Skip unused values:
let rgb = [255, 128, 64]
let [, , blue] = rgb
console.log(blue) // 64

// Multiple return values:
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)]
}
let [min, max] = getMinMax([3, 1, 4, 1, 5])
console.log(min, max) // 1 5


// 8. For-of with Destructuring
// ======================
let points = [[1, 2], [3, 4], [5, 6]]
for (let [x, y] of points) {
  console.log(x, y)
}

let entries = Object.entries({ a: 1, b: 2, c: 3 })
for (let [key, value] of entries) {
  console.log(key, value)
}


// 9. Summary
// ======================
// Array: [a, b] = arr, skip with empty, rest with ...
// Object: { key: alias } = obj, rename with key: newName
// Nested: deeply destructure with matching pattern
// Defaults: work when value is undefined (not null!)
// Params: clean way to handle options objects
// Use cases: swap, API response extract, multiple returns, for-of
