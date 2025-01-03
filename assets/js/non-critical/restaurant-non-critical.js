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

document.addEventListener('DOMContentLoaded', () => {
    // Selezioniamo solo l'immagine destra
    const rightImage = document.querySelector('.vertical-img.right');
    
    // Variabili per il controllo del parallax
    let initialRightImagePosition = 130;
    let scrollPosition = 0;
    
    // Funzione per gestire lo scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Effetto per l'immagine destra
        if (rightImage) {
            if (currentScroll > scrollPosition) {
                // Scrollando verso il basso
                const parallaxRate = 0.2;
                const moveAmount = currentScroll * parallaxRate;
                rightImage.style.transform = `translateY(-${moveAmount}px)`;
            } else {
                // Scrollando verso l'alto
                rightImage.style.transform = `translateY(-${Math.max(0, currentScroll * 0.2)}px)`;
            }
        }
        
        scrollPosition = currentScroll;
    }, { passive: true });
});


