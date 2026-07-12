document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.querySelector('#js-hamburger-btn');
    const navMenu = document.querySelector('#js-nav-menu');

    hamburgerBtn.addEventListener('click', () => {

        navMenu.classList.toggle('is-active');

        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
    });

    const tabButtons = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    tabButtons.forEach((tabBtn) => {
        tabBtn.addEventListener('click', () => {

            console.log("あああ");
            const { target } = tabBtn.dataset;

            for (const btn of tabButtons) {
                btn.classList.remove('is-active');
                btn.setAttribute('aria-selected', 'false');
            }

            for (const panel of tabPanels) {
                console.log(panel);
                panel.classList.add('is-hidden');
                panel.setAttribute('aria-hidden', 'true');
            }

            tabBtn.classList.add('is-active');
            tabBtn.setAttribute('aria-selected', 'true');

            const targetPanel = document.querySelector(`#plan-${target}`);

            targetPanel?.classList.remove('is-hidden');
            targetPanel?.setAttribute('aria-hidden', 'false');
        });
    });


});
