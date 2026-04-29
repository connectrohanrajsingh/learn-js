// ==========================================================
// COOKIES, LOCAL STORAGE, SESSION STORAGE
// ==========================================================



// ==================================================
// 1. WHAT IS WEB STORAGE?
// ==================================================
// Ways browser stores data

// Cookies
// Local Storage
// Session Storage

// Used for:
// login tokens
// preferences
// carts
// themes
// temporary data



// ==================================================
// 2. COOKIES
// ==================================================
// Small data stored in browser
// Sent to server with every request

// size ~4KB

// Syntax:
document.cookie = "username=Rohan";

console.log(document.cookie);
// username=Rohan



// ==================================================
// 3. MULTIPLE COOKIES
// ==================================================

document.cookie = "theme=dark";
document.cookie = "lang=en";

console.log(document.cookie);
// username=Rohan; theme=dark; lang=en




// ==================================================
// 4. COOKIE WITH EXPIRY
// ==================================================

document.cookie = "user=Amit; expires=Fri, 31 Dec 2027 12:00:00 UTC";
// persistent cookie




// ==================================================
// 5. COOKIE PATH
// ==================================================

document.cookie = "token=123; path=/";

// accessible entire site




// ==================================================
// 6. DELETE COOKIE
// ==================================================

document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
// cookie deleted




// ==================================================
// 7. READ COOKIE
// ==================================================

console.log(document.cookie);
// all cookies string

// parse manually:
function getCookie(name) {

    let cookies = document.cookie.split(";");

    for (let c of cookies) {

        let cookie = c.trim();

        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

console.log(getCookie("theme"));
// dark




// ==================================================
// 8. COOKIE ATTRIBUTES
// ==================================================

// expires
// max-age
// path
// domain
// secure
// samesite

document.cookie = "id=1; secure; samesite=strict";




// ==================================================
// 9. COOKIE USE CASES
// ==================================================

// authentication
// remember login
// server needs access




// ==================================================
// 10. LOCAL STORAGE
// ==================================================
// Stores data permanently
// persists after browser closes

// ~5MB+
// not sent to server



// setItem
localStorage.setItem("name", "Rohan");


// getItem
console.log(localStorage.getItem("name"));
// Rohan




// ==================================================
// 11. UPDATE VALUE
// ==================================================

localStorage.setItem("name", "Amit");

console.log(localStorage.getItem("name"));
// Amit




// ==================================================
// 12. REMOVE ITEM
// ==================================================

localStorage.removeItem("name");

console.log(localStorage.getItem("name"));
// null




// ==================================================
// 13. CLEAR STORAGE
// ==================================================

localStorage.clear();

// all removed




// ==================================================
// 14. STORE OBJECTS
// ==================================================
// localStorage stores strings only

let user = { name: "Rohan", age: 22 };

localStorage.setItem("user", JSON.stringify(user));

let storedUser = JSON.parse(localStorage.getItem("user"));

console.log(storedUser.name);
// Rohan




// ==================================================
// 15. STORAGE LENGTH
// ==================================================

console.log(localStorage.length);
// number of stored keys




// ==================================================
// 16. ACCESS BY INDEX
// ==================================================

console.log(localStorage.key(0));
// first key name




// ==================================================
// 17. LOCAL STORAGE USE CASES
// ==================================================

// dark mode
// shopping cart
// remember preferences
// cached data




// ==================================================
// 18. SESSION STORAGE
// ==================================================
// Same API as localStorage
// clears when tab closes

sessionStorage.setItem("user", "Raj");

console.log(sessionStorage.getItem("user"));
// Raj




// ==================================================
// 19. REMOVE SESSION DATA
// ==================================================

sessionStorage.removeItem("user");

console.log(sessionStorage.getItem("user"));
// null




// ==================================================
// 20. SESSION STORAGE USE CASES
// ==================================================

// multi-step forms
// temporary session data
// per-tab state




// ==================================================
// 21. LOCAL vs SESSION
// ==================================================

// localStorage
// survives browser close

// sessionStorage
// dies when tab closes




// ==================================================
// 22. STORAGE EVENTS
// ==================================================
// fires when localStorage changes
// in another tab

window.addEventListener("storage", (e) => {
    console.log(e.key);
    console.log(e.newValue);
}
);




// ==================================================
// 23. EXAMPLE THEME SAVE
// ==================================================

localStorage.setItem("theme", "dark");

let theme = localStorage.getItem("theme");

console.log(theme);
// dark




// ==================================================
// 24. EXAMPLE VISIT COUNTER
// ==================================================

let visits = localStorage.getItem("visits") || 0;
visits++;

localStorage.setItem("visits", visits);

console.log(visits);
// increments each refresh




// ==================================================
// 25. COOKIES vs LOCAL vs SESSION
// ==================================================

/*

COOKIES
-------
4KB
Sent to server
Can expire
Authentication


LOCAL STORAGE
-------------
5MB+
Browser only
Permanent
Preferences


SESSION STORAGE
---------------
5MB+
Browser only
Per tab
Temporary

*/




// ==================================================
// 26. SECURITY NOTES
// ==================================================

// Don't store sensitive secrets
// in localStorage

// vulnerable to XSS

// HttpOnly cookies safer
// for auth tokens




// ==================================================
// 27. SUMMARY
// ==================================================

// Cookies:
// document.cookie

// Local:
// setItem
// getItem
// removeItem
// clear

// Session:
// same methods

// JSON.stringify()
// JSON.parse()

// Use:
// cookies -> server auth
// localStorage -> persistent
// sessionStorage -> temporary