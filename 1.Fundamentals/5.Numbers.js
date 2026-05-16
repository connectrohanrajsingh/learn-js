// ==========================================================
// NUMBERS — IEEE-754, Math, Edge Cases, Safe Integers
// ==========================================================

// 1. How Numbers Work
// ======================
// All JS numbers are IEEE-754 double-precision floating point (64-bit)
// 1 sign bit | 11 exponent bits | 52 mantissa bits
// ~15-17 significant digits

console.log(42)         // integer
console.log(3.14)       // float
console.log(1e6)        // 1,000,000 (scientific notation)
console.log(0x1A)       // 26 (hex)
console.log(0o77)       // 63 (octal)
console.log(0b1010)     // 10 (binary)


// 2. Number.MAX_SAFE_INTEGER and MIN_SAFE_INTEGER
// ======================
console.log(Number.MAX_SAFE_INTEGER)  // 9007199254740991 (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER)  // -9007199254740991

// Beyond this, integers lose precision:
console.log(9007199254740991 + 1)   // 9007199254740992
console.log(9007199254740991 + 2)   // 9007199254740992 (same!)
console.log(9007199254740991 + 3)   // 9007199254740994

// Use BigInt for larger integers:
console.log(9007199254740991n + 2n) // 9007199254740993n  (correct)


// 3. Number.EPSILON
// ======================
// Smallest difference between two representable numbers
console.log(Number.EPSILON) // 2.220446049250313e-16

// Used for floating point tolerance:
function approxEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON
}

console.log(0.1 + 0.2 === 0.3)           // false
console.log(approxEqual(0.1 + 0.2, 0.3)) // true


// 4. NaN — Not a Number
// ======================
console.log(NaN === NaN)              // false !!
console.log(Number.isNaN(NaN))        // true
console.log(isNaN("hello"))           // true (coerces to number first)
console.log(Number.isNaN("hello"))    // false (does NOT coerce)
console.log(isNaN(undefined))         // true
console.log(Number.isNaN(undefined))  // false

// isNaN vs Number.isNaN:
// isNaN coerces the value to number first
// Number.isNaN only true if value IS NaN

// NaN propagation:
console.log(NaN + 1)          // NaN
console.log(NaN * 0)          // NaN
console.log(Math.sqrt(-1))    // NaN


// 5. Infinity and -Infinity
// ======================
console.log(1 / 0)            // Infinity
console.log(-1 / 0)           // -Infinity
console.log(Infinity > 1000)  // true
console.log(Infinity + 1)     // Infinity
console.log(Infinity - Infinity) // NaN
console.log(Infinity * 0)     // NaN


// 6. Number.isFinite, Number.isInteger, Number.isSafeInteger
// ======================
console.log(Number.isFinite(42))          // true
console.log(Number.isFinite(Infinity))    // false
console.log(Number.isFinite(NaN))         // false

console.log(Number.isInteger(3))          // true
console.log(Number.isInteger(3.0))        // true (3.0 === 3 in JS)
console.log(Number.isInteger(3.14))       // false

console.log(Number.isSafeInteger(42))     // true
console.log(Number.isSafeInteger(2e53))   // false (beyond max safe)


// 7. Parsing Methods
// ======================
console.log(parseInt("   42  "))    // 42 (trims whitespace)
console.log(parseInt("42abc"))      // 42 (stops at non-digit)
console.log(parseInt("abc42"))      // NaN
console.log(parseInt("0xFF"))       // 255
console.log(parseInt("101", 2))     // 5 (binary radix)
console.log(parseFloat("3.14abc"))  // 3.14
console.log(Number("42abc"))        // NaN (stricter)


// 8. Math Object — Full Methods
// ======================
console.log(Math.round(3.7))      // 4
console.log(Math.ceil(3.2))       // 4
console.log(Math.floor(3.7))      // 3
console.log(Math.trunc(3.7))      // 3 (removes fractional part)
console.log(Math.abs(-5))         // 5
console.log(Math.pow(2, 10))      // 1024
console.log(Math.sqrt(16))        // 4
console.log(Math.cbrt(27))        // 3 (cube root)
console.log(Math.max(3, 7, 1))    // 7
console.log(Math.min(3, 7, 1))    // 1
console.log(Math.random())        // [0, 1)
console.log(Math.floor(Math.random() * 10)) // 0-9
console.log(Math.sign(-5))        // -1
console.log(Math.sign(0))         // 0
console.log(Math.sign(5))         // 1
console.log(Math.hypot(3, 4))     // 5 (pythagorean)
console.log(Math.log(Math.E))     // 1
console.log(Math.log10(100))      // 2
console.log(Math.log2(8))         // 3


// 9. Number Prototype Methods
// ======================
let n = 123.456
console.log(n.toFixed(2))         // "123.46" (rounds, returns string)
console.log(n.toPrecision(4))     // "123.5" (total digits)
console.log(n.toExponential(2))   // "1.23e+2"
console.log((255).toString(16))   // "ff" (hex string)
console.log((42).toString(2))     // "101010" (binary string)


// 10. -0 and Object.is
// ======================
console.log(-0 === 0)             // true (=== can't distinguish)
console.log(Object.is(-0, 0))     // false (correct)

console.log(1 / -0)               // -Infinity
console.log(1 / 0)                // Infinity

// Object.is also handles NaN correctly:
console.log(Object.is(NaN, NaN))  // true
console.log(NaN === NaN)          // false


// 11. Summary
// ======================
// - IEEE-754 double precision (64-bit)
// - Safe integers: ±2^53 (use BigInt beyond)
// - Number.EPSILON for float comparison
// - NaN ≠ NaN — use Number.isNaN or Object.is
// - isNaN coerces, Number.isNaN doesn't
// - Math provides: round, ceil, floor, trunc, random, etc.
// - Avoid ==, use === or Object.is for edge cases
