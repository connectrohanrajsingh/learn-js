// ==========================================================
// JAVASCRIPT FORM VALIDATION
// ==========================================================

// Example HTML:
//
// <form id="myForm">
//   <input id="username">
//   <small id="userError"></small>
//
//   <input id="email">
//   <small id="emailError"></small>
//
//   <input id="password" type="password">
//   <small id="passError"></small>
//
//   <button type="submit">Submit</button>
// </form>



// ==================================================
// 1. WHY VALIDATION
// ==================================================
// Prevent invalid data
// Improve UX
// Protect data integrity
// Client-side + server-side both needed




// ==================================================
// 2. BASIC REQUIRED VALIDATION
// ==================================================

let username = "John";

if (username.trim() === "") {
    console.log("Username required");
    // Username required
}




// ==================================================
// 3. LENGTH VALIDATION
// ==================================================

let password = "abc123";

if (password.length < 8) {
    console.log("Password too short");
    // Password too short
}




// ==================================================
// 4. EMAIL VALIDATION
// ==================================================

let email = "test@gmail.com";

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(emailPattern.test(email));
// true

console.log(emailPattern.test("abc@"));
// false




// ==================================================
// 5. CHECK ALL FIELDS FILLED
// ==================================================

let fields = ["John", "john@gmail.com", "12345678"];

console.log(
    fields.every(field => field.trim() !== "")
);
// true




// ==================================================
// 6. PASSWORD CONFIRM
// ==================================================

let pass1 = "secret123";
let pass2 = "secret123";

console.log(pass1 === pass2);
// true




// ==================================================
// 7. REGEX EXAMPLES
// ==================================================

// only letters
let nameRegex = /^[A-Za-z ]+$/;
console.log(nameRegex.test("Rohan"));
// true


// digits only
let numRegex = /^\d+$/;
console.log(numRegex.test("12345"));
// true


// strong password
let strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/;

console.log(strongPass.test("Abc@1234"));
// true




// ==================================================
// 8. SHOWING ERRORS IN UI
// ==================================================

let userInput = document.getElementById("username");
let userError = document.getElementById("userError");

if (userInput.value.trim() === "") {
    userError.innerText = "Username required";
    // error shown on page
}




// ==================================================
// 9. CLEARING ERRORS
// ==================================================

userError.innerText = "";
// error removed




// ==================================================
// 10. HELPER FUNCTIONS
// ==================================================

function showError(element, message) {
    element.innerText = message;
}

function clearError(element) {
    element.innerText = "";
}




// ==================================================
// 11. FORM SUBMIT + preventDefault()
// ==================================================
// Prevent form from submitting
// until validation passes

let form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {

    e.preventDefault(); // stops default page reload

    let username = document.getElementById("username").value.trim();

    let email = document.getElementById("email").value.trim();

    let password = document.getElementById("password").value.trim();

    let valid = true;

    if (username === "") {
        showError(document.getElementById("userError"), "Username required");
        valid = false;
    } else {
        clearError(document.getElementById("userError"));
    }


    if (!emailPattern.test(email)) {
        showError(document.getElementById("emailError"), "Invalid email");
        valid = false;
    } else {
        clearError(document.getElementById("emailError"));
    }


    if (password.length < 8) {
        showError(document.getElementById("passError"), "Min 8 characters");
        valid = false;
    } else {
        clearError(document.getElementById("passError"));
    }



    if (valid) {
        console.log("Form submitted");
        // Form submitted

        // optional real submit:
        // form.submit();
    }

});




// ==================================================
// 12. checkValidity()
// ==================================================

console.log(form.checkValidity());
// true/false




// ==================================================
// 13. CUSTOM BROWSER MESSAGE
// ==================================================

let input = document.getElementById("username");

input.setCustomValidity("Username already exists");

// browser shows custom error




// ==================================================
// 14. CHECKBOX VALIDATION
// ==================================================

let agreed = true;

if (!agreed) {
    console.log("Accept terms");
}
else {
    console.log("Terms accepted");
    // Terms accepted
}




// ==================================================
// 15. SELECT VALIDATION
// ==================================================

let country = "";

if (country === "") {
    console.log("Select country");
    // Select country
}




// ==================================================
// 16. SANITIZATION
// ==================================================

let dirty = "   hello   ";

console.log(dirty.trim());
// hello




// ==================================================
// 17. VALIDATE USING FUNCTION
// ==================================================

function validateForm() {

    if (username.trim() === "") {
        return "Username required";
    }

    if (!emailPattern.test(email)) {
        return "Invalid email";
    }

    return "Valid";
}

console.log(validateForm());
// Valid




// ==================================================
// 18. SUMMARY
// ==================================================

// trim()
// length checks
// regex patterns
// every()
// password confirmation
// showError / clearError
// submit event
// preventDefault()
// form.checkValidity()
// setCustomValidity()
// sanitization

// IMPORTANT:
// preventDefault()
// stops form submission
// until your validation passes