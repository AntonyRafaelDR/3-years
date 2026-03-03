const text = "Feliz 3 anos ❤️";
const h1 = document.querySelector(".f3a");
if(h1) h1.textContent = ""; 
let i = 0;

function typeWriter() {
  if (i < text.length) {
    h1.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 200);
  }
}

const pause = document.querySelector(".pause");
const music = document.querySelector("#mp3file");
const entrada = document.querySelector(".btn-entrar");

entrada.addEventListener("click", () =>{
    setTimeout(() => {
        typeWriter();
    }, 200);
    if(music) music.play();
});

pause.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        pause.style.opacity = "1";
    } else {
        music.pause();
        pause.style.opacity = "0.5"; // Dá um efeito visual de pausado
    }
});

// --- LÓGICA DA DATA CORRIGIDA ---
const startDate = new Date(2023, 2, 4); // Março é mês 2 no JavaScript

function updateCounter() {
    const now = new Date();
    
    // Calcula a diferença bruta de anos
    let years = now.getFullYear() - startDate.getFullYear();
    
    // Cria a data do próximo/último aniversário no ano atual
    let lastAnniversary = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
    
    // Se o aniversário ainda não aconteceu este ano, subtrai 1 do total de anos
    if (now < lastAnniversary) {
        years--;
        lastAnniversary.setFullYear(now.getFullYear() - 1);
    }

    // Calcula os dias restantes com precisão matemática
    const diffTime = Math.abs(now - lastAnniversary);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const counterEl = document.getElementById("counter");
    if(counterEl) {
        counterEl.innerHTML = `Estamos juntos há <strong>${years} anos</strong> e <strong>${diffDays} dias</strong> ❤️`;
    }
}

updateCounter();
setInterval(updateCounter, 1000);

// --- SISTEMA DE PARTÍCULAS ---
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
