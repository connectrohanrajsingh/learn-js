// ==========================================================
// CONTROL FLOW — if/else, switch, ternary, Short-circuit Patterns
// ==========================================================

// 1. Truthy/Falsy in Conditionals
// ======================
// if (condition) coerces condition to boolean

if ("hello") console.log("truthy")  // runs
if (0) console.log("falsy")         // doesn't run
if ([]) console.log("truthy")       // runs (empty array is truthy!)
if ({}) console.log("truthy")       // runs
if ("") console.log("falsy")        // doesn't run

// Common pitfall — checking for 0:
let score = 0
if (score) {
  console.log("Has score")  // won't run even though score = 0 is valid
}
// Better:
if (score !== undefined && score !== null) {
  console.log("Has score:", score)
}


// 2. if / else if / else
// ======================
function getGrade(marks) {
  if (marks >= 90) return "A"
  else if (marks >= 75) return "B"
  else if (marks >= 50) return "C"
  else return "F"
}
console.log(getGrade(82)) // "B"

// Without else chains — guard clauses (early return):
function getGradeGuard(marks) {
  if (marks >= 90) return "A"
  if (marks >= 75) return "B"
  if (marks >= 50) return "C"
  return "F"
}


// 3. Nested if — Deeper Analysis
// ======================
// Avoid deep nesting — extract logic or use early returns

// Bad:
function validateBad(user, pass) {
  if (user) {
    if (pass) {
      if (pass.length >= 8) {
        return "valid"
      }
    }
  }
  return "invalid"
}

// Good:
function validateGood(user, pass) {
  if (!user) return "invalid"
  if (!pass) return "invalid"
  if (pass.length < 8) return "invalid"
  return "valid"
}


// 4. Ternary Operator
// ======================
let age = 20
let status = age >= 18 ? "Adult" : "Minor"
console.log(status) // "Adult"

// Nested ternaries (use sparingly):
let value = 15
let category = value > 0 ? (value > 10 ? "large" : "small") : "negative"
console.log(category) // "large"

// Guard using short-circuit:
let name = ""
let displayName = name || "Anonymous"
console.log(displayName) // "Anonymous"


// 5. switch Statement — Full Analysis
// ======================

// Uses STRICT comparison (===)
let day = 3
switch (day) {
  case 1:
    console.log("Monday")
    break
  case 2:
    console.log("Tuesday")
    break
  case 3:
    console.log("Wednesday")
    break
  default:
    console.log("Invalid day")
}

// Fallthrough (intentional):
switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("Weekday")
    break
  case 6:
  case 7:
    console.log("Weekend")
    break
}

// Fallthrough with shared logic:
let fruit = "apple"
switch (fruit) {
  case "apple":
  case "pear":
    console.log("Common fruit")
    break
  case "durian":
    console.log("Exotic fruit")
    break
}

// Scope in switch — use block:
switch (day) {
  case 1: {
    let msg = "Start of week"
    console.log(msg)
    break
  }
  case 2: {
    let msg = "Second day"  // No conflict with case 1's msg
    console.log(msg)
    break
  }
}


// 6. Short-circuit Patterns (Practical)
// ======================

// Default values with || :
function greet(name) {
  name = name || "Guest"  // if falsy (including ""), use default
  console.log(`Hello, ${name}`)
}

// Only when not null/undefined with ?? :
function greet2(name) {
  name = name ?? "Guest"   // only null/undefined → default
  console.log(`Hello, ${name}`)
}

// Conditional execution with && :
let isLoggedIn = true
isLoggedIn && console.log("User is logged in")

// Guarded method call:
let user = { getProfile: () => "profile data" }
user.getProfile && console.log(user.getProfile())

// Optional chaining alternative:
console.log(user?.getProfile?.())


// 7. Multiple Conditions Patterns
// ======================

// Array.includes for OR conditions:
function isVowel(char) {
  return ["a", "e", "i", "o", "u"].includes(char.toLowerCase())
}

// Switch with boolean expressions (executes first true case):
let score = 85
switch (true) {
  case score >= 90:
    console.log("A")
    break
  case score >= 75:
    console.log("B")
    break
  default:
    console.log("C or below")
}


// 8. Summary
// ======================
// - Understand truthy/falsy in conditionals (0, "" are falsy; [], {} are truthy)
// - Guard clauses (early returns) reduce nesting
// - Ternary: condition ? whenTrue : whenFalse
// - switch: strict (===), fallthrough can be intentional, use {} for block scoping
// - || for falsy fallback, ?? for nullish fallback
// - && for guarded execution
// - Array.includes for multiple OR condition checks
