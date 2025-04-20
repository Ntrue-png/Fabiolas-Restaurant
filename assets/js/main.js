// Invece di usare import
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    // Inizializza le funzionalità
    if (typeof initSlideshow === 'function') initSlideshow();
    if (typeof initAnimations === 'function') initAnimations();
    if (typeof initMobileMenu === 'function') initMobileMenu();

    const main = document.querySelector('main');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            main.classList.add('scrolled');
        } else {
            main.classList.remove('scrolled');
        }
    });
});

// Aggiungi questo al tuo JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.initial-overlay');
    
    // Controlla se l'utente ha già fatto una scelta
    if (!sessionStorage.getItem('choiceMade')) {
        overlay.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
    }

    // Gestisci i click sui bottoni
    document.querySelectorAll('.card-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sessionStorage.setItem('choiceMade', 'true');
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        });
    });
});// Aggiungi questo al JavaScript esistente
document.querySelector('.close-overlay').addEventListener('click', () => {
    const overlay = document.querySelector('.initial-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
    
    // Opzionale: memorizza la scelta per non mostrare più l'overlay
    sessionStorage.setItem('choiceMade', 'true');
});