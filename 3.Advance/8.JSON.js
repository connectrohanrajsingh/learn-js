// ==========================================================
// JSON — parse, stringify, Reviver, Replacer, Deep Clone
// ==========================================================

// 1. JSON.parse — String → Object
// ======================
let json = '{"name":"Rohan","age":28,"isStudent":false}'
let obj = JSON.parse(json)

console.log(obj.name)  // "Rohan"
console.log(obj.age)   // 28

// With reviver — transform values during parsing:
let parsed = JSON.parse('{"age":"28","score":"95"}', (key, value) => {
  if (key === "age" || key === "score") {
    return Number(value)  // convert strings to numbers
  }
  return value
})
console.log(parsed.age)   // 28 (number)
console.log(typeof parsed.age) // "number"


// 2. JSON.stringify — Object → String
// ======================
let person = {
  name: "Rohan",
  age: 28,
  city: "Patna",
  greet() { return "hi" },   // functions are omitted
  id: undefined               // undefined values are omitted
}

let str = JSON.stringify(person)
console.log(str) // '{"name":"Rohan","age":28,"city":"Patna"}'

// With replacer — filter properties:
let filtered = JSON.stringify(person, ["name", "age"])
console.log(filtered) // '{"name":"Rohan","age":28}'

// With replacer function:
let transformed = JSON.stringify(person, (key, value) => {
  if (key === "age") return value + 1  // increment age
  return value
})
console.log(transformed) // '{"name":"Rohan","age":29,"city":"Patna"}'


// 3. Formatting — Space/Indent
// ======================
console.log(JSON.stringify(person, null, 2))
// {
//   "name": "Rohan",
//   "age": 28,
//   "city": "Patna"
// }

// Using a custom indent string:
console.log(JSON.stringify(person, null, "---"))


// 4. What JSON.stringify Omits
// ======================
// - Functions/methods
// - undefined values
// - Symbol keys and values
// - NaN → null
// - Infinity → null
// - Circular references → throws TypeError


// 5. Handling Circular References
// ======================
let circular = { name: "loop" }
circular.self = circular

try {
  JSON.stringify(circular)
} catch (e) {
  console.log(e.message) // "Converting circular structure to JSON"
}

// Fix — use a replacer that tracks seen objects:
function safeStringify(obj) {
  let seen = new WeakSet()
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]"
      seen.add(value)
    }
    return value
  })
}
console.log(safeStringify(circular)) // {"name":"loop","self":"[Circular]"}


// 6. toJSON — Custom Serialization
// ======================
class Temperature {
  constructor(celsius) {
    this.celsius = celsius
  }

  toJSON() {
    return {
      value: this.celsius,
      unit: "C"
    }
  }
}

let temp = new Temperature(30)
console.log(JSON.stringify(temp)) // '{"value":30,"unit":"C"}'


// 7. Deep Clone with JSON
// ======================
let original = {
  name: "Rohan",
  scores: [1, 2, 3],
  address: { city: "Patna" }
}

let clone = JSON.parse(JSON.stringify(original))

clone.name = "Amit"
clone.scores.push(4)
clone.address.city = "Delhi"

console.log(original.name)         // "Rohan" (untouched)
console.log(original.scores)       // [1, 2, 3] (untouched)
console.log(original.address.city) // "Patna" (untouched)

// Limitations of JSON deep clone:
// - Loses functions
// - Loses undefined values
// - Loses Symbol keys
// - Date → string (not Date object)
// - Map, Set, RegExp → plain objects or empty
// - Circular references → throws


// 8. JSON.parse with Numbers/Edge Cases
// ======================
console.log(JSON.parse("42"))                 // 42
console.log(JSON.parse('"hello"'))            // "hello"
console.log(JSON.parse("true"))               // true
console.log(JSON.parse("null"))               // null

// Invalid JSON throws:
try {
  JSON.parse("{ broken json }")
} catch (e) {
  console.log("Parse error:", e.message)
}


// 9. Summary
// ======================
// JSON.parse(str, reviver): string → object (reviver transforms during parse)
// JSON.stringify(obj, replacer, space): object → string
// replacer: array of keys or (key, value) function
// Omitted: functions, undefined, symbols, NaN, Infinity
// toJSON(): custom serialization on objects
// Deep clone: JSON.parse(JSON.stringify(obj)) — shallow for functions/undefined
// Circular: use WeakSet-based replacer or avoid
// Always wrap JSON.parse in try/catch for untrusted input
