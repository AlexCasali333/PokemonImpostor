const canvas = document.getElementById("roulette");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const winnerDisplay = document.getElementById("winnerDisplay");
const radius = canvas.width / 2;
let startAngle = 0;

// Array de colores predefinidos (hasta 10)
const blueColors = [
    "#8C52FF7F",
    "rgba(55,25,117,0.5)",
    "rgba(16,7,37,0.5)",
    "rgba(122,109,241,0.5)",
    "rgba(82,189,255,0.5)",
    "rgba(51,35,85,0.5)",
    "rgba(107,73,175,0.5)",
    "rgba(82,111,255,0.5)",
    "rgba(70,0,216,0.5)",
    "rgba(82,117,255,0.5)"
];

function getPlayersFromCanvas() {
    const data = canvas.getAttribute("data-players");
    if (!data) return [];

    // Regex para extraer cada jugador
    const regex = /Player\[name=(.*?), rol=(.*?), secretWord=(.*?)]/g;
    const players = [];
    let match;
    while ((match = regex.exec(data)) !== null) {
        players.push({
            name: match[1],
            rol: match[2],
            secretWord: match[3] !== 'null' ? match[3] : null
        });
    }
    return players;
}

function drawRoulette(players) {
    if (players.length === 0) return;

    const arc = 2 * Math.PI / players.length;

    for (let i = 0; i < players.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle =     ctx.fillStyle = blueColors[i % blueColors.length];

        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, angle, angle + arc);
        ctx.fill();

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "16px Arial";
        ctx.fillText(players[i].name, radius - 10, 0);
        ctx.restore();
    }
}

// Función para girar la ruleta
function spinRoulette() {
    const players = getPlayersFromCanvas();
    if (players.length === 0) return;

    const spinAngle = Math.random() * 10 + 10;
    const totalRotation = spinAngle * 2 * Math.PI;
    let rotation = 0;

    const animation = setInterval(() => {
        rotation += 0.05;
        startAngle += 0.05;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRoulette(players);

        if (rotation >= totalRotation) {
            clearInterval(animation);
            const winnerIndex = Math.floor(
                ((startAngle - Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI)) / (2 * Math.PI) * players.length
            ) % players.length;

            console.log(players[winnerIndex]);
        }
    }, 3);
}

// Ejecutar al cargar
window.addEventListener("load", () => {
    const players = getPlayersFromCanvas();
    drawRoulette(players);
});

spinButton.addEventListener("click", spinRoulette);
