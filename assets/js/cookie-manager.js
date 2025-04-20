function acceptCookies() {
    // Salva la preferenza dell'utente
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Nascondi il banner
    document.getElementById('cookie-banner').style.display = 'none';
}

function rejectCookies() {
    // Salva la preferenza dell'utente
    localStorage.setItem('cookiesAccepted', 'false');
    
    // Nascondi il banner
    document.getElementById('cookie-banner').style.display = 'none';
}

// Controlla se l'utente ha già fatto una scelta
document.addEventListener('DOMContentLoaded', () => {
    const cookieChoice = localStorage.getItem('cookiesAccepted');
    
    // Se l'utente non ha ancora fatto una scelta, mostra il banner
    if (cookieChoice === null) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
}); 