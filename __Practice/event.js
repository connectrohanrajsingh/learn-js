let span = document.querySelector("span");

// window.addEventListener('keydown', function (keyFound) {
//     console.dir(keyFound);
//     if (keyFound.key.trim().length == 0) {
//         span.textContent = `${keyFound.code} key has no value`;
//         span.style.fontSize = "6rem";
//         span.style.color = "red";
//     } else {
//         span.style.color = "white";
//         span.textContent = keyFound.key;
//     }
// });


// span.addEventListener('mouseover', function () {
//     span.style.color = "";
//     span.classList.add('letterBorder');
// });
// span.addEventListener('mouseout', function () {
//     span.classList.remove('letterBorder');
//     span.style.color = "white";
// });


window.addEventListener('keydown', function (keyFound) {
    if (/^[a-zA-Z]$/.test(keyFound.key)) {
        if (span.textContent == 'Ghost') {
            span.textContent = "";
        }
        span.textContent += keyFound.key;
    } else {
        span.textContent = 'Ghost';
    }
});

// window.addEventListener('mousemove', function (detail) {
//     console.log(detail);
//     if (span.textContent != 'Ghost' && span.textContent != '') {
//         // if (span.textContent == 'Neha') {
//         span.style.color = "red";
//         span.style.left = detail.clientX + "px";
//         span.style.top = detail.clientY + "px";
//     }
// });

// span.addEventListener('mouseover', function () {
//     span.style.color = "blue";
// });

// span.addEventListener('mouseout', function () {
//     span.style.color = "white";
// });

window.addEventListener('click', function (el) {
    console.log(el);
    span.style.top = el.clientY + "px";
    span.style.left = el.clientX + "px";
});
