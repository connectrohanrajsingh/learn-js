# JavaScript Learning Journey — Restructured & Extended

A comprehensive, structured collection of JavaScript notes covering everything from fundamentals to advanced topics, with deep coverage, edge cases, and practical examples.

---

## Structure

### 1. Fundamentals (17 files)

| File                      | Topics                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| `1.Basics.js`             | JS engine, execution context, call stack, strict mode, script loading                     |
| `2.Variables.js`          | var/let/const, hoisting, TDZ, scoping gotchas, naming conventions                         |
| `3.Datatypes.js`          | 7 primitives, typeof quirks, wrappers, value vs reference                                 |
| `4.Type-Conversion.js`    | Explicit/implicit coercion, abstract operations, == vs ===, falsy/truthy                  |
| `5.Numbers.js`            | IEEE-754, EPSILON, safe integers, NaN, Infinity, Math, -0                                 |
| `6.Strings.js`            | UTF-16, all methods, template literals, tagged templates, localeCompare                   |
| `7.Operators.js`          | Arithmetic, logical, nullish (??), optional chaining (?.), logical assignment, precedence |
| `8.Control-Flow.js`       | Truthy/falsy in conditionals, guard clauses, switch fallthrough, short-circuit patterns   |
| `9.Loops.js`              | for/while/do...while, for...of/in, labeled loops, performance, async iteration            |
| `10.Functions.js`         | Declarations, expressions, arrow, IIFE, recursion, memoization, generators, HOF           |
| `11.Arrays.js`            | All mutating/non-mutating methods, sparse arrays, at(), flat, immutable methods (ES2023)  |
| `12.Objects.js`           | Property descriptors, getters/setters, freeze/seal, entries/fromEntries, deep equality    |
| `13.Maps-Sets.js`         | Map vs Object, Set, WeakMap, WeakSet, performance, set operations                         |
| `14.Symbols-Iterators.js` | Symbol, well-known symbols, iterator protocol, custom iterables                           |
| `15.Destructuring.js`     | Array/object/nested, rest, defaults, function params, for-of destructuring                |
| `16.Error-Handling.js`    | try/catch/finally, Error types, custom errors, stack traces, best practices               |
| `17.Modules.js`           | export/import, dynamic import, module vs script, patterns, top-level await                |

### 2. DOM (9 files)

| File                    | Topics                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `1.DOM-Selection.js`    | getElementById, querySelector, live vs static, closest, matches, contains               |
| `2.DOM-Manipulation.js` | create/insert/remove/replace/clone, fragment, innerHTML security, style                 |
| `3.DOM-Traversal.js`    | parent/child/sibling navigation, document collections, node types                       |
| `4.Events.js`           | addEventListener, event object, flow, bubbling/capturing, stopPropagation, passive/once |
| `5.Event-Delegation.js` | Delegation pattern, closest matching, dynamic elements, non-bubbling events             |
| `6.Forms-Validation.js` | FormData, Constraint Validation API, setCustomValidity, real-time validation, patterns  |
| `7.Storage.js`          | Cookies, localStorage, sessionStorage, IndexedDB intro, comparison table                |
| `8.Styling-DOM.js`      | classList, className, getComputedStyle, CSS custom properties, dimensions               |
| `9.Dimensions.js`       | offset/client/scroll, getBoundingClientRect, viewport detection, scroll, matchMedia     |

### 3. Advance (15 files)

| File                          | Topics                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `1.Scope-Closures.js`         | Lexical scope, scope chain, closures, module pattern, memory, loop traps      |
| `2.This-Keyword.js`           | 5 binding rules, call/apply/bind, arrow functions, event handlers, priorities |
| `3.Prototypes-Inheritance.js` | [[Prototype]], __proto__, .prototype, Object.create, shadowing, chain         |
| `4.OOP-Classes.js`            | ES6 classes, get/set, static, private (#), extends, mixins, instanceof        |
| `5.Promises.js`               | States, chaining, Promise.all/allSettled/race/any, promisification            |
| `6.Async-Await.js`            | Async functions, await, error handling, sequential vs parallel, for-await-of  |
| `7.Fetch-API.js`              | GET/POST, Headers, FormData, AbortController, CORS, retry patterns            |
| `8.JSON.js`                   | parse/stringify, reviver/replacer, deep clone, circular refs, toJSON          |
| `9.ES6-Features.js`           | Comprehensive ES6-ES2023 feature reference by version                         |
| `10.Event-Loop.js`            | Call stack, microtasks vs macrotasks, rAF, blocking, queueMicrotask           |
| `11.Generators-Iterators.js`  | function*, yield, infinite generators, async generators, custom iterables     |
| `12.Proxy-Reflect.js`         | Proxy traps, validation, read-only, logging, Reflect API, private properties  |
| `13.Web-APIs.js`              | IntersectionObserver, MutationObserver, ResizeObserver, Geolocation, Workers  |
| `14.Design-Patterns.js`       | Module, Singleton, Factory, Observer, Pub/Sub, Strategy, Decorator            |
| `15.Memory-Performance.js`    | GC, memory leaks, debounce/throttle, layout thrashing, measurement            |

### Practice (`__Practice/`)

Hands-on exercises: dice game, DOM manipulation, event handling, loader, profile, storage.

---

## How to Use

Start with **1.Fundamentals** in order, then proceed to **2.DOM** (browser APIs), and finally **3.Advance** (deeper concepts). Each file is self-contained and can be run with Node.js or in a browser console.

```bash
node "1.Fundamentals/1.Basics.js"
```

For DOM files, include them in an HTML file with `<script>` or open DevTools console.
