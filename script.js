document.addEventListener('DOMContentLoaded', () => {
    
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        });
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    const revealElements = document.querySelectorAll('.reveal');
    const handleReveal = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    const navbar = document.getElementById('navbar');
    const handleNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    const navLinks = document.querySelectorAll('a[href^="#"]');

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    function smoothScroll(targetEl, duration) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const nextScroll = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, nextScroll);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        requestAnimationFrame(animation);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                smoothScroll(targetSection, 1200);
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const handleActiveLink = () => {
        let scrollPosition = window.scrollY + 150;
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('text-brand-gold');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('text-brand-gold');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleReveal();
        handleNavbar();
        handleActiveLink();
    });

    handleReveal();
    handleNavbar();
});