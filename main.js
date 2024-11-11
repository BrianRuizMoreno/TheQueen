document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show');
        this.classList.toggle('active');
    });

    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const propuesta = this.closest('.propuesta');
            propuesta.classList.toggle('expanded');
            this.textContent = propuesta.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for animation on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-card, .propuesta, .menu-section').forEach(el => {
        animateOnScroll.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Auto-play TikTok videos
    const tiktokVideos = document.querySelectorAll('.tiktok-video');
    tiktokVideos.forEach(video => {
        const iframe = video.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src.replace('&autoplay=0', '&autoplay=1');
        }
    });

    const toggleInfoButtons = document.querySelectorAll('.toggle-info');

    toggleInfoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cocktailInfo = this.nextElementSibling;
            if (cocktailInfo.style.display === 'block') {
                cocktailInfo.style.display = 'none';
                this.textContent = '+';
                this.setAttribute('aria-label', 'Ver ingredientes');
            } else {
                cocktailInfo.style.display = 'block';
                this.textContent = '-';
                this.setAttribute('aria-label', 'Ocultar ingredientes');
            }
        });
    });

    const dropdownToggle = document.querySelector('nav ul li a[href="#nuestraspropuestas"]');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('show');
            }
        });

        // Cerrar el menú desplegable al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (!dropdownToggle.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
});
