const roles = ["Digital Marketer", "Content Strategist", "Agentic AI executive"];
const typingTextElement = document.querySelector(".typing-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

// Mobile Menu Components
const mobileMenu = document.getElementById('mobile-menu');
const navLinksArr = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinksArr.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinksArr.classList.remove('active');
        });
    });
}

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause after typing
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing new role
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the typing effect when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});

// Prevent form submission for demo
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form.');
        contactForm.reset();
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// 3D Tilt Effect
const tiltCards = document.querySelectorAll('.skill-card, .project-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});
// Counting Animation for Stats
const statsSection = document.querySelector('.hero-stats');
const statNumbers = document.querySelectorAll('.stat-number');
let started = false; // Function Started ? No

function startCount(el) {
    const target = parseInt(el.dataset.target);
    const suffix = "+"; // Added suffix manually
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    const updateCount = () => {
        count += increment;
        if (count < target) {
            el.innerText = Math.ceil(count) + suffix;
            requestAnimationFrame(updateCount);
        } else {
            el.innerText = target + suffix;
        }
    };
    updateCount();
}

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statNumbers.forEach(num => startCount(num));
            started = true;
        }
    }, { threshold: 0.1 }); // Lower threshold to trigger sooner

    statsObserver.observe(statsSection);
}

// Reports Modal Logic
const reportsModal = document.getElementById('reportsModal');

window.openReportsModal = function () {
    reportsModal.style.display = 'flex';
    // Small delay to allow display:flex to apply before adding show class for transition
    setTimeout(() => {
        reportsModal.classList.add('show');
    }, 10);
}

window.closeReportsModal = function () {
    reportsModal.classList.remove('show');
    // Wait for transition to finish before hiding
    setTimeout(() => {
        reportsModal.style.display = 'none';
    }, 300);
}

// AI Modal Logic
const aiModal = document.getElementById('aiModal');

window.openAIModal = function () {
    aiModal.style.display = 'flex';
    setTimeout(() => {
        aiModal.classList.add('show');
    }, 10);
}

window.closeAIModal = function () {
    aiModal.classList.remove('show');
    setTimeout(() => {
        aiModal.style.display = 'none';
    }, 300);
}

window.onclick = function (event) {
    if (event.target == reportsModal) {
        closeReportsModal();
    }
    if (event.target == aiModal) {
        closeAIModal();
    }
    if (event.target == imageLightbox) {
        closeImageModal();
    }
}

// Image Lightbox Logic
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImg');

window.openImageModal = function (src) {
    lightboxImg.src = src;
    imageLightbox.style.display = 'flex';
    setTimeout(() => {
        imageLightbox.classList.add('show');
    }, 10);
}

window.closeImageModal = function () {
    imageLightbox.classList.remove('show');
    setTimeout(() => {
        imageLightbox.style.display = 'none';
    }, 300);
}
