// ==========================================================
// DOM TRAVERSAL — Parents, Children, Siblings, closest, matches
// ==========================================================

// 1. Parent Nodes
// ======================
let child = document.querySelector(".child")

console.log(child.parentElement)        // Element parent (null if none)
console.log(child.parentNode)          // Node parent (could be document fragment)
console.log(child.closest(".container")) // nearest ancestor matching selector
console.log(child.closest("div"))       // nearest div ancestor (including self)

// Root:
console.log(document.documentElement)   // <html>
console.log(document.body)              // <body>
console.log(document.head)              // <head>


// 2. Children
// ======================
let parent = document.querySelector(".container")

console.log(parent.children)             // HTMLCollection (elements only)
console.log(parent.childNodes)          // NodeList (text+comment+element)
console.log(parent.firstElementChild)   // first Element child
console.log(parent.lastElementChild)    // last Element child
console.log(parent.firstChild)          // first Node child (could be text)
console.log(parent.lastChild)           // last Node child

// Number of children:
console.log(parent.childElementCount)   // count of element children
console.log(parent.children.length)     // same
console.log(parent.childNodes.length)   // all nodes


// 3. Siblings
// ======================
let item = document.querySelector(".item")

console.log(item.nextElementSibling)    // next Element sibling
console.log(item.previousElementSibling) // previous Element sibling
console.log(item.nextSibling)           // next Node sibling (could be text)
console.log(item.previousSibling)       // previous Node sibling

// All siblings:
let siblings = []
let sib = item.parentElement.firstElementChild
while (sib) {
  if (sib !== item) siblings.push(sib)
  sib = sib.nextElementSibling
}


// 4. The document Object
// ======================
console.log(document.title)             // page title
console.log(document.URL)               // current URL
console.log(document.domain)            // domain
console.log(document.referrer)          // previous page URL
console.log(document.documentElement)   // <html> element
console.log(document.body)              // <body> element
console.log(document.head)              // <head> element
console.log(document.forms)             // all forms
console.log(document.images)            // all images
console.log(document.links)             // all links <a>
console.log(document.scripts)           // all scripts
console.log(document.styleSheets)       // all stylesheets


// 5. Walking the DOM Tree (Recursive)
// ======================
function walkTree(node, depth = 0) {
  let indent = "  ".repeat(depth)
  console.log(indent + node.nodeName + " (" + node.nodeType + ")")

  for (let child of node.childNodes) {
    if (child.nodeType === 1) {  // ELEMENT_NODE
      walkTree(child, depth + 1)
    }
  }
}

// walkTree(document.body)


// 6. Node Types Reference
// ======================
// Node.ELEMENT_NODE                = 1
// Node.ATTRIBUTE_NODE              = 2
// Node.TEXT_NODE                   = 3
// Node.CDATA_SECTION_NODE          = 4
// Node.PROCESSING_INSTRUCTION_NODE = 7
// Node.COMMENT_NODE                = 8
// Node.DOCUMENT_NODE               = 9
// Node.DOCUMENT_TYPE_NODE          = 10
// Node.DOCUMENT_FRAGMENT_NODE      = 11

let body = document.body
console.log(body.nodeType)  // 1 (ELEMENT_NODE)


// 7. contains() — Test Descendant
// ======================
let menu = document.querySelector(".menu")
let activeItem = document.querySelector(".menu .active")
console.log(menu.contains(activeItem))  // true


// 8. Summary
// ======================
// Parent: parentElement, parentNode, closest(selector)
// Children: children (elements), childNodes (all), firstElementChild, lastElementChild
// Siblings: nextElementSibling, previousElementSibling
// closest(): find matching ancestor (including self)
// contains(): test if element is descendant
// nodeType: 1=element, 3=text, 8=comment, 9=document
// document collections: forms, images, links, scripts, styleSheets
