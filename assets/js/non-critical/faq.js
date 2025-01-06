document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const answer = button.nextElementSibling;

            // Chiudi tutte le FAQ aperte
            faqButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    const otherAnswer = otherButton.nextElementSibling;
                    if (otherAnswer.style.maxHeight) {
                        otherAnswer.style.maxHeight = '0px'; // Chiudi le altre FAQ
                        otherAnswer.style.overflow = 'hidden';
                        otherButton.setAttribute('aria-expanded', 'false');
                        otherAnswer.setAttribute('aria-hidden', 'true');
                        otherButton.classList.remove('active');
                        otherAnswer.classList.remove('active');
                        const icon = otherButton.querySelector('.faq-icon');
                        icon.textContent = '+'; // Ripristina l'icona delle altre FAQ
                    }
                }
            });

            // Se la risposta è già espansa, la chiudiamo, altrimenti la apriamo
            setTimeout(() => {
                if (isExpanded) {
                    answer.style.maxHeight = '0px'; // Collassa la risposta
                } else {
                    const fullHeight = answer.scrollHeight;
                    answer.style.maxHeight = `${fullHeight + 20}px`; // Espandi la risposta
                }
                answer.style.overflow = 'hidden'; // Ripristina overflow

                // Aggiorna attributi ARIA e classi
                button.setAttribute('aria-expanded', !isExpanded);
                answer.setAttribute('aria-hidden', isExpanded);
                button.classList.toggle('active', !isExpanded);
                answer.classList.toggle('active', !isExpanded);

                // Aggiorna l'icona
                const icon = button.querySelector('.faq-icon');
                icon.textContent = isExpanded ? '+' : '-';

                // Debug finale
                console.log("Stato finale:", {
                    maxHeight: answer.style.maxHeight,
                    isExpanded: !isExpanded,
                });
            }, 10); // Timeout di 10 ms per forzare l'aggiornamento del layout
        });

        button.addEventListener('keydown', (e) => {
            if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                button.click();
            }
        });
    });
});
