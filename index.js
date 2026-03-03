// Data do início: 4 de Março de 2023
const startDate = new Date("2023-03-04T00:00:00"); 

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(daysTotal / 365);
    const remainingDays = daysTotal % 365;

    document.getElementById("counter").innerHTML =
        `Estamos juntos há <strong>${years} anos</strong> e <strong>${remainingDays} dias</strong> ❤️`;
}

updateCounter();
setInterval(updateCounter, 1000);

// --- SISTEMA DE PARTÍCULAS (CANVAS) ---
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedY = Math.random() * 0.5;
    }
    update() {
        this.y -= this.speedY;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 150; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// --- CORAÇÕES CAINDO ---
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart-falling");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    document.body.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 6000);
}

setInterval(createHeart, 600);

// --- FUNÇÃO DE ENTRADA ---
function iniciarSite() {
    const overlay = document.getElementById('overlay');
    const iframe = document.getElementById('spotify-player');

    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1000);

    let currentSrc = iframe.src;
    if (!currentSrc.includes('autoplay=1')) {
        iframe.src = currentSrc + "&autoplay=1";
    }
}