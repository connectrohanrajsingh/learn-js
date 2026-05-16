// ==========================================================
// SYMBOLS & ITERATORS — Well-known Symbols, Iterator Protocol
// ==========================================================

// 1. Symbol — Unique, Immutable Identifier
// ======================
let s1 = Symbol()
let s2 = Symbol()

console.log(s1 === s2) // false (unique)

let s3 = Symbol("debug name")
let s4 = Symbol("debug name")
console.log(s3 === s4) // false (same description, different symbols)

console.log(s3.toString()) // "Symbol(debug name)"
console.log(s3.description) // "debug name"


// 2. Symbols as Object Keys
// ======================
const ID = Symbol("id")
let user = {
  name: "Rohan",
  [ID]: 12345
}

console.log(user[ID])         // 12345
console.log(user.ID)          // undefined (dot can't access symbol keys)

// Symbols are hidden from normal enumeration:
console.log(Object.keys(user))       // ["name"]
console.log(Object.getOwnPropertyNames(user)) // ["name"]

// But visible via:
console.log(Object.getOwnPropertySymbols(user)) // [Symbol(id)]


// 3. Global Symbol Registry
// ======================
// Symbols created via Symbol.for() are shared across realms

let globalA = Symbol.for("app.version")
let globalB = Symbol.for("app.version")
console.log(globalA === globalB) // true (same global symbol)

console.log(Symbol.keyFor(globalA)) // "app.version"

// vs Symbol() — always unique, not registered


// 4. Well-Known Symbols
// ======================
// JS uses symbols to customize built-in behavior

// Symbol.iterator — make objects iterable:
let iterable = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => ({
        value: this.data[index++],
        done: index > this.data.length
      })
    }
  }
}

for (let val of iterable) console.log(val) // 10, 20, 30

// Symbol.toStringTag — customize Object.prototype.toString:
let myObj = {
  [Symbol.toStringTag]: "MyType"
}
console.log(Object.prototype.toString.call(myObj)) // "[object MyType]"

// Symbol.species — control constructor in derived arrays:
class MyArray extends Array {
  static get [Symbol.species]() { return Array }
}
let myArr = new MyArray(1, 2, 3)
let mapped = myArr.map(x => x * 2)
console.log(mapped instanceof MyArray) // false (uses Array species)

// Symbol.hasInstance — customize instanceof:
class MyClass {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance)
  }
}
console.log([] instanceof MyClass) // true

// Symbol.toPrimitive — control type coercion:
let temperature = {
  value: 30,
  unit: "C",
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.value
    return `${this.value}°${this.unit}`
  }
}
console.log(+temperature)   // 30 (number hint)
console.log(`${temperature}`) // "30°C" (string hint)


// 5. Iterator Protocol — Full Custom Iterable
// ======================
// An object is iterable when it has Symbol.iterator method
// Symbol.iterator returns an iterator (object with next())
// next() returns { value: any, done: boolean }

let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    let current = this.from
    let end = this.to

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false }
        }
        return { value: undefined, done: true }
      }
    }
  }
}

console.log([...range])  // [1, 2, 3, 4, 5]
for (let n of range) console.log(n) // 1, 2, 3, 4, 5


// 6. Making Built-ins Iterable
// ======================
// Strings are iterable:
for (let ch of "hello") console.log(ch)

// Arrays are iterable:
for (let el of [1, 2, 3]) console.log(el)

// Maps and Sets are iterable:
let m = new Map([["a", 1]])
for (let [k, v] of m) console.log(k, v)

// Objects are NOT iterable (by default):
// for (let k of {a:1}) {}  // TypeError


// 7. Async Iterator — Symbol.asyncIterator
// ======================
// For async iteration with for-await-of:

let asyncRange = {
  from: 1,
  to: 3,
  [Symbol.asyncIterator]() {
    let current = this.from
    return {
      next() {
        if (current <= this.to) {
          return Promise.resolve({ value: current++, done: false })
        }
        return Promise.resolve({ done: true })
      }
    }
  }
}
// for await (let n of asyncRange) { console.log(n) }


// 8. Summary
// ======================
// - Symbol(): unique, immutable, hidden from enumeration
// - Symbol.for(): shared global registry
// - Symbol.keyFor(): retrieve key from global symbol
// - Well-known symbols: Symbol.iterator, Symbol.toStringTag,
//   Symbol.species, Symbol.hasInstance, Symbol.toPrimitive, etc.
// - Iterator protocol: [Symbol.iterator]() → { next() → {value, done} }
// - Built-in iterables: Array, String, Map, Set, TypedArray
// - Objects are NOT iterable by default (but can be made iterable)
