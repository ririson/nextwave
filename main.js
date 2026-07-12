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

    const modal = document.querySelector('#js-contact-modal');
    const modalCloseBtn = document.querySelector('#js-modal-close');

    const openModalBtns = document.querySelectorAll('.js-open-modal');

    openModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.classList.add('is-show');
            modal.setAttribute('aria-hidden', 'false');

            modalCloseBtn.focus();
        });
    });

    const closeModal = () => {
        modal.classList.remove('is-show');
        modal.setAttribute('aria-hidden', 'true');
    };

    modalCloseBtn.addEventListener('click', closeModal);

    const modalOverlay = modal.querySelector('.modal__overlay');
    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape' && modal.classList.contains('is-show')) {
            closeModal();
        }
    });

    const contactForm = document.querySelector('#contact-form');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);

        const data = Object.fromEntries(formData.entries());

        console.log(`
=============================
フォーム送信データ:
  名前: ${data.name}
  メール: ${data.email}
  内容: ${data.message}
=============================
        `);

        alert('お問い合わせを受け付けました。ありがとうございます！');

        contactForm.reset();
        closeModal();
    });
});
