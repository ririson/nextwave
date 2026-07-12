document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.querySelector('#js-hamburger-btn');
    const navMenu = document.querySelector('#js-nav-menu');

    hamburgerBtn.addEventListener('click', () => {

        navMenu.classList.toggle('is-active');

        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
    });

});
