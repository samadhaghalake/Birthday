const screens = document.querySelectorAll(".screen");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const answerInput = document.getElementById("answerInput");
const lockMsg = document.getElementById("lockMsg");
const cinematicText = document.getElementById("cinematicText");
const typedMessage = document.getElementById("typedMessage");
const heartsContainer = document.getElementById("hearts");
const giftBox = document.getElementById("giftBox");
const giftMessage = document.getElementById("giftMessage");
const whatsappBtn = document.getElementById("whatsappBtn");


const slides = [
    { src: "photo1.jpeg", caption: "The prettiest smile ever 😊" },
    { src: "photo2.png", caption: "A moment worth remembering forever ✨" },
    { src: "photo3.png", caption: "You make everything more beautiful 💖" }
];

let currentSlide = 0;
let slideIntervalStarted = false;
let confettiPieces = [];
let musicPlaying = false;


function goToScreen(id) {
    screens.forEach(screen => screen.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    if (id === "introScreen") startIntro();
    if (id === "messageScreen") startTypingMessage();
    if (id === "galleryScreen" && !slideIntervalStarted) startSlideshow();
}

function checkAnswer() {
    const ans = answerInput.value.trim().toLowerCase();

    if (ans === "samu") {
        lockMsg.textContent = "Unlocked successfully 💖";
        playMusic();
        setTimeout(() => startCountdown(), 700);
    } else {
        lockMsg.textContent = "Oops, try again 😄";
    }
}

function startIntro() {
    const lines = [
        "On this beautiful day...",
        "Someone truly special was born...",
        "Someone sweet, lovely and unforgettable...",
        "Her name is...",
        "Trupti 💖"
    ];

    let i = 0;
    cinematicText.textContent = "";

    const interval = setInterval(() => {
        cinematicText.textContent = lines[i];
        i++;

        if (i >= lines.length) {
            clearInterval(interval);
            setTimeout(() => {
                startStories();
            }, 1400);
        }
    }, 1500);
}

function startTypingMessage() {
    const message =
        `Oyyyy Babadu ❤️

Today is not just your birthday...
it is the day someone truly beautiful came into this world ✨

You have a smile that can brighten any moment,
a presence that feels warm and special,
and a charm that is impossible to forget 💖

I just want to wish you pure happiness,
beautiful memories,
and a year full of laughter, love, peace, and success 🎂🌸

Keep smiling always...
because it looks the best on you 💫`;

    typedMessage.textContent = "";
    let i = 0;

    const typing = setInterval(() => {
        typedMessage.textContent += message[i];
        i++;
        if (i >= message.length) clearInterval(typing);
    }, 26);
}

function updateSlide() {
    const slideImage = document.getElementById("slideImage");
    const photoCaption = document.getElementById("photoCaption");
    const dots = document.getElementById("dots");

    slideImage.src = slides[currentSlide].src;
    photoCaption.textContent = slides[currentSlide].caption;

    dots.innerHTML = "";
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.className = "dot" + (index === currentSlide ? " active" : "");
        dots.appendChild(dot);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
}

function startSlideshow() {
    slideIntervalStarted = true;
    updateSlide();
    setInterval(nextSlide, 3000);
}

function openGift() {
    giftBox.classList.add("open");
    setTimeout(() => {
        giftMessage.classList.add("show");
        burstConfetti();
        for (let i = 0; i < 12; i++) createHeart();
    }, 650);
}

function showFinale() {
    setTimeout(() => {
        alert("This whole surprise... was made only for you Trupti 💖");
    }, 5000);
    goToScreen("finalScreen");
    burstConfetti();
    fireworks();
    for (let i = 0; i < 18; i++) createHeart();
}

function playMusic() {
    bgMusic.play().then(() => {
        musicPlaying = true;
        musicBtn.textContent = "⏸️";
    }).catch(() => {
        musicPlaying = false;
        musicBtn.textContent = "🎵";
    });
}

musicBtn.addEventListener("click", () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
        musicBtn.textContent = "🎵";
    } else {
        playMusic();
    }
});

function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (16 + Math.random() * 24) + "px";
    heart.style.opacity = "0.9";
    heart.style.animation = `floatHeart ${4 + Math.random() * 3}s linear forwards`;
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
}

for (let i = 0; i < 18; i++) {
    setTimeout(createHeart, i * 400);
}

const heartStyle = document.createElement("style");
heartStyle.innerHTML = `
@keyframes floatHeart {
  0% { transform: translateY(0) scale(0.8); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(-110vh) translateX(${Math.random() * 80 - 40}px) scale(1.2); opacity: 0; }
}`;
document.head.appendChild(heartStyle);

whatsappBtn.href =
    "https://wa.me/?text=" +
    encodeURIComponent("Hey ❤️ I saw your birthday surprise webpage... it was so beautiful ✨");

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35
}));

function drawBackgroundParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.fill();
    });

    drawConfetti();
    requestAnimationFrame(drawBackgroundParticles);
}

