/* ==========================================================================
   RAKSHA BANDHAN SURPRISE WEBSITE FOR MONISH
   Interactive Script & Engine - Pure Vanilla JS
   ========================================================================== */

// ==========================================================================
// 1. PERSONAL CUSTOMIZATION CONFIGURATION
// Easily change any personal details below!
// ==========================================================================
const PERSONAL_CONFIG = {
    // Brother's Name (Will automatically replace all name slots across the app)
    brotherName: "Monish",
    
    // Sister Signature Name / Title
    sisterSignature: "Your annoying sister"
};

// ==========================================================================
// 2. DOM CONTENT LOADED & INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Apply Personalization
    applyPersonalization();

    // Initialize Particle Canvas
    initParticleEngine();

    // Initialize Section 1 Typing Sequence
    initOpeningSequence();

    // Initialize Section Interactions
    initNavigation();
    initRakhiTying();
    initEnvelopeLetter();
    initFinalSurprise();
    initModalHandlers();
});

// Populate Name Slots
function applyPersonalization() {
    const slots = document.querySelectorAll(".brother-name-slot");
    slots.forEach(slot => {
        slot.textContent = PERSONAL_CONFIG.brotherName;
    });

    const signature = document.querySelector(".sister-signature");
    if (signature) {
        signature.textContent = PERSONAL_CONFIG.sisterSignature;
    }
}



// ==========================================================================
// 4. CANVAS PARTICLE ENGINE (Petals, Sparkles, Confetti, Hearts)
// ==========================================================================
let canvas, ctx;
let particles = [];
let animFrameId = null;

function initParticleEngine() {
    canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial ambient petals & sparkles
    createAmbientParticles(40);

    // Start loop
    renderParticles();
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createAmbientParticles(count) {
    const types = ['petal', 'sparkle'];
    for (let i = 0; i < count; i++) {
        particles.push({
            type: types[Math.floor(Math.random() * types.length)],
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 1.2 + 0.4,
            speedX: Math.random() * 1 - 0.5,
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 2 - 1,
            opacity: Math.random() * 0.7 + 0.3,
            color: Math.random() > 0.5 ? '#f7941d' : '#ffd700'
        });
    }
}

function triggerBurst(type, count = 50) {
    for (let i = 0; i < count; i++) {
        particles.push({
            type: type,
            x: canvas.width / 2 + (Math.random() * 100 - 50),
            y: canvas.height / 2 + (Math.random() * 100 - 50),
            size: type === 'heart' ? Math.random() * 12 + 10 : Math.random() * 8 + 4,
            speedY: Math.random() * -6 - 2,
            speedX: Math.random() * 8 - 4,
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 4 - 2,
            opacity: 1,
            gravity: 0.15,
            color: ['#ffd700', '#f7941d', '#e91e63', '#ffffff'][Math.floor(Math.random() * 4)]
        });
    }
}

function renderParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'petal') {
            // Draw Marigold/Rose Petal
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.type === 'sparkle') {
            // Draw 4-point Starburst
            ctx.fillStyle = p.color;
            ctx.beginPath();
            for (let j = 0; j < 4; j++) {
                ctx.rotate(Math.PI / 2);
                ctx.lineTo(0, p.size);
                ctx.lineTo(p.size / 4, p.size / 4);
            }
            ctx.fill();
        } else if (p.type === 'heart') {
            // Draw Heart
            ctx.fillStyle = '#e91e63';
            ctx.font = `${p.size}px serif`;
            ctx.fillText('❤️', 0, 0);
        } else if (p.type === 'confetti') {
            // Draw Confetti Rect
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 1.5);
        }

        ctx.restore();

        // Update Position
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.gravity) {
            p.speedY += p.gravity;
        }

        // Fade burst particles
        if (p.gravity) {
            p.opacity -= 0.008;
        }

        // Respawn ambient petals when reaching bottom
        if (!p.gravity && p.y > canvas.height + 20) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
        }

        // Remove dead particles
        if (p.opacity <= 0) {
            particles.splice(i, 1);
        }
    }

    // Keep minimum ambient count
    if (particles.length < 30) {
        createAmbientParticles(10);
    }

    animFrameId = requestAnimationFrame(renderParticles);
}

