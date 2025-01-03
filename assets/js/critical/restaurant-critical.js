document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('[id="restaurant"], [id="location"], [id="info"], [id="gallery"]');
    const navLinks = document.querySelectorAll('.section-link');
    
    function getElementPosition(element) {
        let position = 0;
        while(element) {
            position += element.offsetTop - element.scrollTop + element.clientTop;
            element = element.offsetParent;
        }
        return position;
    }
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            if (!section) return;
            
            const sectionTop = getElementPosition(section);
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
    
    // Click handler con scroll fluido
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcola l'offset per centrare la sezione
                const offset = targetSection.offsetHeight > window.innerHeight ? 0 : 
                             (window.innerHeight - targetSection.offsetHeight) / 2;
                
                const position = getElementPosition(targetSection) - offset;
                
                smoothScroll(targetSection, position);
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    function smoothScroll(target, targetPosition, duration = 1000) {
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

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
    
    // Scroll handler con throttle
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Inizializzazione
    updateActiveSection();

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuList = document.querySelector('.mobile-menu ul');
    const menuItems = document.querySelectorAll('.mobile-menu li');

    if (hamburger && mobileMenu && menuList) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            if (mobileMenu.classList.contains('active')) {
                menuList.classList.remove('hide-menu');
                menuList.classList.add('show-menu');

                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 200 + (index * 100));
                });
            } else {
                menuList.classList.remove('show-menu');
                menuList.classList.add('hide-menu');

                menuItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                });
            }
        });

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                menuList.classList.remove('show-menu');
                menuList.classList.add('hide-menu');
            });
        });
    }
});