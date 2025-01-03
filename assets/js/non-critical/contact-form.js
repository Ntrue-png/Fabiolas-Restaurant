document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this)
            })
            .then(response => {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '0';
                
                setTimeout(() => {
                    this.style.display = 'none';
                    const thankYouMessage = document.getElementById('thankYouMessage');
                    thankYouMessage.style.display = 'block';
                    thankYouMessage.offsetHeight;
                    thankYouMessage.classList.add('visible');
                }, 500);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.');
            });
        });
    }
}); 