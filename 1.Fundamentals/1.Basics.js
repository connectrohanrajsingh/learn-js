// ==========================================================
// JAVASCRIPT BASICS — Engine, Execution, "use strict"
// ==========================================================

// 1. What is JavaScript?
// ======================
// - High-level, interpreted/just-in-time compiled language
// - Multi-paradigm: procedural, OOP, functional
// - Prototype-based, dynamic typing, first-class functions
// - Single-threaded with non-blocking event loop


// 2. JavaScript Engine
// ======================
// V8 (Chrome/Node), SpiderMonkey (Firefox), JavaScriptCore (Safari)
//
// Pipeline:
// Source Code → Parser → AST → Interpreter → Bytecode → Profiler → Optimized Machine Code
//
// Just-In-Time (JIT) compilation: interpreted first, hot paths compiled


// 3. Execution Context
// ======================
// There are 3 types:
// - Global Execution Context (GEC)
// - Function Execution Context (FEC)
// - Eval Execution Context
//
// Creation phase:
//   1. Create variable object (VO) / activation object
//   2. Create scope chain
//   3. Set "this" binding
//
// Execution phase:
//   Code runs line by line, assignments happen


// 4. Call Stack
// ======================
function first() {
  second()
  console.log("first done")
}
function second() {
  third()
  console.log("second done")
}
function third() {
  console.log("third done")
}
first()
// Stack: third → second → first → global
// LIFO: Last In, First Out


// 5. "use strict" — Strict Mode
// ======================
// Catches silent errors, disables dangerous features

"use strict"

// Without strict mode these would fail silently:

try {
  undeclaredVar = 42
  // ReferenceError in strict mode
} catch (e) {
  console.log("Strict prevents undeclared vars:", e.message)
}

try {
  let obj = {}
  Object.defineProperty(obj, "x", { value: 1, writable: false })
  obj.x = 99
  // TypeError in strict mode
} catch (e) {
  console.log("Strict prevents frozen assignment:", e.message)
}

// Strict mode also:
// - Makes eval() not leak to surrounding scope
// - Forbids duplicate parameter names
// - Makes "this" undefined in plain functions (instead of global)
// - Forbids octal syntax (042)


// 6. How JS is Loaded
// ======================
// <script> — blocks parsing, runs immediately
// <script defer> — downloads while parsing, runs after HTML parsed
// <script async> — downloads while parsing, runs as soon as ready (no order)

// Loading affects when code runs and DOM availability


// 7. Summary
// ======================
// - JS: high-level, JIT-compiled, multi-paradigm, prototype-based
// - Engine pipeline: parse → interpret → compile hot paths
// - Execution context created for each function call
// - Call stack: LIFO structure tracking function calls
// - Strict mode: opt-in for safer JS (always use it)
// - Script loading: normal (blocking) vs defer vs async
