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