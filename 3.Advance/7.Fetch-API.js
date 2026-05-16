// ==========================================================
// FETCH API — GET/POST, Headers, Error Handling, AbortController
// ==========================================================

// 1. Basic GET Request
// ======================
fetch("https://api.example.com/users")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  })
  .then(data => console.log(data))
  .catch(err => console.error("Fetch failed:", err))


// 2. Response Object Properties
// ======================
fetch("https://api.example.com/users")
  .then(res => {
    console.log(res.status)        // 200, 404, 500
    console.log(res.statusText)    // "OK", "Not Found"
    console.log(res.ok)            // true if 200-299
    console.log(res.headers)       // Headers object
    console.log(res.url)           // final URL (after redirects)
    console.log(res.type)          // "basic", "cors", "opaque"
    console.log(res.redirected)    // true if followed redirect
  })


// 3. Reading Response Body
// ======================
// response.json()       → parse as JSON
// response.text()       → plain text
// response.blob()       → binary data (images, files)
// response.formData()   → FormData
// response.arrayBuffer() → raw bytes

// These methods return Promises and can only be called ONCE


// 4. POST Request with JSON
// ======================
async function createUser(userData) {
  let response = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer token123"
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    let error = await response.text()
    throw new Error(`POST failed: ${response.status} - ${error}`)
  }

  return response.json()
}


// 5. Other HTTP Methods
// ======================
// PUT — update/replace:
fetch("/api/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Updated" })
})

// PATCH — partial update:
fetch("/api/users/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Patched" })
})

// DELETE:
fetch("/api/users/1", { method: "DELETE" })


// 6. Headers API
// ======================
async function fetchWithHeaders(url) {
  let headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", "Bearer token")
  headers.set("Cache-Control", "no-cache")

  headers.has("Authorization") // true
  headers.get("Content-Type")  // "application/json"
  headers.delete("Cache-Control")

  for (let [key, value] of headers) {
    console.log(key, value)
  }

  return fetch(url, { headers })
}


// 7. Sending Form Data
// ======================
async function submitForm(formElement) {
  let formData = new FormData(formElement)

  // For file uploads — let browser set Content-Type:
  let response = await fetch("/api/upload", {
    method: "POST",
    body: formData  // no explicit Content-Type (browser sets multipart)
  })

  return response.json()
}


// 8. AbortController — Cancel Fetch
// ======================
// Cancel in-flight requests (timeouts, user cancellation)

function fetchWithTimeout(url, timeoutMs = 5000) {
  let controller = new AbortController()
  let timeout = setTimeout(() => controller.abort(), timeoutMs)

  return fetch(url, { signal: controller.signal })
    .finally(() => clearTimeout(timeout))
}

// Usage:
// try {
//   let data = await fetchWithTimeout("https://api.example.com/slow", 2000)
// } catch (err) {
//   if (err.name === "AbortError") {
//     console.log("Request timed out or was cancelled")
//   }
// }

// Also useful for user-triggered cancellation:
let controller = new AbortController()
// later: controller.abort()


// 9. CORS and Credentials
// ======================
// Cross-Origin Resource Sharing

fetch("https://other-domain.com/api", {
  mode: "cors",          // default for cross-origin
  credentials: "include" // send cookies cross-origin
  // credentials: "same-origin" // default
  // credentials: "omit" // never send
})

// "opaque" response type when CORS fails
// Can't read response body/content from opaque responses


// 10. Common Patterns
// ======================

// Retry on failure:
async function fetchWithRetry(url, retries = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      let response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (err) {
      if (attempt === retries) throw err
      console.log(`Attempt ${attempt} failed, retrying...`)
      await new Promise(r => setTimeout(r, delayMs))
    }
  }
}

// Base URL wrapper:
function apiClient(baseUrl) {
  return {
    get: (path) => fetch(`${baseUrl}${path}`).then(r => r.json()),
    post: (path, data) => fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(r => r.json())
  }
}

// let api = apiClient("https://api.example.com")
// api.get("/users").then(console.log)


// 11. Summary
// ======================
// GET: fetch(url)
// POST/PUT/PATCH/DELETE: fetch(url, { method, headers, body })
// Response: .ok, .status, .headers, .json(), .text(), .blob()
// Headers: new Headers(), .append(), .get(), .set(), .has()
// AbortController: .abort(), signal to fetch options
// CORS: mode, credentials options
// FormData: automatic for forms, multipart for files
// Error handling: check response.ok, catch network/abort errors
