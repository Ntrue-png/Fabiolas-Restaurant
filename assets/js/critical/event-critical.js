// Gestione scroll e performance
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Rimuoviamo completamente la gestione dello scroll
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuItems = document.querySelectorAll('.mobile-menu li');
        const menuList = document.querySelector('.mobile-menu ul');
        
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                
                if (mobileMenu.classList.contains('active')) {
                    // Mostra il menu con animazione
                    menuList.classList.add('show-menu');
                    menuList.classList.remove('hide-menu');
                    // Anima gli elementi del menu uno dopo l'altro
                    menuItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 200 * index);
                    });
                } else {
                    // Nascondi il menu con animazione
                    menuList.classList.remove('show-menu');
                    menuList.classList.add('hide-menu');
                    // Resetta gli stili degli elementi
                    menuItems.forEach(item => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                    });
                }
            });
        }
    } catch (error) {
        console.error('Critical JS initialization error:', error);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('div[id], picture[id]');
    const navLinks = document.querySelectorAll('.section-link');
    const sectionNav = document.querySelector('.section-nav');
    const heroSection = document.querySelector('#hero');
    
    function handleSectionNav() {
        if (heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom - 100) {
                sectionNav.style.opacity = '1';
                sectionNav.style.visibility = 'visible';
            } else {
                sectionNav.style.opacity = '0';
                sectionNav.style.visibility = 'hidden';
            }
        }
    }
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.section-link[href="#${currentId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Funzione di scroll fluido
    function smoothScroll(target, duration = 1000) {
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Funzione di easing
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
    
    // Click handler con scroll fluido
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                smoothScroll(targetSection);
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Scroll handler con throttle
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleSectionNav();
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Inizializzazione
    handleSectionNav();
    updateActiveSection();
});