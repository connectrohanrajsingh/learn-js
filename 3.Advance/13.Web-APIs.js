// ==========================================================
// WEB APIs — IntersectionObserver, MutationObserver, ResizeObserver, Geolocation
// ==========================================================

// ==========================================================
// 1. IntersectionObserver — Element Visibility
// ==========================================================
// Detects when an element enters/leaves the viewport
// Perfect for: lazy loading, infinite scroll, animations on scroll

function observeVisibility(element, callback) {
  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target)
        // Optional: unobserve after first intersection
        // observer.unobserve(entry.target)
      }
    })
  }, {
    root: null,          // viewport (null = browser viewport)
    rootMargin: "0px",   // expand/shrink the root's bounding box
    threshold: 0.5       // 0 to 1 — how much must be visible to trigger
  })

  observer.observe(element)
  return observer  // return so caller can disconnect
}

// Lazy load images:
// document.querySelectorAll("img[data-src]").forEach(img => {
//   observeVisibility(img, (el) => {
//     el.src = el.dataset.src
//     el.removeAttribute("data-src")
//   })
// })

// Infinite scroll:
// observeVisibility(sentinel, () => fetchNextPage())

// Threshold options:
// [0, 0.5, 1] → fire at 0%, 50%, 100% visible
// { threshold: [0, 0.25, 0.5, 0.75, 1] }


// ==========================================================
// 2. MutationObserver — DOM Changes
// ==========================================================
// Watches for additions, removals, or attribute changes in DOM

function watchDOM(selector, callback) {
  let target = document.querySelector(selector)
  if (!target) return

  let observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        console.log("Nodes added/removed:")
        mutation.addedNodes.forEach(node => callback(node))
      }
      if (mutation.type === "attributes") {
        console.log(`Attribute "${mutation.attributeName}" changed`)
      }
      if (mutation.type === "characterData") {
        console.log("Text content changed")
      }
    })
  })

  observer.observe(target, {
    childList: true,        // watch for add/remove children
    attributes: true,       // watch for attribute changes
    attributeFilter: ["class", "style"], // only specific attributes
    characterData: true,    // watch text content changes
    subtree: true           // watch entire subtree
  })

  return observer
}

// Use case: detect when content is loaded dynamically:
// watchDOM("#comments", (node) => {
//   if (node.nodeType === 1) applySyntaxHighlighting(node)
// })


// ==========================================================
// 3. ResizeObserver — Element Size Changes
// ==========================================================
// Detects when an element's content box or border box changes size

function watchResize(element, callback) {
  let observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      let { width, height } = entry.contentRect
      // entry.target is the element
      // entry.contentRect has: top, left, width, height
      // entry.borderBoxSize — border box size
      // entry.devicePixelContentBoxSize — physical pixels

      callback({ width, height }, entry.target)
    }
  })

  observer.observe(element)
  return observer
}

// Use case: responsive charts, textarea auto-resize, layout adaptation

// Watching multiple elements:
// document.querySelectorAll(".resizable").forEach(el => {
//   watchResize(el, (size) => {
//     el.style.fontSize = `${Math.max(12, size.width / 20)}px`
//   })
// })


// ==========================================================
// 4. Geolocation API
// ==========================================================
// Access device location (requires user permission)

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          speed: position.coords.speed
        })
      },
      (error) => {
        // error.code: 1=PERMISSION_DENIED, 2=POSITION_UNAVAILABLE, 3=TIMEOUT
        reject(error)
      },
      {
        enableHighAccuracy: true,  // use GPS if available
        timeout: 10000,            // max time to wait
        maximumAge: 0              // no cached position
      }
    )
  })
}

// Watch position changes:
// let watchId = navigator.geolocation.watchPosition(
//   (pos) => console.log("New position:", pos.coords),
//   (err) => console.error(err),
//   { enableHighAccuracy: true }
// )
// navigator.geolocation.clearWatch(watchId)


// ==========================================================
// 5. Web Workers (Intro)
// ==========================================================
// Run scripts in background threads (no DOM access)

// Main thread:
// let worker = new Worker("worker.js")
// worker.postMessage({ cmd: "compute", data: largeArray })
// worker.onmessage = (e) => console.log("Result:", e.data)
// worker.onerror = (e) => console.error("Worker error:", e)
// worker.terminate()

// worker.js:
// self.onmessage = (e) => {
//   let result = heavyComputation(e.data)
//   self.postMessage(result)
// }

// SharedWorker — shared between multiple tabs (advanced)


// ==========================================================
// 6. Performance API
// ==========================================================
// Measure execution time:

performance.mark("start")
// ... code to measure ...
performance.mark("end")
performance.measure("MyOperation", "start", "end")

let measures = performance.getEntriesByType("measure")
measures.forEach(m => console.log(`${m.name}: ${m.duration}ms`))

performance.clearMeasures()
performance.clearMarks()


// ==========================================================
// 7. Clipboard API
// ==========================================================
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    console.log("Copied:", text)
  } catch (err) {
    console.error("Copy failed:", err)
  }
}

async function readFromClipboard() {
  try {
    let text = await navigator.clipboard.readText()
    return text
  } catch (err) {
    console.error("Read failed:", err)
    return null
  }
}


// ==========================================================
// 8. Fullscreen API
// ==========================================================
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

console.log(document.fullscreenElement) // current fullscreen element
document.addEventListener("fullscreenchange", () => {
  console.log("Fullscreen changed")
})


// 9. Summary
// ======================
// IntersectionObserver: detect element visibility (lazy load, infinite scroll)
// MutationObserver: detect DOM changes (dynamic content, style changes)
// ResizeObserver: detect element size changes (responsive behavior)
// Geolocation: access device position (maps, location services)
// Web Workers: background threads for heavy computation
// Performance: timing and measurement
// Clipboard: read/write to system clipboard
// Fullscreen: toggle fullscreen display