function burstConfetti() {
    for (let i = 0; i < 120; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * canvas.height * 0.2,
            size: 4 + Math.random() * 7,
            speedY: 2 + Math.random() * 4,
            speedX: (Math.random() - 0.5) * 2,
            rot: Math.random() * Math.PI
        });
    }
}

function drawConfetti() {
    confettiPieces.forEach((c, index) => {
        c.x += c.speedX;
        c.y += c.speedY;
        c.rot += 0.05;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rot);
        ctx.fillStyle = ["#ff7ec7", "#ffd166", "#9bf6ff", "#caffbf", "#ffc6ff"][index % 5];
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 1.4);
        ctx.restore();
    });

    confettiPieces = confettiPieces.filter(c => c.y < canvas.height + 30);
}

drawBackgroundParticles();

document.body.addEventListener("click", () => {
    if (!musicPlaying) {
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicBtn.textContent = "⏸️";
        }).catch(() => { });
    }
}, { once: true });
function startCountdown() {
    let time = 5;
    let countEl = document.getElementById("count");

    goToScreen("countdownScreen");

    let timer = setInterval(() => {
        countEl.innerText = time;
        time--;

        if (time < 0) {
            clearInterval(timer);
            goToScreen("introScreen");
            startIntro();
        }
    }, 1000);
}
const loveMessages = [
    "love u babadu 💖", "Love u so much babu 😊", "My Favorite Person 💫",
    "Mera Bachha 😘💗", "Maaz baal 😍 "
];

setInterval(() => {
    let note = document.createElement("div");
    note.innerText = loveMessages[Math.floor(Math.random() * loveMessages.length)];

    note.style.position = "fixed";
    note.style.left = Math.random() * 100 + "vw";
    note.style.bottom = "-20px";
    note.style.color = "#ff8ccb";
    note.style.fontSize = "14px";
    note.style.opacity = "0.9";
    note.style.animation = "floatUp 4s linear";

    document.body.appendChild(note);

    setTimeout(() => note.remove(), 4000);
}, 800);
document.body.addEventListener("dblclick", () => {
    alert("You found my secret 💖 You are really special 😊");
});

function fireworks() {
    for (let i = 0; i < 80; i++) {
        createHeart(); // already exists
    }
}
const stories = [
    "Hey Tulips 💖",
    "This is your special day ✨",
    "You are really amazing 😊",
    "Keep smiling always 🌸"
];

let currentStory = 0;
let storyTimer;

function startStories() {
    goToScreen("storyScreen");
    showStory();
}

function showStory() {
    document.getElementById("storyText").innerText = stories[currentStory];

    // update progress
    let bars = document.querySelectorAll(".bar");
    bars.forEach((b, i) => {
        b.classList.remove("active");
        if (i <= currentStory) b.classList.add("active");
    });

    clearTimeout(storyTimer);

    storyTimer = setTimeout(() => {
        nextStory();
    }, 3000);
}

function nextStory() {
    if (currentStory < stories.length - 1) {
        currentStory++;
        showStory();
    } else {
        goToScreen("galleryScreen"); // next screen after story
    }
}

function prevStory() {
    if (currentStory > 0) {
        currentStory--;
        showStory();
    }
}
let startX = 0;

document.getElementById("storyScreen").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.getElementById("storyScreen").addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (endX - startX > 50) {
        prevStory(); // swipe right
    }
    else if (startX - endX > 50) {
        nextStory(); // swipe left
    }
});

// tap support
document.getElementById("storyScreen").addEventListener("click", (e) => {
    if (e.clientX < window.innerWidth / 2) {
        prevStory();
    } else {
        nextStory();
    }
});

function startExperience() {
    for (let i = 0; i < 30; i++) {
        createHeart();
    }
    setTimeout(() => {
        goToScreen("lockScreen");
    }, 800);
}
function revealLove() {
    let msg = "You are not just special... you are my favorite feeling 💖";
    let i = 0;

    let el = document.getElementById("loveMsg");
    el.style.display = "block";
    el.innerText = "";

    let typing = setInterval(() => {
        el.innerText += msg[i];
        i++;
        if (i >= msg.length) clearInterval(typing);
    }, 40);
}
const loveLines = [
    "You make my world brighter ✨",
    "Your smile is my favorite 😊",
    "You are my peace 💖",
    "I feel lucky to have you 🌸",
    "You are truly one of a kind 💎"
];

function randomLove() {
    let msg = loveLines[Math.floor(Math.random() * loveLines.length)];
    document.getElementById("randomMsg").innerText = msg;
}
function answerLove() {
    document.getElementById("answerMsg").innerText =
        "Correct answer 😄 You are the cutest 💖";
}
function hoverLove() {
    document.getElementById("hoverText").innerText =
        "See… even touching this brings something special 💖";
}
let pressTimer;

document.body.addEventListener("mousedown", () => {
    pressTimer = setTimeout(() => {
        alert("You stayed... that means you really care 💖");
    }, 2000);
});

document.body.addEventListener("mouseup", () => {
    clearTimeout(pressTimer);
});
