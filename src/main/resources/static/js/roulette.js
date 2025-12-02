/* src/main/resources/static/js/roulette.js */

const canvas = document.getElementById("roulette");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const winnerDiv = document.getElementById("winnerDisplay");
const winnerText = document.getElementById("winnerText");

const radius = canvas.width / 2;
let startAngle = 0;

const blueColors = [
    "#8C52FF", "#5e17eb", "#5271ff", "#8c52ff",
    "#6c5ce7", "#a29bfe", "#74b9ff", "#0984e3"
];

function getPlayersFromCanvas() {
    const data = canvas.getAttribute("data-players");
    if (!data) return [];

    const regexFull = /Player\[name=(.*?), rol=(.*?), secretWord=(.*?)\]/g;

    const players = [];
    let match;
    while ((match = regexFull.exec(data)) !== null) {
        players.push({
            name: match[1],
            rol: match[2]
        });
    }
    return players;
}

function drawRoulette(players) {
    if (players.length === 0) return;
    const arc = 2 * Math.PI / players.length;

    for (let i = 0; i < players.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = blueColors[i % blueColors.length];

        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, angle, angle + arc);
        ctx.fill();

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px Segoe UI";
        ctx.fillText(players[i].name, radius - 20, 5);
        ctx.restore();
    }
}

function spinRoulette() {
    const players = getPlayersFromCanvas();
    if (players.length === 0) return;

    winnerDiv.style.display = 'none';
    spinButton.disabled = true;

    // Velocity config
    let currentVelocity = Math.random() * 0.3 + 0.3;
    const friction = 0.985;

    function animate() {
        startAngle += currentVelocity;
        currentVelocity *= friction;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRoulette(players);

        if (currentVelocity < 0.002) {

            const degrees = startAngle * 180 / Math.PI + 90;
            const arcd = 360 / players.length;
            const index = Math.floor((360 - (degrees % 360)) / arcd);

            const winnerIndex = (index + players.length) % players.length;

            showWinner(players[winnerIndex].name);
            spinButton.disabled = false;
        } else {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function showWinner(name) {
    winnerText.innerText = name;
    winnerDiv.style.display = 'block';
}

window.addEventListener("load", () => {
    const players = getPlayersFromCanvas();
    if(players.length === 0) {
        console.warn("No se pudieron leer jugadores del atributo data-players");
    }
    drawRoulette(players);
});

spinButton.addEventListener("click", spinRoulette);