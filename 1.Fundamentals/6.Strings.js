// ==========================================================
// STRINGS — Methods, Unicode, Template Literals, Comparison
// ==========================================================

// 1. UTF-16 and Unicode
// ======================
// Strings are UTF-16 encoded sequences of code units
// Most characters are 1 code unit (U+0000 to U+FFFF)
// Emoji and rare chars are 2 code units (surrogate pairs)

let emoji = "😀"
console.log(emoji.length)       // 2 (surrogate pair!)
console.log([...emoji].length)  // 1 (correct)
console.log(Array.from(emoji).length) // 1 (correct)


// 2. String Methods — Comprehensive
// ======================
let s = "  Hello, JavaScript World!  "

// Case:
console.log(s.toUpperCase())    // "  HELLO, JAVASCRIPT WORLD!  "
console.log(s.toLowerCase())    // "  hello, javascript world!  "

// Trim:
console.log(s.trim())           // "Hello, JavaScript World!"
console.log(s.trimStart())      // "Hello, JavaScript World!  "
console.log(s.trimEnd())        // "  Hello, JavaScript World!"

// Padding:
console.log("5".padStart(3, "0"))   // "005"
console.log("5".padEnd(3, "0"))     // "500"
console.log("hello".padStart(10))   // "     hello"

// Search:
console.log(s.indexOf("Java"))      // 9
console.log(s.lastIndexOf("o"))     // 19
console.log(s.includes("Script"))   // true
console.log(s.startsWith("  He"))   // true
console.log(s.endsWith("!  "))      // true

// Extract:
console.log(s.slice(2, 7))          // "Hello" (start, end)
console.log(s.slice(-6, -1))        // "orld!" (negative counts from end)
console.log(s.substring(2, 7))      // "Hello" (no negative support)
console.log(s.substr(2, 5))         // "Hello" (deprecated, start, length)

// Replace:
let text = "cat dog cat"
console.log(text.replace("cat", "bird"))     // "bird dog cat"
console.log(text.replaceAll("cat", "bird"))  // "bird dog bird"

// Split/Join:
let csv = "a,b,c"
console.log(csv.split(","))         // ["a", "b", "c"]
console.log(csv.split(""))          // ["a", ",", "b", ",", "c"]
console.log(["a", "b"].join("|"))   // "a|b"

// Repeat:
console.log("Ha".repeat(3))         // "HaHaHa"

// Char access:
console.log("ABC"[0])               // "A"
console.log("ABC".charAt(0))        // "A"
console.log("ABC".charCodeAt(0))    // 65
console.log("A".codePointAt(0))     // 65

// Comparison:
console.log("a".localeCompare("b")) // -1 (a comes before b)
console.log("a".localeCompare("a")) // 0
console.log("b".localeCompare("a")) // 1
console.log("ä".localeCompare("z", "de")) // -1 (German sorting)

// From char code:
console.log(String.fromCharCode(65))       // "A"
console.log(String.fromCodePoint(128512))  // "😀"


// 3. Template Literals (Backticks)
// ======================
let name = "Rohan"
let age = 28

// Interpolation:
let greeting = `Hello, ${name}! You are ${age}.`
console.log(greeting) // "Hello, Rohan! You are 28."

// Expressions:
console.log(`2 + 2 = ${2 + 2}`)

// Multi-line:
let multi = `Line 1
Line 2
Line 3`
console.log(multi)

// Tagged templates:
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) =>
    acc + str + (values[i] ? `**${values[i]}**` : ""), "")
}
let result = highlight`Name: ${name}, Age: ${age}`
console.log(result) // "Name: **Rohan**, Age: **28**"


// 4. Escape Sequences
// ======================
console.log("Hello\nWorld")   // newline
console.log("Hello\tWorld")   // tab
console.log("Hello\\World")   // backslash
console.log("Hello\"World")   // double quote
console.log('Hello\'World')   // single quote
console.log("Hello\u00A9")    // © (unicode escape)
console.log("Hello\xA9")      // © (hex escape)


// 5. String Comparison
// ======================
// Strings compare character-by-character using UTF-16 code unit values
console.log("a" < "b")        // true (97 < 98)
console.log("A" < "a")        // true (65 < 97)
console.log("2" < "10")       // false! ("2" > "1" in string comparison)

console.log("2" > "10")       // true (string comparison, not numeric!)
console.log(2 > 10)           // false (numeric comparison)

// Use localeCompare for proper sorting:
let items = ["ñ", "a", "z", "ä"]
console.log(items.sort((a, b) => a.localeCompare(b, "en")))


// 6. Immutability
// ======================
let str = "hello"
str[0] = "H"  // no effect (silently fails in sloppy mode)
console.log(str) // "hello"

// Must reassign:
str = "H" + str.slice(1)
console.log(str) // "Hello"


// 7. Raw Strings
// ======================
// String.raw — treats backslashes as literal
console.log(String.raw`Hello\nWorld`)  // "Hello\\nWorld" (literal)
console.log(`Hello\nWorld`)            // "Hello" + newline + "World"


// 8. Summary
// ======================
// - UTF-16: emoji/rare chars use 2 code units (length ≠ character count)
// - Use [...str] or Array.from(str) for correct character iteration
// - Template literals: interpolation, multi-line, tagged templates
// - localeCompare for proper string sorting
// - Strings are immutable — methods return new strings
// - replace replaces first match, replaceAll replaces all
// - String.raw for literal backslash handling
