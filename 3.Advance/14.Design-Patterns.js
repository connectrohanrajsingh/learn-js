// ==========================================================
// DESIGN PATTERNS — Module, Singleton, Factory, Observer, Pub/Sub
// ==========================================================

// 1. Module Pattern (Revealing Module)
// ======================
// Encapsulates private state, exposes public API

const ShoppingCart = (function () {
  let items = []  // private

  function addItem(item) {
    items.push(item)
  }

  function removeItem(id) {
    items = items.filter(item => item.id !== id)
  }

  function getTotal() {
    return items.reduce((sum, item) => sum + item.price, 0)
  }

  function getItems() {
    return [...items]  // return copy to prevent mutation
  }

  // Public API:
  return {
    add: addItem,
    remove: removeItem,
    total: getTotal,
    items: getItems
  }
})()

ShoppingCart.add({ id: 1, name: "Book", price: 15 })
ShoppingCart.add({ id: 2, name: "Pen", price: 3 })
console.log(ShoppingCart.total()) // 18
// items is not accessible from outside


// 2. Singleton Pattern
// ======================
// Ensures only ONE instance exists

const Logger = (function () {
  let instance

  function createInstance() {
    return {
      logs: [],
      log(message) {
        this.logs.push(message)
        console.log(`[LOG]: ${message}`)
      },
      getLogs() {
        return [...this.logs]
      }
    }
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()

const logger1 = Logger.getInstance()
const logger2 = Logger.getInstance()
console.log(logger1 === logger2) // true (same instance)

// ES6 module variant — module exports are singletons by default:
// export default { /* ... */ }


// 3. Factory Pattern
// ======================
// Creates objects without specifying exact class

function createUser(type, data) {
  switch (type) {
    case "admin":
      return { ...data, role: "admin", permissions: ["read", "write", "delete"] }
    case "editor":
      return { ...data, role: "editor", permissions: ["read", "write"] }
    case "viewer":
      return { ...data, role: "viewer", permissions: ["read"] }
    default:
      return { ...data, role: type, permissions: [] }
  }
}

let admin = createUser("admin", { name: "Rohan" })
console.log(admin.permissions) // ["read", "write", "delete"]

// Factory with class:
class PaymentProcessor {
  static create(type) {
    switch (type) {
      case "stripe": return new StripeProcessor()
      case "paypal": return new PayPalProcessor()
      case "razorpay": return new RazorpayProcessor()
      default: throw new Error(`Unknown payment type: ${type}`)
    }
  }
}

// let processor = PaymentProcessor.create("stripe")


// 4. Observer Pattern
// ======================
// One subject notifies many observers of state changes

class Observable {
  constructor() {
    this.observers = new Set()
  }

  subscribe(fn) {
    this.observers.add(fn)
    // Return unsubscribe function:
    return () => this.observers.delete(fn)
  }

  unsubscribe(fn) {
    this.observers.delete(fn)
  }

  notify(data) {
    this.observers.forEach(fn => fn(data))
  }
}

// Usage:
let store = new Observable()

let unsub1 = store.subscribe(data => console.log("Observer 1:", data))
let unsub2 = store.subscribe(data => console.log("Observer 2:", data))

store.notify({ item: "New product" })
// Observer 1: { item: "New product" }
// Observer 2: { item: "New product" }

unsub1()
store.notify({ item: "Sale!" })
// Observer 2: { item: "Sale!" }


// 5. Pub/Sub (Publish-Subscribe)
// ======================
// More decoupled than Observer — via a central message bus

const PubSub = {
  events: {},

  subscribe(event, fn) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(fn)
    return () => this.unsubscribe(event, fn)
  },

  unsubscribe(event, fn) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter(f => f !== fn)
  },

  publish(event, data) {
    if (!this.events[event]) return
    this.events[event].forEach(fn => fn(data))
  }
}

// Components can be completely decoupled:
// Component A:
PubSub.subscribe("user:login", (user) => {
  console.log(`${user.name} logged in`)
})

// Component B:
PubSub.subscribe("user:login", (user) => {
  fetch("/api/track-login", { method: "POST", body: JSON.stringify(user) })
})

// Somewhere else:
// PubSub.publish("user:login", { name: "Rohan", id: 1 })


// 6. Strategy Pattern
// ======================
// Swap algorithms at runtime

const SortStrategies = {
  bubbleSort: (arr) => { /* ... */ },
  quickSort: (arr) => { /* ... */ },
  mergeSort: (arr) => { /* ... */ }
}

class Sorter {
  constructor(strategy = "quickSort") {
    this.strategy = strategy
  }

  setStrategy(name) {
    if (!SortStrategies[name]) throw new Error("Unknown strategy")
    this.strategy = name
  }

  sort(arr) {
    return SortStrategies[this.strategy]([...arr])
  }
}

// let sorter = new Sorter()
// sorter.setStrategy("mergeSort")
// let sorted = sorter.sort([3, 1, 4, 1, 5])


// 7. Decorator Pattern
// ======================
// Add behavior to object without modifying its structure

function withLogging(fn) {
  return function (...args) {
    console.log(`Called with:`, args)
    let result = fn(...args)
    console.log(`Returned:`, result)
    return result
  }
}

function withCache(fn) {
  let cache = new Map()
  return function (...args) {
    let key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    let result = fn(...args)
    cache.set(key, result)
    return result
  }
}

let add = (a, b) => a + b
let loggedAdd = withLogging(add)
let cachedAdd = withCache(add)
let loggedAndCached = withLogging(withCache(add))


// 8. Summary
// ======================
// Module: private state + public API (IIFE)
// Singleton: single instance (module exports are singletons)
// Factory: create objects without specifying class
// Observer: subject notifies many observers
// Pub/Sub: event-based decoupled communication
// Strategy: swap algorithms at runtime
// Decorator: wrap functions/objects with behavior
// Choose pattern based on problem, not for its own sake
