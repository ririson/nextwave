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

            const { target } = tabBtn.dataset;

            for (const btn of tabButtons) {
                btn.classList.remove('is-active');
                btn.setAttribute('aria-selected', 'false');
            }

            for (const panel of tabPanels) {
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

    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            console.log("あああ");
            const faqItem = question.closest('.faq__item');

            const isCurrentlyOpen = faqItem?.classList.contains('is-open') ?? false;

            const allFaqItems = [...document.querySelectorAll('.faq__item')];

            allFaqItems.forEach((item) => {
                item.classList.remove('is-open');

                const btn = item.querySelector('.faq__question');
                btn?.setAttribute('aria-expanded', 'false');
            });

            if (!isCurrentlyOpen) {
                faqItem.classList.add('is-open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });


});
