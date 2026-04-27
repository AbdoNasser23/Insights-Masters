// Remove Loader on Page Load
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
});

// Scroll Effects (Navbar & Reveal)
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    
    // Navbar change on scroll
    if (window.scrollY > 80) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Fire reveal animations
    handleReveal();
});

// Theme Toggle Functionality (Dark Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initialize theme from storage
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Element Reveal Logic (ScrollReveal clone)
function handleReveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100; // Trigger slightly earlier for better feeling

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

// Initial Reveal Check (on case already scrolled down on load)
handleReveal();

// Smooth Anchoring for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 10, // Adjust slightly for navbar height
                behavior: 'smooth'
            });
        }
    });
});