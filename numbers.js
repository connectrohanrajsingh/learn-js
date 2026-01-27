// 1. Number Type
// ================================
// In JavaScript, all numbers (integer and floating-point) are of type 'number'.


let intNum = 42;
let floatNum = 3.14;

console.log("Integer:", intNum, "Type:", typeof intNum);
console.log("Floating-point:", floatNum, "Type:", typeof floatNum);


// 2. Special Numeric Values
// ================================

// 2.1 Infinity and -Infinity
console.log("Infinity:", 1 / 0);   // Infinity
console.log("-Infinity:", -1 / 0); // -Infinity

// 2.2 NaN (Not a Number)
console.log("NaN example:", "abc" / 2);   // NaN
console.log("Is NaN:", isNaN("abc" / 2)); // true


// 3. Number Conversion
// ================================

// 3.1 Number() → converts value to number
console.log("Number('42'):", Number("42")); // 42
console.log("Number('3.14'):", Number("3.14")); // 3.14
console.log("Number('abc'):", Number("abc")); // NaN

// 3.2 parseInt() → parses string to integer
console.log("parseInt('42'):", parseInt("42")); // 42
console.log("parseInt('42px'):", parseInt("42px")); // 42
console.log("parseInt('px42'):", parseInt("px42")); // NaN

// 3.3 parseFloat() → parses string to float
console.log("parseFloat('3.14'):", parseFloat("3.14")); // 3.14
console.log("parseFloat('3.14abc'):", parseFloat("3.14abc")); // 3.14


// 4. Number Properties
// ================================

console.log("Number.MAX_VALUE:", Number.MAX_VALUE); // Largest positive number
console.log("Number.MIN_VALUE:", Number.MIN_VALUE); // Smallest positive number
console.log("Number.POSITIVE_INFINITY:", Number.POSITIVE_INFINITY);
console.log("Number.NEGATIVE_INFINITY:", Number.NEGATIVE_INFINITY);
console.log("Number.NaN:", Number.NaN);


// 5. Floating Point Precision
// ================================

// JavaScript numbers can have precision issues due to IEEE 754 format
console.log("0.1 + 0.2 === 0.3 ?", 0.1 + 0.2 === 0.3); // false
console.log("0.1 + 0.2:", 0.1 + 0.2); // 0.30000000000000004

// To fix precision issues, use toFixed() or multiplication
let sum = (0.1 * 10 + 0.2 * 10) / 10;
console.log("Fixed sum:", sum); // 0.3


// 6. Math Object
// ================================

// 6.1 Basic Math Methods
console.log("Math.round(3.7):", Math.round(3.7)); // 4
console.log("Math.floor(3.7):", Math.floor(3.7)); // 3
console.log("Math.ceil(3.3):", Math.ceil(3.3));   // 4
console.log("Math.abs(-5):", Math.abs(-5));       // 5

// 6.2 Powers and Roots
console.log("Math.pow(2,3):", Math.pow(2, 3)); // 8
console.log("Math.sqrt(16):", Math.sqrt(16)); // 4

// 6.3 Min/Max
console.log("Math.min(3,7,1):", Math.min(3, 7, 1)); // 1
console.log("Math.max(3,7,1):", Math.max(3, 7, 1)); // 7

// 6.4 Random
console.log("Math.random():", Math.random()); // 0 <= x < 1
console.log("Random integer 0-9:", Math.floor(Math.random() * 10));


// 7. Number Comparison & Operators
// ================================

let n1 = 10;
let n2 = 3;

console.log("n1 + n2:", n1 + n2); // addition
console.log("n1 - n2:", n1 - n2); // subtraction
console.log("n1 * n2:", n1 * n2); // multiplication
console.log("n1 / n2:", n1 / n2); // division
console.log("n1 % n2:", n1 % n2); // modulus
console.log("n1 ** n2:", n1 ** n2); // exponent


// 8. Number Edge Cases
// ================================

console.log("Division by zero:", 5 / 0); // Infinity
console.log("0/0:", 0 / 0); // NaN
console.log("Math.sqrt(-1):", Math.sqrt(-1)); // NaN
console.log("Infinity - Infinity:", Infinity - Infinity); // NaN


// 9. Summary
// ================================

// Numbers Summary:

// - All numbers in JS are 'number' type (integer or float)
// - Special values: Infinity, -Infinity, NaN
// - Conversion: Number(), parseInt(), parseFloat()
// - Properties: MAX_VALUE, MIN_VALUE, NaN
// - Floating-point arithmetic may have precision issues
// - Math object provides methods: round, floor, ceil, abs, pow, sqrt, min, max, random
// - Operators: +, -, *, /, %, **
// - Edge cases: division by zero, NaN results
