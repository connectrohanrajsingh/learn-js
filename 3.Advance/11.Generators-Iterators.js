// ==========================================================
// GENERATORS & ITERATORS — function*, yield, Custom Iterables
// ==========================================================

// 1. Generator Function — function*
// ======================
// A generator produces a sequence of values on demand (lazy evaluation)
// Execution pauses at each yield and can resume

function* simpleGenerator() {
  yield 1
  yield 2
  yield 3
}

let gen = simpleGenerator()
console.log(gen.next()) // { value: 1, done: false }
console.log(gen.next()) // { value: 2, done: false }
console.log(gen.next()) // { value: 3, done: false }
console.log(gen.next()) // { value: undefined, done: true }


// 2. Generators are Iterable
// ======================
for (let val of simpleGenerator()) {
  console.log(val) // 1, 2, 3
}

console.log([...simpleGenerator()]) // [1, 2, 3]


// 3. Infinite Generator
// ======================
function* idGenerator() {
  let id = 1
  while (true) {
    yield id++
  }
}

let ids = idGenerator()
console.log(ids.next().value) // 1
console.log(ids.next().value) // 2
console.log(ids.next().value) // 3
// Can be used safely because values are lazy (no infinite loop)


// 4. Generators with Arguments — next(value)
// ======================
// You can pass values back into a generator via next()

function* ask() {
  let name = yield "What's your name?"
  let age = yield `Hello ${name}, how old are you?`
  return `${name} is ${age} years old`
}

let conversation = ask()
console.log(conversation.next())          // { value: "What's your name?", done: false }
console.log(conversation.next("Rohan"))   // { value: "Hello Rohan, how old are you?", done: false }
console.log(conversation.next(28))        // { value: "Rohan is 28 years old", done: true }


// 5. yield* — Delegating to Another Generator
// ======================
function* gen1() {
  yield 1
  yield 2
}

function* gen2() {
  yield "a"
  yield* gen1()      // delegate to gen1
  yield "b"
}

console.log([...gen2()]) // ["a", 1, 2, "b"]

// yield* also works with any iterable:
function* yieldIterables() {
  yield* [1, 2, 3]
  yield* "hi"
  yield* new Set([4, 5])
}
console.log([...yieldIterables()]) // [1, 2, 3, "h", "i", 4, 5]


// 6. Custom Iterable Object (Manual Iterator)
// ======================
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

console.log([...range])   // [1, 2, 3, 4, 5]
for (let n of range) {
  console.log(n)          // 1, 2, 3, 4, 5
}


// 7. Generator as Iterable (Same but Elegant)
// ======================
function* createRange(from, to) {
  for (let i = from; i <= to; i++) {
    yield i
  }
}

let r = createRange(1, 5)
console.log([...r]) // [1, 2, 3, 4, 5]


// 8. Async Generators — async function* / for-await-of
// ======================
async function* asyncGenerator() {
  let i = 0
  while (i < 3) {
    await new Promise(r => setTimeout(r, 100))  // simulate delay
    yield i++
  }
}

async function consume() {
  for await (let val of asyncGenerator()) {
    console.log(val) // 0, 1, 2 (with 100ms delay between)
  }
}


// 9. Generator Use Cases
// ======================

// 1. Lazy evaluation — generate values on demand:
function* fibonacci() {
  let a = 0, b = 1
  while (true) {
    yield a
    ;[a, b] = [b, a + b]
  }
}
let fib = fibonacci()
console.log(fib.next().value) // 0
console.log(fib.next().value) // 1
console.log(fib.next().value) // 1
console.log(fib.next().value) // 2
console.log(fib.next().value) // 3

// 2. Pagination — fetch pages on demand:
function* paginate(url) {
  let page = 1
  while (true) {
    yield fetch(`${url}?page=${page}`).then(r => r.json())
    page++
  }
}

// 3. State machines:
function* trafficLight() {
  while (true) {
    yield "red"
    yield "green"
    yield "yellow"
  }
}
let light = trafficLight()
console.log(light.next().value) // "red"
console.log(light.next().value) // "green"


// 10. return() and throw() on Generators
// ======================
function* withCleanup() {
  try {
    yield 1
    yield 2
  } finally {
    console.log("cleanup")
  }
}

let g = withCleanup()
console.log(g.next())       // { value: 1, done: false }
console.log(g.return(99))   // { value: 99, done: true } + "cleanup"

// throw(): injects an error into generator:
function* canCatch() {
  try {
    yield 1
  } catch (e) {
    console.log("Caught:", e.message)
  }
  yield 2
}

let gc = canCatch()
gc.next()
gc.throw(new Error("boom")) // "Caught: boom"
console.log(gc.next())      // { value: 2, done: false }


// 11. Summary
// ======================
// function*: declares generator function
// yield: pause and produce a value
// next(): resume execution, returns {value, done}
// next(value): send value back into generator
// yield*: delegate to another generator or iterable
// for...of: consume all values
// [...gen]: spread all values
// return(val): end generator with value
// throw(err): inject error
// Async generators: async function* + for-await-of
// Use cases: lazy eval, infinite sequences, pagination, state machines
