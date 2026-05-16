// ==========================================================
// TYPE CONVERSION — Implicit, Explicit, Abstract Operations
// ==========================================================

// 1. Explicit Conversion
// ======================

// To String:
console.log(String(123))          // "123"
console.log(String(true))         // "true"
console.log(String(null))         // "null"
console.log(String(undefined))    // "undefined"
console.log((123).toString())     // "123"
console.log(true.toString())      // "true"

// To Number:
console.log(Number("123"))        // 123
console.log(Number("  3.14 "))    // 3.14
console.log(Number("abc"))        // NaN
console.log(Number(true))         // 1
console.log(Number(false))        // 0
console.log(Number(null))         // 0
console.log(Number(undefined))    // NaN
console.log(Number(""))           // 0

// To Boolean:
console.log(Boolean(1))           // true
console.log(Boolean(0))           // false
console.log(Boolean("hello"))     // true
console.log(Boolean(""))          // false
console.log(Boolean(null))        // false
console.log(Boolean(undefined))   // false
console.log(Boolean(NaN))         // false
console.log(Boolean({}))          // true
console.log(Boolean([]))          // true


// 2. Abstract Operations (Spec Internal)
// ======================

// ToPrimitive — converts object to primitive
// Steps: valueOf → toString (for objects)

let obj = {
  valueOf() { return 42 },
  toString() { return "42" }
}
console.log(Number(obj))  // 42 (valueOf used)

let obj2 = {
  toString() { return "hello" }
}
console.log(String(obj2)) // "hello" (toString used)


// 3. Implicit Conversion (Coercion)
// ======================

// String coercion with + :
console.log("5" + 3)          // "53" (number → string)
console.log("5" + true)       // "5true"
console.log("5" + null)       // "5null"

// Number coercion with -, *, /, % :
console.log("10" - 3)         // 7 (string → number)
console.log("10" * "2")       // 20
console.log("10" / 3)         // 3.333...
console.log("10" - "abc")     // NaN
console.log("10" - true)      // 9 (true → 1)
console.log("10" - false)     // 10 (false → 0)
console.log("10" - null)      // 10 (null → 0)

// Boolean coercion with == :
console.log(1 == true)        // true
console.log(0 == false)       // true
console.log("" == false)      // true
console.log(null == undefined) // true


// 4. Falsy and Truthy Values
// ======================
// Falsy (only 6 values):
// false, 0, -0, "" (empty string), null, undefined, NaN

// Everything else is truthy:
// "0", "false", [], {}, Infinity, function(){}

if ("0") console.log("'0' is truthy")
if ({}) console.log("{} is truthy")
if ([]) console.log("[] is truthy")


// 5. == vs === Deep Dive
// ======================

// ===  (strict):  no coercion, compares type + value
// ==   (loose):   coerces if types differ

console.log(1 === "1")    // false
console.log(1 == "1")     // true (string "1" → number 1)

console.log(false === 0)  // false
console.log(false == 0)   // true

console.log(null === undefined) // false
console.log(null == undefined)  // true (special rule)

console.log([] == false)  // true  ("" → 0 == 0)
console.log([] == 0)      // true  ("" → 0)
console.log("" == 0)      // true

// The == algorithm steps:
// 1. Same type → === comparison
// 2. null/undefined → true (only null == undefined)
// 3. string vs number → ToNumber(string)
// 4. boolean involved → ToNumber(boolean)
// 5. object vs primitive → ToPrimitive(object)

// Golden rule: ALWAYS use === (or !==), never ==
// Exception: null check — x == null catches both null and undefined


// 6. parseInt / parseFloat
// ======================
console.log(parseInt("42px"))     // 42
console.log(parseInt("  42  "))   // 42
console.log(parseInt("abc"))      // NaN
console.log(parseInt("0xFF"))     // 255 (auto-detects hex)
console.log(parseInt("101", 2))   // 5 (binary)

console.log(parseFloat("3.14em")) // 3.14
console.log(parseFloat("3.14.15")) // 3.14

// Number() vs parseInt():
// Number("42px")  → NaN
// parseInt("42px") → 42


// 7. The + Unary Operator
// ======================
console.log(+"42")        // 42
console.log(+"abc")       // NaN
console.log(+true)        // 1
console.log(+null)        // 0
console.log(+"")          // 0


// 8. Summary Table
// ======================
//             To String    To Number    To Boolean
// ""          ""           0            false
// "0"         "0"          0            true  ★
// "123"       "123"        123          true
// 0           "0"          —            false
// 1           "1"          —            true
// NaN         "NaN"        —            false
// null        "null"       0            false
// undefined   "undefined"  NaN          false
// []          ""           0            true
// [1]         "1"          1            true
// {}          "[object Object]" NaN     true
