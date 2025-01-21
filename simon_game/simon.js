let gameseq = [];
let userseq = [];
let color = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
let sounds = {
    yellow: new Audio("sounds/sounds_yellow.mp3"),
    red: new Audio("sounds/sounds_red.mp3"),
    purple: new Audio("sounds/sounds_purple.mp3"),
    green: new Audio("sounds/sounds_green.mp3"),
    error: new Audio("sounds/sounds_error.mp3")
};

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUP();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    let btnColor = btn.getAttribute("id");
    if (sounds[btnColor]) {
        sounds[btnColor].play();
    } else {
        console.error(`Sound for ${btnColor} not found`);
    }
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    let btnColor = btn.getAttribute("id");
    if (sounds[btnColor]) {
        sounds[btnColor].play();
    } else {
        console.error(`Sound for ${btnColor} not found`);
    }
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUP() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * color.length);
    let randColor = color[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log("Game Sequence:", gameseq);
    setTimeout(() => gameFlash(randBtn), 500);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUP, 1000);
        }
    } else {
        sounds.error.play();
        if (level > highScore) {
            highScore = level;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Highest Score: <b>${highScore}</b><br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    console.log("User Sequence:", userseq);
    checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
