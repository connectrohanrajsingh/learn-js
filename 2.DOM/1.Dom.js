// 1. WHAT IS DOM?
// ==================================================
// DOM represents the HTML page as a TREE of objects
// JavaScript uses DOM to read and change HTML & CSS



// 2. SELECTING ELEMENTS (WHY & HOW)
// ==================================================
// We must SELECT an element before modifying it

// Example HTML:
// <h1 id="title">Hello</h1>
// <p class="info">Para 1</p>
// <p class="info">Para 2</p>


// By ID (fastest, unique)
let title = document.getElementById("title");
console.log(title); // <h1 id="title">Hello</h1>

// By Class (multiple elements)
let info = document.getElementsByClassName("info");
console.log(info.length); // 2

// By Tag
let pTags = document.getElementsByTagName("p");
console.log(pTags.length); // 2

// querySelector (first match, CSS selector)
let firstInfo = document.querySelector(".info");
console.log(firstInfo.innerText); // Para 1

// querySelectorAll (all matches)
let allInfo = document.querySelectorAll(".info");
console.log(allInfo.length); // 2

// query selector can be used with ("#ids") for id, ("p") for tag and can be nested such as (".col #run")



// 3. HTMLCollection vs NodeList
// ==================================================
// HTMLCollection → live, no forEach 
// NodeList → static, supports forEach




// 4. CHANGING CONTENT
// ==================================================
title.innerText = "New Title";
console.log(title.innerText); // New Title

title.textContent = "Plain Text Only";
console.log(title.textContent); // Plain Text Only

title.innerHTML = "<span>Styled</span>";
console.log(title.innerHTML); // <span>Styled</span>




// 5. innerText vs textContent vs innerHTML
// ==================================================

// innerText → visible text only
// textContent → all text (even hidden)
// innerHTML → HTML with tags




// 6. CHANGING STYLES
// ==================================================
title.style.color = "blue";
title.style.backgroundColor = "yellow";
title.style.fontSize = "30px";
// Visual change only




// 7. WORKING WITH ATTRIBUTES
// ==================================================
let link = document.querySelector("a");

link.setAttribute("href", "https://example.com");
console.log(link.getAttribute("href")); // https://example.com

console.log(link.hasAttribute("target")); // true/false
link.removeAttribute("target");




// 8. CLASS MANIPULATION
// ==================================================
title.classList.add("active");
console.log(title.classList.contains("active")); // true

title.classList.remove("active");
title.classList.toggle("hidden"); // toggle class (add if not in there remove if found)
console.log(title.className); // shows current classes




// 9. CREATING ELEMENTS
// ==================================================
let newDiv = document.createElement("div");
newDiv.innerText = "I am new";
console.log(newDiv); // <div>I am new</div>

document.body.appendChild(newDiv); // added at end




// 10. INSERTING ELEMENTS IN DIFFERENT POSITIONS
// ==================================================
let container = document.querySelector("body");

container.prepend(document.createElement("p")); // at start
container.append(document.createElement("p"));  // at end

// insertBefore
let p1 = document.createElement("p");
let ref = document.querySelector("h1");
document.body.insertBefore(p1, ref);




// 11. REMOVING & REPLACING ELEMENTS
// ==================================================
let el = document.querySelector(".info");
el.remove(); // removes element

let newEl = document.createElement("h2");
newEl.innerText = "Replaced";
title.replaceWith(newEl);




// 12. CLONING ELEMENTS
// ==================================================
let clone = newEl.cloneNode(true);
console.log(clone); // copy of h2
document.body.appendChild(clone);




// 13. DOM TRAVERSAL
// ==================================================
let list = document.querySelector("ul");

console.log(list.parentElement); // parent of ul
console.log(list.children); // HTMLCollection of li
console.log(list.firstElementChild); // first li
console.log(list.lastElementChild); // last li
console.log(list.nextElementSibling); // next element
console.log(list.previousElementSibling); // previous element




// 14. WORKING WITH FORMS
// ==================================================
let input = document.querySelector("input");

input.value = "Rohan";
console.log(input.value); // Rohan

input.placeholder = "Enter name";
console.log(input.placeholder); // Enter name




// 15. DATA ATTRIBUTES
// ==================================================
// <div id="box" data-id="123"></div>

let box = document.getElementById("box");
console.log(box.dataset.id); // 123



// 16. DOCUMENT PROPERTIES
// ==================================================
console.log(document.title); // page title
console.log(document.URL); // current page URL
console.log(document.domain); // domain
console.log(document.body); // <body> element
console.log(document.head); // <head> element



// 17. DOM READY (Without events explanation)
// ==================================================
// Script should be placed before </body>
// OR use defer attribute in script tag



// 18. SUMMARY
// ==================================================
// Select: getElementById, querySelector, querySelectorAll
// Content: innerText, textContent, innerHTML
// Style: element.style.property
// Attributes: setAttribute, getAttribute, removeAttribute
// Classes: classList methods
// Create: createElement, append, prepend, insertBefore
// Remove: remove(), replaceWith()
// Clone: cloneNode()
// Traverse: parent, children, siblings
// Forms: input.value, placeholder
// Data: element.dataset
// Document: title, URL, body, head