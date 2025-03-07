function addOneToCounter(){
    document.getElementById("counter").innerText = parseInt(document.getElementById("counter").innerText) + 1
    if (!gameActive) return;
    clickCount++;
    let elapsedTime = (new Date().getTime() - startTime) / 1000;
    let cps = (clickCount / elapsedTime).toFixed(2);
    cpsDisplay.innerText = cps;
}

let clickCount = 0;
let timeLeft = 5;
let timerInterval;
let startTime = 0;
let gameActive = false;

const timerDisplay = document.getElementById("timer");
const cpsDisplay = document.getElementById("cps");
const startButton = document.getElementById("startButton");

function startGame() {
    clickCount = 0;
    timeLeft = 5;
    gameActive = true;
    startTime = new Date().getTime();
    cpsDisplay.innerText = "0";
    startButton.disabled = true;
            
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameActive = false;
            startButton.disabled = false;
        }
    }, 1000);
}

startButton.addEventListener("click", startGame);