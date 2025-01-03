// Gestione cookie banner
window.onload = function() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}

function rejectCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    document.getElementById('cookie-banner').style.display = 'none';
}

// Gestione animazioni eventi
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.event-description h2');
    const images = document.querySelectorAll('.event-image-wrapper');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.tagName === 'H2') {
                    entry.target.classList.add('fade-up');
                } else if (entry.target.classList.contains('event-image-wrapper')) {
                    entry.target.classList.add('slide-in');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-100px 0px'
    });

    if (title) observer.observe(title);
    if (images.length) images.forEach(img => observer.observe(img));

    // Gestione animazioni sezioni
    const observerSections = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animazione per la descrizione del ristorante
                if (entry.target.classList.contains('restaurant-description')) {
                    entry.target.classList.add('visible');
                }
                // Animazione per le immagini del menu
                if (entry.target.classList.contains('menu-image-wrapper')) {
                    entry.target.classList.add('visible');
                }
                observerSections.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    // Osserva gli elementi da animare
    const restaurantDesc = document.querySelector('.restaurant-description');
    const menuImages = document.querySelectorAll('.menu-image-wrapper');
    
    if (restaurantDesc) observerSections.observe(restaurantDesc);
    menuImages.forEach(img => observerSections.observe(img));

    // Gestione slideshow
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Nascondi tutte le slide
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.position = 'absolute';
        });
        // Mostra la slide selezionata
        slides[index].style.opacity = '1';
        slides[index].style.position = 'relative';

        // Aggiorna i pallini
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // Gestione click sui pallini
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // Ferma la rotazione automatica
            currentSlide = index;
            showSlide(currentSlide);
            startSlideshow(); // Riavvia la rotazione automatica
        });
    });

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // Cambia slide ogni 5 secondi
    }

    // Inizializza lo slideshow
    showSlide(0);
    startSlideshow();
}); 