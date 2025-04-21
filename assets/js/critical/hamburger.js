document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuList = document.querySelector('.mobile-menu ul');
    const menuItems = document.querySelectorAll('.mobile-menu li');

    console.log('Elementi trovati:', {
        hamburger: hamburger,
        mobileMenu: mobileMenu,
        menuList: menuList,
        menuItems: menuItems
    });

    hamburger.addEventListener('click', function() {
        console.log('Click su hamburger');
        // Toggle delle classi per l'hamburger e il menu
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        console.log('Stato menu:', {
            hamburgerActive: this.classList.contains('active'),
            mobileMenuActive: mobileMenu.classList.contains('active')
        });

        if (mobileMenu.classList.contains('active')) {
            // Mostra il menu
            menuList.classList.remove('hide-menu');
            menuList.classList.add('show-menu');

            // Anima ogni voce del menu con un ritardo progressivo
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 200 + (index * 100));
            });
        } else {
            // Nascondi il menu
            menuList.classList.remove('show-menu');
            menuList.classList.add('hide-menu');

            // Resetta le animazioni delle voci del menu
            menuItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
            });
        }
    });

    // Chiudi il menu quando si clicca su un link
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuList.classList.remove('show-menu');
            menuList.classList.add('hide-menu');
        });
    });
}); 