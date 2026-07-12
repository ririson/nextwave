document.addEventListener("DOMContentLoaded", () => {
    initHamburgerMenu();
    initPricingTabs();
    initFaqAccordion();
    initContactModal();
});

// 1. ハンバーガーメニュー
function initHamburgerMenu() {
    const hamburgerBtn = document.querySelector('#js-hamburger-btn');
    const navMenu = document.querySelector('#js-nav-menu');

    if (!hamburgerBtn || !navMenu) return; // 要素がなければ処理しない（Nullセーフ）

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('is-active');
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
    });
}

// 2. 料金プランタブ
function initPricingTabs() {
    const tabButtons = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    if (tabButtons.length === 0) return;

    tabButtons.forEach((tabBtn) => {
        tabBtn.addEventListener('click', () => {
            const { target } = tabBtn.dataset;

            tabButtons.forEach(btn => {
                btn.classList.remove('is-active');
                btn.setAttribute('aria-selected', 'false');
            });

            tabPanels.forEach(panel => {
                panel.classList.add('is-hidden');
                panel.setAttribute('aria-hidden', 'true');
            });

            tabBtn.classList.add('is-active');
            tabBtn.setAttribute('aria-selected', 'true');

            const targetPanel = document.querySelector(`#plan-${target}`);
            if (targetPanel) {
                targetPanel.classList.remove('is-hidden');
                targetPanel.setAttribute('aria-hidden', 'false');
            }
        });
    });
}

// 3. FAQアコーディオン
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq__question');

    if (faqQuestions.length === 0) return;

    faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq__item');
            if (!faqItem) return;

            const isCurrentlyOpen = faqItem.classList.contains('is-open');
            const allFaqItems = document.querySelectorAll('.faq__item');

            allFaqItems.forEach((item) => {
                item.classList.remove('is-open');
                const btn = item.querySelector('.faq__question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            if (!isCurrentlyOpen) {
                faqItem.classList.add('is-open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// 4. お問い合わせモーダルとフォーム
function initContactModal() {
    const modal = document.querySelector('#js-contact-modal');
    const openModalBtns = document.querySelectorAll('.js-open-modal');
    const contactForm = document.querySelector('#contact-form');

    if (!modal) return;

    const modalCloseBtn = modal.querySelector('#js-modal-close');
    const modalOverlay = modal.querySelector('.modal__overlay');

    const closeModal = () => {
        modal.classList.remove('is-show');
        modal.setAttribute('aria-hidden', 'true');
    };

    // 開く処理
    openModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.classList.add('is-show');
            modal.setAttribute('aria-hidden', 'false');
            if (modalCloseBtn) modalCloseBtn.focus();
        });
    });

    // 閉じる処理
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-show')) {
            closeModal();
        }
    });

    // フォーム送信処理
    if (contactForm) {
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
    }
}
