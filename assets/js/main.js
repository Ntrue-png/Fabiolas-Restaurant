
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
   
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


document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.initial-overlay');
    

    if (!sessionStorage.getItem('choiceMade')) {
        overlay.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
    }

   
    document.querySelectorAll('.card-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sessionStorage.setItem('choiceMade', 'true');
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        });
    });
});
const closeBtn = document.querySelector('.close-overlay');
const overlay = document.querySelector('.initial-overlay');


if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
        
       
        sessionStorage.setItem('choiceMade', 'true');
    });
}