// ==========================================================
// MODULES — export, import, Dynamic, Patterns
// ==========================================================

// NOTE: This file documents the module syntax.
// Modules require either:
//   <script type="module" src="file.js">
//   package.json with "type": "module"
//   .mjs extension

// 1. Named Exports
// ======================
// export const PI = 3.14159
// export function double(x) { return x * 2 }
// export class Calculator {}

// Grouped:
// const PI = 3.14159
// function double(x) { return x * 2 }
// export { PI, double }


// 2. Named Imports
// ======================
// import { PI, double } from "./math.js"
// import { PI as pi, double as dbl } from "./math.js"


// 3. Default Export
// ======================
// export default class User {}

// import User from "./User.js"


// 4. Mixed Export
// ======================
// export default function main() {}
// export function helper() {}

// import main, { helper } from "./main.js"


// 5. Namespace Import
// ======================
// import * as math from "./math.js"
// math.PI, math.double(5)


// 6. Re-export
// ======================
// export { PI } from "./math.js"
// export * from "./math.js"
// export { default } from "./math.js"


// 7. Dynamic Import (ES2020)
// ======================
async function loadModule() {
  try {
    const module = await import("./dynamic.js")
    module.doSomething()
  } catch (err) {
    console.error("Module load failed:", err)
  }
}

// Use cases: code-splitting, lazy loading, conditional loading


// 8. Module vs Script Differences
// ======================
// Modules:
//   - Always "use strict"
//   - Each module is its own scope (no global pollution)
//   - Top-level this is undefined (not window)
//   - Code runs after HTML parsing (deferred by default)
//   - Static structure (imports/exports at top level)
//   - Can use top-level await
//   - Cross-origin requires CORS

// Scripts:
//   - Global scope unless wrapped
//   - Top-level this is window (browser)
//   - Runs immediately, blocks parsing
//   - No import/export syntax


// 9. Module Patterns
// ======================

// Pattern 1 — Revealing module:
const myModule = (() => {
  let privateCounter = 0

  function privateLog() {
    console.log(privateCounter)
  }

  return {
    increment() { privateCounter++; privateLog() },
    decrement() { privateCounter--; privateLog() },
    get value() { return privateCounter }
  }
})()

myModule.increment() // 1

// Pattern 2 — Singleton (via export):
// const db = createDB()
// export default db


// Pattern 3 — Barrel (index.js):
// export { User } from "./User.js"
// export { Post } from "./Post.js"


// 10. Top-Level await (Modules Only)
// ======================
// Only works in modules:
// const config = await fetch("/config.json").then(r => r.json())
// export default config


// 11. Circular Dependencies
// ======================
// Avoid when possible. JS handles them via live bindings,
// but can cause issues. Restructure to break cycles.


// 12. Import Attributes / Assertions
// ======================
// import data from "./data.json" with { type: "json" }
// (Stage 3 / supported in modern bundlers)


// 13. Summary
// ======================
// - Named exports: export const/function/class, import { name }
// - Default export: export default, import name
// - Dynamic import: import() returns Promise<module>
// - Modules: strict, scoped, deferred, static
// - Use re-exports for public API surface
// - Dynamic import for lazy/code-split loading
// - Avoid circular dependencies
