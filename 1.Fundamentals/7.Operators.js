// ==========================================================
// OPERATORS — All operators, Precedence, Nullish, Short-circuit
// ==========================================================

// 1. Arithmetic Operators
// ======================
// +  -  *  /  %  **  ++  --

console.log(10 + 3)   // 13
console.log(10 - 3)   // 7
console.log(10 * 3)   // 30
console.log(10 / 3)   // 3.333...
console.log(10 % 3)   // 1 (remainder)
console.log(10 ** 3)  // 1000 (exponentiation)

// Increment/Decrement:
let a = 5
console.log(++a)      // 6 (pre: increment then return)
console.log(a++)      // 6 (post: return then increment)
console.log(a)        // 7


// 2. Assignment Operators
// ======================
let x = 10
x += 5   // x = x + 5  → 15
x -= 3   // x = x - 3  → 12
x *= 2   // x = x * 2  → 24
x /= 4   // x = x / 4  → 6
x %= 4   // x = x % 4  → 2
x **= 3  // x = x ** 3 → 8


// 3. Comparison Operators
// ======================
console.log(5 == "5")   // true  (coerces)
console.log(5 === "5")  // false (no coercion)
console.log(5 != "5")   // false
console.log(5 !== "5")  // true
console.log(5 > 3)      // true
console.log(5 < 3)      // false
console.log(5 >= 5)     // true
console.log(5 <= 4)     // false


// 4. Logical Operators + Short-circuit Evaluation
// ======================

// && — returns first falsy OR last truthy
console.log(0 && 5)           // 0  (falsy → stops)
console.log(3 && 7)           // 7  (both truthy → last)
console.log("" && "hello")    // "" (falsy → stops)

// || — returns first truthy OR last falsy
console.log(0 || 5)           // 5  (falsy → continues)
console.log(3 || 7)           // 3  (truthy → stops)
console.log("" || "fallback") // "fallback"

// ! — negation
console.log(!true)            // false
console.log(!0)               // true
console.log(!!"hello")        // true (double bang → Boolean)


// 5. Nullish Coalescing ?? — ES2020
// ======================
// Returns right side ONLY if left is null or undefined
// (unlike || which catches all falsy)

let value = 0
console.log(value || 42)       // 42  (0 is falsy)
console.log(value ?? 42)       // 0   (0 is not null/undefined)

let name = ""
console.log(name || "default") // "default"
console.log(name ?? "default") // "" (empty string is not null/undefined)

let n = null
console.log(n ?? "fallback")   // "fallback"

// ?? cannot be chained with && or || without parentheses:
// console.log(0 || 1 ?? 2)    // SyntaxError
console.log((0 || 1) ?? 2)     // 1


// 6. Optional Chaining ?. — ES2020
// ======================
let user = {
  profile: {
    name: "Rohan"
    // address is missing
  }
}

// Without optional chaining:
// console.log(user.profile.address.city) // TypeError

// With optional chaining:
console.log(user.profile?.address?.city)  // undefined (no error)

// Method calls:
let obj = {
  greet() { return "hi" }
}
console.log(obj.greet?.())     // "hi"
console.log(obj.bye?.())       // undefined (no error)

// Dynamic properties:
let key = "name"
console.log(user.profile?.[key]) // "Rohan"


// 7. Logical Assignment Operators — ES2021
// ======================

// &&= — assigns only if variable is truthy
let a1 = 1
a1 &&= 2    // a1 is truthy → a1 = 2
console.log(a1) // 2

let a2 = 0
a2 &&= 2    // a2 is falsy → stays 0
console.log(a2) // 0

// ||= — assigns only if variable is falsy
let b1 = 0
b1 ||= 42   // 0 is falsy → b1 = 42
console.log(b1) // 42

let b2 = 1
b2 ||= 42   // 1 is truthy → stays 1
console.log(b2) // 1

// ??= — assigns only if null/undefined
let c1 = null
c1 ??= "default"
console.log(c1) // "default"

let c2 = 0
c2 ??= "default"
console.log(c2) // 0


// 8. Comma Operator
// ======================
// Evaluates both operands, returns the right side

let result = (1 + 2, 3 + 4)
console.log(result) // 7 (3 + 4)

// Useful in loops:
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j)
}


// 9. Operator Precedence
// ======================
// Higher precedence executes first
// 1. ()         grouping
// 2. . [] ?.    member access
// 3. ++ --      post-increment
// 4. **         exponentiation
// 5. * / %      multiplication
// 6. + -        addition
// 7. < > <= >=  comparisons
// 8. === !== == != equality
// 9. &&         logical AND
// 10. ||        logical OR
// 11. ??        nullish coalescing
// 12. ?:        ternary
// 13. = += -=   assignment

console.log(3 + 5 * 2)        // 13 (* before +)
console.log((3 + 5) * 2)      // 16
console.log(2 + 3 > 4)        // true (+ before >)
console.log(2 ** 3 * 2)       // 16 (** before *)
console.log(1 && 2 || 3)      // 2 (&& before ||)
console.log(null || 1 ?? 2)   // 1 (|| before ??)
// Actually: null || 1 → 1, then 1 ?? 2 → 1


// 10. typeof and instanceof
// ======================
console.log(typeof 42)                // "number"
console.log(typeof function(){})      // "function"
console.log([] instanceof Array)      // true
console.log({} instanceof Object)     // true


// 11. delete and void
// ======================
let obj2 = { a: 1, b: 2 }
delete obj2.a
console.log(obj2)  // { b: 2 }

// void — evaluates expression, returns undefined
console.log(void 0)       // undefined
console.log(void(42))     // undefined
// Used to ensure expression returns undefined:
let link = "javascript:void(0)"
