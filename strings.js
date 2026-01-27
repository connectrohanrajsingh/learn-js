// 1. Definition
// ================================
// Strings are sequences of characters.
// Can be enclosed in:
// - Single quotes ''
// - Double quotes ""
// - Backticks `` (template literals)

let str1 = 'Hello';
let str2 = "World";
let str3 = `Template String`;

console.log(str1, str2, str3);


// 2. Immutability
// ================================
// Strings are immutable. Cannot change individual characters directly.

let s = "Hello";
s[0] = "h"; // does not change
console.log("Immutable test:", s);


// 3. Length
// ================================
let strLen = "JavaScript";
console.log("Length:", strLen.length);


// 4. Accessing Characters
// ================================
let strChar = "ABC";
console.log("strChar[0]:", strChar[0]);
console.log("strChar.charAt(1):", strChar.charAt(1));
console.log("Last character:", strChar[strChar.length-1]);


// 5. String Methods
// ================================

let sample = "  JavaScript String Methods  ";

// 5.1 Case conversion
console.log("toUpperCase():", sample.toUpperCase());
console.log("toLowerCase():", sample.toLowerCase());

// 5.2 Trimming
console.log("trim():", sample.trim());
console.log("trimStart():", sample.trimStart());
console.log("trimEnd():", sample.trimEnd());

// 5.3 Searching
console.log("indexOf('Script'):", sample.indexOf("Script"));  // first occurrence
console.log("lastIndexOf('S'):", sample.lastIndexOf("S"));    // last occurrence
console.log("includes('String'):", sample.includes("String")); // true
console.log("startsWith('  J'):", sample.startsWith("  J"));   // true
console.log("endsWith('ds  '):", sample.endsWith("ds  "));     // true

// 5.4 Extracting parts
console.log("slice(2,10):", sample.slice(2,10));
console.log("substring(2,10):", sample.substring(2,10));
console.log("substr(2,10):", sample.substr(2,10));

// 5.5 Replacing
let text = "abc abc abc";
console.log("replace('abc','xyz'):", text.replace("abc","xyz")); // first
console.log("replaceAll('abc','xyz'):", text.replaceAll("abc","xyz")); // all

// 5.6 Splitting and Joining
let csv = "a,b,c,d";
let arr = csv.split(",");
console.log("split():", arr);
console.log("join('|'):", arr.join("|"));

// 5.7 Repeating
console.log("repeat(3):", "Ha".repeat(3));

// 5.8 charCodeAt and codePointAt
let charTest = "A";
console.log("charCodeAt(0):", charTest.charCodeAt(0));   // 65
console.log("codePointAt(0):", charTest.codePointAt(0)); // 65

// 5.9 padStart and padEnd
console.log("'5'.padStart(3,'0'):", '5'.padStart(3,'0')); // 005
console.log("'5'.padEnd(3,'0'):", '5'.padEnd(3,'0'));     // 500

// 5.10 repeat and concatenation
let strA = "Hello";
let strB = "World";
console.log("Concatenation (+):", strA + " " + strB);
strA += " JS";
console.log("Concatenation (+=):", strA);


// 6. Template Literals
// ================================
// Use backticks ``
let myname = "Rohan";
let greeting = `Hello, ${myname}! Length: ${myname.length}`;
console.log("Template literal:", greeting);

// Multi-line
let multiLine = `Line1
Line2
Line3`;
console.log("Multi-line string:\n", multiLine);


// 7. Type Conversion
// ================================

let n = 123;
console.log("Number to String:", n.toString(), typeof n.toString());
let b = true;
console.log("Boolean to String:", String(b), typeof String(b));
let sNum = "456";
console.log("String to Number:", Number(sNum), typeof Number(sNum));


// 8. Edge Cases
// ================================
console.log("Empty string '' is falsy?", !!'');    // false
console.log("'0' is truthy?", !!'0');             // true
console.log("'abc'+123:", 'abc'+123);             // "abc123"
console.log("123+'abc':", 123+'abc');             // "123abc"
console.log("'10'-5:", '10'-5);                   // 5 (string converted to number)
console.log("'10'+5:", '10'+5);                   // "105" (concatenation)


// 9. Escape Characters
// ================================
console.log("New line:\\n -> Hello\\nWorld");
console.log("Tab:\\t -> Hello\\tWorld");
console.log("Backslash:\\ -> \\");


// 10. Summary
// ================================
// Strings Summary:

// - Definition: sequence of characters: '', "", ` + "``" + `
// - Immutable
// - Access: [] or charAt()
// - Length: .length
// - Methods: toUpperCase(), toLowerCase(), trim(), trimStart(), trimEnd(), indexOf(), lastIndexOf(), includes(), startsWith(), endsWith(), slice(), substring(), substr(), replace(), replaceAll(), split(), join(), repeat(), charCodeAt(), codePointAt(), padStart(), padEnd()
// - Template literals: multi-line & ${variable} interpolation
// - Operators: + (concatenate), += (append)
// - Type conversions: Number/String/Boolean
// - Edge cases: empty string falsy, '0' truthy, numeric conversion during arithmetic
// - Escape characters: \n, \t, \\, \"
