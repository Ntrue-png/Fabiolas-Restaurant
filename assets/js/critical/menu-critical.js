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


        // [Mantieni qui il codice dell'Header scroll e dell'Hamburger menu invariato]
    
        const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRPKlcB08JBm8NB_4Ddsm-l5Q6Qxz-LWfvavSYt18Rtd49JuYEWw7aiy7ytFRM2w-tamv9oiHec3-w/pub?output=csv';
    
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
                const response = await fetch(SHEET_URL);
                const csvText = await response.text();
                
                // Parsiamo il CSV in un oggetto organizzato per categorie
                const rows = csvText.split('\n').slice(1);
                const catMap = {};
    
                rows.forEach(row => {
                    // Regex per gestire le virgole nelle descrizioni
                    const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                    if (cols.length >= 3) {
                        const catName = cols[0].trim().replace(/"/g, '');
                        const item = {
                            name: cols[1].trim().replace(/"/g, ''),
                            price: cols[2].trim().replace(/"/g, ''),
                            description: cols[3] ? cols[3].trim().replace(/"/g, '') : ''
                        };
    
                        if (!catMap[catName]) {
                            catMap[catName] = { name: catName, items: [] };
                        }
                        catMap[catName].items.push(item);
                    }
                });
    
                const tabBar = document.getElementById('tabBar');
                const menuContainer = document.querySelector('.menu-container');
                tabBar.innerHTML = '';
                menuContainer.innerHTML = '';
    
                TAB_GROUPS.forEach((group, gi) => {
                    // 1. Creazione Tab Button
                    const btn = document.createElement('button');
                    btn.className = 'tab-btn' + (gi === 0 ? ' active' : '');
                    btn.textContent = group.label;
                    btn.dataset.tab = gi;
                    tabBar.appendChild(btn);
    
                    // 2. Creazione Panel
                    const panel = document.createElement('div');
                    panel.className = 'menu-panel' + (gi === 0 ? ' active' : '');
                    panel.dataset.tab = gi;
    
                    // 3. Generazione HTML (stessa struttura del tuo originale)
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
    
                // Re-inseriamo la logica di switching (uguale alla tua)
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
                document.querySelector('.menu-container').innerHTML = '<p>Menu momentan nicht verfügbar.</p>';
            }
        }
    
        loadMenu();
    });