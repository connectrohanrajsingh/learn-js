// ==========================================================
// STORAGE — Cookies, localStorage, sessionStorage, IndexedDB intro
// ==========================================================

// ==========================================================
// Part 1: COOKIES
// ==========================================================

// 1. Setting Cookies
// ======================
document.cookie = "username=Rohan"
document.cookie = "theme=dark"

console.log(document.cookie) // "username=Rohan; theme=dark"

// With options:
document.cookie = "token=abc123; path=/; max-age=86400; secure; samesite=strict"

// Options:
// path=/       — accessible on entire site
// max-age=86400 — expires in 24 hours (seconds)
// expires=...  — specific date (alternative to max-age)
// secure       — HTTPS only
// samesite=strict — prevent CSRF (not sent on cross-origin requests)
// samesite=lax   — default, sent on top-level navigation
// samesite=none  — require secure, sent everywhere


// 2. Reading Cookies
// ======================
// document.cookie returns all cookies as a semicolon-separated string

function getCookie(name) {
  let cookies = document.cookie.split("; ")
  for (let c of cookies) {
    let [key, ...rest] = c.split("=")
    if (key === name) return rest.join("=")
  }
  return null
}


// 3. Deleting Cookies
// ======================
// Set expiry date in the past:
document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"


// 4. Cookie Limitations
// ======================
// - Max size: ~4KB per cookie
// - Max ~20 cookies per domain (browser-dependent)
// - Sent with EVERY request (affects performance)
// - Accessible to JS unless HttpOnly (which makes them invisible to JS)


// ==========================================================
// Part 2: LOCAL STORAGE
// ==========================================================

// 5. localStorage Basics
// ======================
// Persists even after browser closes
// ~5-10MB per origin
// NOT sent to server
// Synchronous API

localStorage.setItem("name", "Rohan")
localStorage.setItem("theme", "dark")

console.log(localStorage.getItem("name"))  // "Rohan"
console.log(localStorage.getItem("nonexistent")) // null

localStorage.removeItem("theme")
localStorage.clear()  // remove everything

console.log(localStorage.length)        // number of items
console.log(localStorage.key(0))        // key at index


// 6. Storing Objects
// ======================
let user = { name: "Rohan", age: 28, preferences: { theme: "dark" } }

// Store:
localStorage.setItem("user", JSON.stringify(user))

// Retrieve:
let stored = JSON.parse(localStorage.getItem("user"))
console.log(stored.name) // "Rohan"


// 7. Storage Event (Cross-tab Communication)
// ======================
// Fires when localStorage changes in ANOTHER tab
// Does NOT fire in the same tab that made the change

window.addEventListener("storage", (e) => {
  console.log(e.key)        // changed key
  console.log(e.oldValue)   // previous value
  console.log(e.newValue)   // new value
  console.log(e.url)        // page that made the change
  console.log(e.storageArea) // localStorage object
})


// 8. localStorage Limitations
// ======================
// - Synchronous (blocks main thread for large data)
// - Strings only (need JSON.stringify/parse)
// - No indexing/searching
// - No transactions
// - No built-in expiry (must implement manually)


// ==========================================================
// Part 3: SESSION STORAGE
// ==========================================================

// 9. sessionStorage
// ======================
// Same API as localStorage
// Data persists until tab/window is closed
// NOT shared between tabs (even same origin)

sessionStorage.setItem("temp", "value")
console.log(sessionStorage.getItem("temp"))
sessionStorage.removeItem("temp")
sessionStorage.clear()


// ==========================================================
// Part 4: INDEXEDDB (Intro)
// ==========================================================

// 10. IndexedDB Overview
// ======================
// Async, NoSQL database in the browser
// Stores structured data (objects, blobs, files)
// Supports indexes, transactions, cursors
// Much larger storage (hundreds of MB+)

// Basic usage pattern:
function openDB() {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open("MyApp", 1)

    request.onupgradeneeded = (event) => {
      let db = event.target.result
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id" })
      }
    }

    request.onsuccess = (event) => resolve(event.target.result)
    request.onerror = (event) => reject(event.target.error)
  })
}


// ==========================================================
// Part 5: COMPARISON
// ======================================================
//            Cookies        localStorage    sessionStorage   IndexedDB
// Size       ~4KB           ~5-10MB         ~5-10MB          >250MB
// Sent       Yes (every     No              No               No
// to server  request)
// Async      No             No              No               Yes
// Persist    Configurable   Yes             Tab close        Yes
// Access     Client+Server  Client only     Client only      Client only
// Structure  String         String          String           Objects
// Indexed    No             No              No               Yes
// Expiry     Manual         Manual          Tab close        Manual


// 11. Use Cases Summary
// ======================
// Cookies: auth tokens (HttpOnly), session IDs, server-accessible data
// localStorage: theme preferences, cart data, cached data
// sessionStorage: multi-step form data, temporary tab state
// IndexedDB: large datasets, offline apps, file storage