// ==========================================================================
// 5. SECTION 1 OPENING SEQUENCE
// ==========================================================================
function initOpeningSequence() {
    const lines = document.querySelectorAll(".opening-line");
    lines.forEach((line, idx) => {
        setTimeout(() => {
            line.classList.add("show");
        }, (idx + 1) * 900);
    });

    const startBtn = document.getElementById("btn-start-surprise");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            triggerBurst('sparkle', 60);
            triggerBurst('petal', 40);
            goToSection("sec-celebration");
        });
    }
}

// Navigation Helper function between 8 sections
function goToSection(targetSectionId) {
    const activeSection = document.querySelector(".section.active-section");
    const targetSection = document.getElementById(targetSectionId);

    if (activeSection) {
        activeSection.classList.remove("active-section");
    }

    if (targetSection) {
        targetSection.classList.add("active-section");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==========================================================================
// 6. SECTION NAVIGATION HANDLERS
// ==========================================================================
function initNavigation() {
    // Sec 2 -> Sec 3
    const btnToGreeting = document.getElementById("btn-to-greeting");
    if (btnToGreeting) {
        btnToGreeting.addEventListener("click", () => {
            goToSection("sec-greeting");
            triggerBurst('heart', 20);
        });
    }

    // Sec 3 -> Sec 4 (Rakhi)
    const btnToRakhi = document.getElementById("btn-to-rakhi");
    if (btnToRakhi) {
        btnToRakhi.addEventListener("click", () => {
            goToSection("sec-rakhi");
        });
    }

    // Sec 5 -> Sec 6 (Memories)
    const btnToMemories = document.getElementById("btn-to-memories");
    if (btnToMemories) {
        btnToMemories.addEventListener("click", () => {
            goToSection("sec-memories");
        });
    }

    // Sec 6 -> Sec 7 (Letter)
    const btnToLetter = document.getElementById("btn-to-letter");
    if (btnToLetter) {
        btnToLetter.addEventListener("click", () => {
            goToSection("sec-letter");
        });
    }
}

// ==========================================================================
// 7. VIRTUAL RAKHI TYING INTERACTION (Hero Feature)
// ==========================================================================
function initRakhiTying() {
    const tieBtn = document.getElementById("btn-tie-rakhi");
    const rakhiWidget = document.getElementById("interactive-rakhi");
    const topThread = document.getElementById("wrap-thread-top");
    const bottomThread = document.getElementById("wrap-thread-bottom");
    const successMsg = document.getElementById("tying-success-msg");
    const acceptBtn = document.getElementById("btn-accept-fate");
    const escapeBtn = document.getElementById("btn-escape");

    if (tieBtn && rakhiWidget) {
        tieBtn.addEventListener("click", () => {
            // Animate Rakhi Widget to target wrist
            rakhiWidget.classList.add("tied");

            // Animate SVG threads wrapping around wrist
            if (topThread) topThread.classList.add("animate-tie");
            if (bottomThread) bottomThread.classList.add("animate-tie");

            // Burst particles
            triggerBurst('sparkle', 50);
            triggerBurst('petal', 50);
            triggerBurst('confetti', 40);

            // Hide tie button, reveal success banner
            tieBtn.parentElement.style.display = "none";

            setTimeout(() => {
                if (successMsg) successMsg.classList.remove("hidden");
            }, 1000);
        });
    }

    // Accept Fate button
    if (acceptBtn) {
        acceptBtn.addEventListener("click", () => {
            goToSection("sec-wishes");
        });
    }

    // Playful Runaway "Escape" button interaction
    if (escapeBtn) {
        const playfulMessages = [
            "Nice try 😂",
            "You're not escaping!",
            "Nice attempt, Monish 👀",
            "Nope, stuck forever! 😌"
        ];

        const dodgeButton = (e) => {
            e.preventDefault();
            const randomX = (Math.random() - 0.5) * 160;
            const randomY = (Math.random() - 0.5) * 100;
            escapeBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
            
            // Random toast message on button
            const randomMsg = playfulMessages[Math.floor(Math.random() * playfulMessages.length)];
            escapeBtn.textContent = randomMsg;
        };

        escapeBtn.addEventListener("mouseover", dodgeButton);
        escapeBtn.addEventListener("touchstart", dodgeButton);
    }
}

// ==========================================================================
// 8. 3D ENVELOPE & LETTER INTERACTION
// ==========================================================================
function initEnvelopeLetter() {
    const openBtn = document.getElementById("btn-open-letter");
    const envelope = document.getElementById("envelope");
    const container = document.querySelector(".envelope-container");
    const toFinalBtn = document.getElementById("btn-to-final");

    if (openBtn && envelope) {
        openBtn.addEventListener("click", () => {
            envelope.classList.add("open");
            if (container) container.classList.add("letter-opened");
            openBtn.classList.add("hidden");
            
            triggerBurst('sparkle', 40);
            triggerBurst('petal', 40);

            setTimeout(() => {
                if (toFinalBtn) toFinalBtn.classList.remove("hidden");
            }, 800);
        });
    }

    if (toFinalBtn) {
        toFinalBtn.addEventListener("click", () => {
            goToSection("sec-final");
            runFinalSequence();
        });
    }
}

// ==========================================================================
// 9. FINAL SURPRISE & GRAND FINALE
// ==========================================================================
function runFinalSequence() {
    const seqLines = document.querySelectorAll(".f-seq");
    const grandBox = document.getElementById("finale-grand-box");

    seqLines.forEach((line, idx) => {
        setTimeout(() => {
            line.classList.add("show");
        }, (idx + 1) * 1200);
    });

    setTimeout(() => {
        if (grandBox) {
            grandBox.classList.remove("hidden-fade");
            grandBox.classList.add("show-box");
            
            // Grand Finale Particle Extravaganza!
            triggerBurst('confetti', 100);
            triggerBurst('sparkle', 80);
            triggerBurst('petal', 60);
            triggerBurst('heart', 40);
        }
    }, 4200);
}

function initFinalSurprise() {
    const replayBtn = document.getElementById("btn-replay");
    if (replayBtn) {
        replayBtn.addEventListener("click", () => {
            goToSection("sec-opening");
        });
    }
}

// ==========================================================================
// 10. MODAL HANDLERS FOR GIFT BUTTONS
// ==========================================================================
function initModalHandlers() {
    const modal = document.getElementById("fun-modal");
    const modalClose = document.getElementById("modal-close");
    const modalContent = document.getElementById("modal-content");

    const gpayBtn = document.getElementById("btn-gpay-gift");
    const hugBtn = document.getElementById("btn-hug-gift");

    if (modalClose && modal) {
        modalClose.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.add("hidden");
        });
    }

    if (gpayBtn && modal && modalContent) {
        gpayBtn.addEventListener("click", () => {
            modalContent.innerHTML = `
                <h3>Send Rakhi Gift 💵🎁</h3>
                <p>GPay / UPI Payment status: <strong>Pending since birth 😂</strong></p>
                <div style="font-size: 4rem; margin: 15px 0;">💳✨</div>
                <p style="font-size: 0.95rem; color: #f7941d;">Cash, chocolates, or iPhone accepted without complaints! 😌</p>
            `;
            modal.classList.remove("hidden");
            triggerBurst('sparkle', 30);
        });
    }

    if (hugBtn && modal && modalContent) {
        hugBtn.addEventListener("click", () => {
            modalContent.innerHTML = `
                <h3>Claim Sister's Hug 🤗❤️</h3>
                <p>Virtual Warm Hug successfully delivered to <strong>${PERSONAL_CONFIG.brotherName}</strong>!</p>
                <div style="font-size: 4.5rem; margin: 15px 0;">🫂✨</div>
                <p style="font-size: 0.95rem; color: #ffd700;">No matter how much we fight, you're the best brother ever!</p>
            `;
            modal.classList.remove("hidden");
            triggerBurst('heart', 50);
        });
    }
}
