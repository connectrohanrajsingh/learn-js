// ==========================================================
// PROXY & REFLECT — Traps, Validation, Reactive Patterns
// ==========================================================

// 1. Proxy — Intercept Operations on an Object
// ======================
let target = { message: "hello" }

let handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop]
    }
    return `Property "${prop}" doesn't exist`
  }
}

let proxy = new Proxy(target, handler)
console.log(proxy.message)      // "hello"
console.log(proxy.unknown)      // 'Property "unknown" doesn't exist'


// 2. Proxy Traps — Complete List
// ======================
// get              — reading property
// set              — writing property
// has              — in operator
// deleteProperty   — delete
// ownKeys          — Object.keys/getOwnPropertyNames
// getOwnPropertyDescriptor — get descriptor
// defineProperty   — Object.defineProperty
// construct        — new operator
// apply            — function call
// getPrototypeOf   — reading prototype
// setPrototypeOf   — setting prototype
// isExtensible     — checking extensibility
// preventExtensions — prevent extensions


// 3. Validation with Proxy
// ======================
let user = {
  name: "Rohan",
  age: 25
}

let userProxy = new Proxy(user, {
  set(obj, prop, value) {
    if (prop === "age") {
      if (typeof value !== "number") {
        throw new TypeError("Age must be a number")
      }
      if (value < 0 || value > 150) {
        throw new RangeError("Age must be between 0 and 150")
      }
    }
    if (prop === "name") {
      if (typeof value !== "string" || value.length < 2) {
        throw new Error("Name must be at least 2 characters")
      }
    }
    obj[prop] = value
    return true  // indicate success
  },

  deleteProperty(obj, prop) {
    if (prop === "name") {
      throw new Error("Cannot delete name property")
    }
    return delete obj[prop]
  }
})

// userProxy.age = -5     // RangeError
// userProxy.age = "old"  // TypeError
// userProxy.name = "R"   // Error
// delete userProxy.name  // Error


// 4. Read-Only Proxy
// ======================
function readOnly(obj) {
  return new Proxy(obj, {
    set() { throw new Error("Object is read-only") },
    deleteProperty() { throw new Error("Object is read-only") },
    defineProperty() { throw new Error("Object is read-only") }
  })
}

let readonly = readOnly({ secret: "password" })
// readonly.secret = "new"  // Error
console.log(readonly.secret) // "password"


// 5. Logging/Access Tracking
// ======================
function logged(obj) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      console.log(`GET ${String(prop)}`)
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      console.log(`SET ${String(prop)} = ${value}`)
      return Reflect.set(target, prop, value, receiver)
    }
  })
}

let loggedObj = logged({ x: 10 })
loggedObj.x        // logs: GET x
loggedObj.y = 20   // logs: SET y = 20


// 6. Reflect API
// ======================
// Reflect provides methods that correspond to Proxy traps
// Always use Reflect inside Proxy traps for correct behavior

let handler2 = {
  get(target, prop, receiver) {
    console.log(`Accessing "${String(prop)}"`)
    return Reflect.get(target, prop, receiver)
    // Equivalent to: return target[prop]
    // But Reflect preserves receiver (important for inheritance)
  }
}

// Reflect methods mirror Proxy traps:
// Reflect.get(), Reflect.set(), Reflect.has(), Reflect.deleteProperty()
// Reflect.ownKeys(), Reflect.defineProperty(), Reflect.getPrototypeOf()
// Reflect.setPrototypeOf(), Reflect.construct(), Reflect.apply()

// Reflect.construct — call constructor with array args:
class Person {
  constructor(name) { this.name = name }
}
let p = Reflect.construct(Person, ["Rohan"])

// Reflect.apply — call function with this + args array:
function greet(name) { return `Hi ${name}, I'm ${this.role}` }
let result = Reflect.apply(greet, { role: "admin" }, ["Rohan"])
console.log(result) // "Hi Rohan, I'm admin"


// 7. Default Values with Proxy
// ======================
function withDefaults(obj, defaults) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (!(prop in target)) {
        return defaults[prop]
      }
      return Reflect.get(target, prop, receiver)
    }
  })
}

let config = withDefaults({ theme: "dark" }, { theme: "light", lang: "en" })
console.log(config.theme) // "dark" (own value)
console.log(config.lang)  // "en" (default)


// 8. Proxy for Private Properties
// ======================
function withPrivate(obj, prefix = "_") {
  return new Proxy(obj, {
    get(target, prop) {
      if (typeof prop === "string" && prop.startsWith(prefix)) {
        throw new Error(`"${prop}" is private`)
      }
      return target[prop]
    },
    set(target, prop, value) {
      if (typeof prop === "string" && prop.startsWith(prefix)) {
        throw new Error(`"${prop}" is private`)
      }
      target[prop] = value
      return true
    },
    has(target, prop) {
      if (typeof prop === "string" && prop.startsWith(prefix)) return false
      return prop in target
    }
  })
}


// 9. Proxy Limitations
// ======================
// - Proxy doesn't change === identity (proxy !== target)
// - Performance overhead (can be significant for hot paths)
// - Cannot proxy "this" in some cases (when target methods use this directly)
// - No trap for === or typeof (can't intercept equality checks)
// - WeakMap with object key: proxy and target are different objects


// 10. Summary
// ======================
// Proxy: wraps object, intercepts operations via traps
// Traps: get, set, has, deleteProperty, ownKeys, apply, construct, etc.
// Reflect: provides default behavior for each trap
// Validate: constrain property values
// Read-only: prevent all modifications
// Logging: track access patterns
// Defaults: fallback values for missing properties
// Private: hide properties with naming convention
// Always use Reflect inside traps for correct behavior
