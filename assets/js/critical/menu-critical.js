document.addEventListener('DOMContentLoaded', function() {
    // Header scroll
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            main.classList.add('scrolled');
            nav.classList.add('scrolled');
        } else {
            main.classList.remove('scrolled');
            nav.classList.remove('scrolled');
        }
    });

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
    }

    // Caricamento menu (critico per la funzionalità principale della pagina)
    async function loadMenu() {
        try {
            const response = await fetch('menu-data.json');
            const data = await response.json();
            const menuContainer = document.querySelector('.menu-container');
            menuContainer.innerHTML = '';

            data.categories.forEach(category => {
                const section = document.createElement('div');
                section.className = 'menu-section';
                
                const title = document.createElement('h2');
                title.textContent = category.name;
                section.appendChild(title);

                category.items.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';

                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'item-name';
                    nameSpan.textContent = item.name;

                    const priceSpan = document.createElement('span');
                    priceSpan.className = 'item-price';
                    priceSpan.textContent = `€ ${item.price}`;

                    const description = document.createElement('div');
                    description.className = 'item-description';
                    description.textContent = item.description;

                    menuItem.appendChild(nameSpan);
                    menuItem.appendChild(priceSpan);
                    menuItem.appendChild(description);
                    section.appendChild(menuItem);
                });

                menuContainer.appendChild(section);
            });
        } catch (error) {
            console.error('Error loading menu:', error);
            document.querySelector('.menu-container').innerHTML = 
                '<p>Menu momentan nicht verfügbar. Bitte versuchen Sie es später erneut.</p>';
        }
    }

    // Carica il menu quando la pagina è pronta
    loadMenu();
}); 