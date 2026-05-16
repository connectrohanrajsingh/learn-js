// ==========================================================
// ERROR HANDLING — try/catch/finally, Custom Errors, Stack Traces
// ==========================================================

// 1. try/catch/finally
// ======================
try {
  let result = riskyOperation()
  console.log(result)
} catch (error) {
  console.error("Caught:", error.message)
} finally {
  console.log("Always runs, even on error")
}


// 2. Error Object Properties
// ======================
try {
  throw new Error("Something broke")
} catch (err) {
  console.log(err.name)      // "Error"
  console.log(err.message)   // "Something broke"
  console.log(err.stack)     // stack trace (string)
}


// 3. Error Types
// ======================

// ReferenceError — accessing undeclared variable
try {
  console.log(notDeclared)
} catch (e) {
  console.log(e instanceof ReferenceError) // true
}

// TypeError — wrong type usage
try {
  null.f()
} catch (e) {
  console.log(e instanceof TypeError) // true
}

// SyntaxError — parsing error (can't catch at runtime)
// Trying to catch a syntax error doesn't work
// try { eval("---") } catch(e) { console.log(e instanceof SyntaxError) }

// RangeError — value out of allowed range
try {
  new Array(-1)
} catch (e) {
  console.log(e instanceof RangeError) // true
}

// URIError — malformed URI
try {
  decodeURIComponent("%")
} catch (e) {
  console.log(e instanceof URIError) // true
}

// EvalError — rarely used, reserved for eval() issues


// 4. throw — Any Value
// ======================
// You can throw anything (not just Error objects):

throw new Error("string error")   // recommended
// throw "string"
// throw 42
// throw { code: 500, msg: "Server error" }

// Always throw Error objects for proper stack traces


// 5. Custom Error Classes
// ======================
class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = "ValidationError"
    this.field = field
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = "NetworkError"
    this.statusCode = statusCode
  }
}

function validateUser(user) {
  if (!user.name) throw new ValidationError("Name required", "name")
  if (user.age < 0) throw new ValidationError("Invalid age", "age")
}

function fetchUser(id) {
  if (id <= 0) throw new NetworkError("Invalid ID", 400)
  throw new NetworkError("Not found", 404)
}

// Catching specific errors:
try {
  validateUser({ name: "", age: -1 })
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(`Validation failed on ${err.field}: ${err.message}`)
  } else {
    throw err  // re-throw unexpected errors
  }
}


// 6. finally Block
// ======================
// Runs no matter what — even after return, break, continue

function testFinally() {
  try {
    return "from try"
  } finally {
    console.log("finally runs before return")
  }
}
console.log(testFinally())
// "finally runs before return"
// "from try"


// 7. Nested try/catch
// ======================
try {
  try {
    throw new Error("inner")
  } catch (innerErr) {
    console.log("Inner caught:", innerErr.message)
    throw new Error("outer")  // re-throw for outer catch
  }
} catch (outerErr) {
  console.log("Outer caught:", outerErr.message)
}


// 8. Error Stack Traces
// ======================
function level3() { throw new Error("deep error") }
function level2() { level3() }
function level1() { level2() }

try {
  level1()
} catch (err) {
  console.log(err.stack)
  // Error: deep error
  //   at level3 (file.js:3)
  //   at level2 (file.js:4)
  //   at level1 (file.js:5)
  //   at ...
}


// 9. Best Practices
// ======================

// ❌ Avoid:
try {
  // entire app
} catch (e) {}  // silently swallows errors

try {
  JSON.parse(input)
} catch (e) {
  // generic catch without specific handling
}

// ✅ Use:
function parseJSON(input) {
  try {
    return JSON.parse(input)
  } catch (e) {
    if (e instanceof SyntaxError) {
      return { error: "Invalid JSON", input }
    }
    throw e  // re-throw unexpected
  }
}

// Don't catch errors you can't handle:
// - Let them propagate up
// - Catch at appropriate level


// 10. Global Error Handling (Browser)
// ======================
// window.onerror = function(message, source, line, col, error) {}
// window.addEventListener("unhandledrejection", event => {})

// Node.js:
// process.on("uncaughtException")
// process.on("unhandledRejection")


// 11. Summary
// ======================
// - try: wrap risky code
// - catch: handle error (has name, message, stack)
// - finally: always executes (cleanup)
// - Error types: ReferenceError, TypeError, RangeError, etc.
// - Custom errors: extend Error class, set this.name
// - throw: can throw anything, but prefer Error objects
// - Never silently swallow errors
// - Use instanceof to differentiate error types
// - Re-throw what you can't handle
