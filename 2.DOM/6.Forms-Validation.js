// ==========================================================
// FORMS & VALIDATION — Constraint API, Patterns, Real-time
// ==========================================================

// 1. Accessing Forms
// ======================
let form = document.getElementById("myForm")
let formEl = document.querySelector("form")

// Access form elements:
console.log(form.elements)         // all form controls
console.log(form.elements[0])      // by index
console.log(form.elements.username) // by name attribute
console.log(form.length)           // number of controls


// 2. Form Properties
// ======================
console.log(form.action)           // submit URL
console.log(form.method)           // GET/POST
console.log(form.enctype)          // encoding type
console.log(form.name)             // form name
console.log(form.target)           // where to open response


// 3. Input Types and Basic Validation
// ======================
// HTML5 built-in validation (before JS):
// <input type="email" required minlength="3" maxlength="50">
// <input type="number" min="18" max="99">
// <input pattern="[A-Za-z]+">

// Constraint Validation API:

let input = document.getElementById("email")
console.log(input.validity)          // ValidityState object
console.log(input.validity.valid)    // overall validity
console.log(input.validationMessage) // browser's error message
console.log(input.willValidate)      // whether validation applies


// 4. ValidityState Properties
// ======================
// valueMissing    — required field is empty
// typeMismatch    — wrong type (e.g., email without @)
// patternMismatch — doesn't match pattern
// tooLong         — exceeds maxlength
// tooShort        — under minlength
// rangeUnderflow  — under min
// rangeOverflow   — over max
// stepMismatch    — wrong step
// badInput        — browser can't parse
// customError     — setCustomValidity set


// 5. checkValidity and reportValidity
// ======================
console.log(input.checkValidity())    // true/false (also fires invalid event)
console.log(input.reportValidity())   // same + shows browser error UI


// 6. setCustomValidity
// ======================
let username = document.getElementById("username")

username.addEventListener("input", (e) => {
  let val = e.target.value
  if (val.length > 0 && val.length < 3) {
    e.target.setCustomValidity("Username must be at least 3 characters")
  } else if (val.includes(" ")) {
    e.target.setCustomValidity("Spaces not allowed in username")
  } else {
    e.target.setCustomValidity("")  // clear custom error
  }
})

// When setCustomValidity("") — field is valid
// When set to any non-empty string — field is invalid


// 7. Real-time Validation
// ======================
let email = document.getElementById("email")
let emailError = document.getElementById("emailError")

email.addEventListener("input", (e) => {
  let val = e.target.value.trim()

  if (val === "") {
    emailError.textContent = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    emailError.textContent = "Invalid email format"
  } else {
    emailError.textContent = ""
  }
})


// 8. Form Submit Handler
// ======================
form.addEventListener("submit", (e) => {
  e.preventDefault()  // stop page reload

  let data = new FormData(form)
  let isValid = form.checkValidity()

  if (!isValid) {
    form.reportValidity()
    return
  }

  // Collect values:
  let formData = {}
  for (let [key, value] of data) {
    formData[key] = value
  }

  console.log("Submitting:", formData)
  // form.submit()  // actual submit
  // or fetch(url, { method: "POST", body: data })
})


// 9. FormData API
// ======================
// Automatically collects all form fields

function handleFormSubmit(formEl) {
  let data = new FormData(formEl)

  // Read values:
  console.log(data.get("username"))      // single value
  console.log(data.getAll("hobbies"))    // multiple values (checkbox)
  console.log(data.has("agree"))         // boolean

  // Iterate:
  for (let [key, val] of data) {
    console.log(key, val)
  }

  // Send as JSON:
  let json = Object.fromEntries(data)
  console.log(json)

  // Send as form data (for file upload):
  // fetch("/api", { method: "POST", body: data })
}


// 10. Form Reset
// ======================
form.addEventListener("reset", () => {
  console.log("Form reset")
  // Clear any custom error messages
  document.querySelectorAll(".error").forEach(el => el.textContent = "")
})


// 11. Common Validation Patterns
// ======================

// Email:
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Strong password (8+ chars, upper, lower, digit, special):
let strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

// Phone (10 digits):
let phonePattern = /^\d{10}$/

// URL:
let urlPattern = /^https?:\/\/.+\..+/

// Only letters and spaces:
let namePattern = /^[A-Za-z\s]+$/


// 12. Summary
// ======================
// Access: form.elements[name], form.elements[index]
// Constraint Validation: checkValidity(), reportValidity(), validity.*
// setCustomValidity() — set/clear custom errors
// FormData — automatic form collection
// Prevent default submit behavior for JS handling
// Real-time validation via input event
// Always validate server-side too (client-side is UX only)
