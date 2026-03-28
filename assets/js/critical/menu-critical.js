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

    // ── MACRO-TAB GROUPS ──────────────────────────────────────
    const TAB_GROUPS = [
        { label: 'Cucina', categories: ['Antipasti','Primi Piatti','Secondi di Carne','Secondi di Pesce','Beilagen'] },
        { label: 'Pinse', categories: ['Pinse','Pinse Speciali'] },
        { label: 'Insalate', categories: ['Insalate'] },
        { label: 'Golfer-Karte', categories: ['Golfer-Karte','Rundenverpflegung'] },
        { label: 'Dessert', categories: ['Dessert'] },
        { label: 'Aperitivi', categories: ['Aperitivi','Analcolici'] },
        { label: 'Birreria', categories: ['La Birreria', 'ALKOHOLFREI'] },
        { label: 'Bevande', categories: ['Acqua Minerale','Bevande Analcoliche','Fruchtsäfte und Schorlen','Für die Runde','Hauswein'] },
        { label: 'Caffè & Digestivi', categories: ['La Caffetteria','Digestivi'] }
    ];

    async function loadMenu() {
        try {
            const response = await fetch('menu-data.json');
            const data = await response.json();

            const tabBar = document.getElementById('tabBar');
            const menuContainer = document.querySelector('.menu-container');
            
            tabBar.innerHTML = '';
            menuContainer.innerHTML = '';

            const catMap = {};
            data.categories.forEach(c => { catMap[c.name] = c; });

            TAB_GROUPS.forEach((group, gi) => {
                // 1. Tab Button
                const btn = document.createElement('button');
                btn.className = 'tab-btn' + (gi === 0 ? ' active' : '');
                btn.textContent = group.label;
                btn.dataset.tab = gi;
                tabBar.appendChild(btn);

                // 2. Panel
                const panel = document.createElement('div');
                panel.className = 'menu-panel' + (gi === 0 ? ' active' : '');
                panel.dataset.tab = gi;

                // 3. Generazione HTML con il separatore richiesto
                panel.innerHTML = group.categories
                    .map(catName => catMap[catName])
                    .filter(cat => cat !== undefined)
                    .map(cat => `
                        <div class="menu-section">
                            <h2 class="panel-title">${cat.name}</h2>
                            <div class="panel-divider">
                                <div class="panel-divider-dot"></div>
                            </div>
                            ${cat.items.map(item => `
                                <div class="menu-item">
                                    <div class="item-name">${item.name}</div>
                                    <div class="item-price">€ ${item.price}</div>
                                    ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    `).join('');

                menuContainer.appendChild(panel);
            });

            // ── Tab switching Logic ──
            tabBar.addEventListener('click', function(e) {
                const btn = e.target.closest('.tab-btn');
                if (!btn) return;

                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const targetPanel = menuContainer.querySelector(`.menu-panel[data-tab="${btn.dataset.tab}"]`);
                if (targetPanel) targetPanel.classList.add('active');

                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

        } catch (error) {
            console.error('Error loading menu:', error);
            document.querySelector('.menu-container').innerHTML =
                '<p>Menu momentan nicht verfügbar.</p>';
        }
    }

    loadMenu();
});