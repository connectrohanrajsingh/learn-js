
function greet() {
    let username = document.getElementById("yourname");
    let welcome = document.querySelector("#welcome");
    // console.dir(username);

    let constructedGreet = `Hello ${username.value}`;
    welcome.innerHTML = constructedGreet;
    return
}


// toggle bulb setup
let bulbOff = "https://www.w3schools.com/js/pic_bulboff.gif";
let bulbOn = "https://www.w3schools.com/js/pic_bulbon.gif";

function toggleBulb() {
    let currentBulb = document.querySelector("#currentBulb");
    let currentBulbLabel = document.querySelector("#bulbLabel");

    if (currentBulb.alt == 'on') {
        currentBulb.setAttribute('src', bulbOff);
        currentBulb.alt = 'off';
        currentBulbLabel.innerText = "Turn Me On";
        return;
    }

    currentBulb.setAttribute('src', bulbOn);
    currentBulb.setAttribute('alt', 'on');
    currentBulbLabel.innerText = "Turn Me Off";
    return
}