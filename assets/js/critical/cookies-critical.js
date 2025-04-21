document.addEventListener('DOMContentLoaded', () => {
    // Header scrollabile (critico per la navigazione)
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

    // Hamburger menu (critico per la navigazione mobile)
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