document.addEventListener('DOMContentLoaded', () => {
    // Selettori per menu e events section
    const menuTitle = document.querySelector('.menu-title');
    const eventsTitle = document.querySelector('.events-title');
    const menuLinkContainer = document.querySelector('.menu-link-container');
    const menuBackgrounds = document.querySelectorAll('.menu-background');
    

    // Selettori per contact-info-section
    const infoText = document.querySelector('.contact-info-text');
    const imageWrappers = document.querySelectorAll('.contact-image-wrapper');
    const parallaxImages = document.querySelectorAll('.parallax-img');

    // Selettori per philosophy e terrace animations
    const animatedElements = document.querySelectorAll('.animate-left, .animate-right');

    

    // Configurazione Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    // Observer per tutti gli elementi
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('menu-link-container')) {
                    entry.target.classList.add('animate');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Osserva gli elementi
    [menuTitle, eventsTitle, menuLinkContainer, infoText, ...imageWrappers].forEach(element => {
        if (element) observer.observe(element);
    });

    // Osserva gli elementi animati
    animatedElements.forEach(element => observer.observe(element));

    // Parallax per menu-background e immagini
    window.addEventListener('scroll', () => {
        // Parallax per menu backgrounds
        menuBackgrounds.forEach((background, index) => {
            const parent = background.closest('.menu-item');
            if (!parent) return;
            
            const parentRect = parent.getBoundingClientRect();
            
            if (parentRect.top < window.innerHeight && parentRect.bottom > 0) {
                const direction = index % 2 === 0 ? 1 : -1;
                const speed = 0.3;
                const xPos = window.pageYOffset * speed * direction;
                background.style.transform = `translateX(${xPos}px)`;
            }
        });

        // Parallax contenuto per contact-info images
        parallaxImages.forEach(img => {
            const wrapper = img.closest('.contact-image-wrapper');
            if (!wrapper) return;

            const wrapperRect = wrapper.getBoundingClientRect();
            
            if (wrapperRect.top < window.innerHeight && wrapperRect.bottom > 0) {
                const speed = 0.1;
                const scrollPosition = window.pageYOffset;
                const offsetTop = wrapper.offsetTop;
                const scrollRelative = (scrollPosition - offsetTop) * speed;
                
                const maxMove = 20;
                const yPos = Math.max(-maxMove, Math.min(maxMove, scrollRelative));
                
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}); 