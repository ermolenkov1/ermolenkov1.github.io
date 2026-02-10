// Импорт PhotoSwipe
import PhotoSwipeLightbox from './photoswipe/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#profile-gallery',
    children: 'a',
    pswpModule: () => import('./photoswipe/photoswipe.esm.js'),
    bgOpacity: 1,
    padding: { top: 80, bottom: 40, left: 10, right: 10 },
    showHideAnimationType: 'zoom',
    showAnimationDuration: 260,
    hideAnimationDuration: 260,
    useContentPlaceholder: false
});

lightbox.on('uiRegister', function () {
    lightbox.pswp.ui.registerElement({
        name: 'setka-topbar',
        order: 9,
        isButton: false,
        appendTo: 'root',
        html: `
            <div class="setka-ui-container">
                <div class="setka-ui-inner">
                <div class="setka-counter">1 из 1</div>
                <div class="setka-close">
                    <svg viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </div>
            </div>`,
        onInit: (el, pswp) => {
            const counterEl = el.querySelector('.setka-counter');
            const closeBtn = el.querySelector('.setka-close');
            const updateCounter = () => {
                counterEl.textContent = `${pswp.currIndex + 1} из ${pswp.getNumItems()}`;
            };
            updateCounter();
            pswp.on('change', updateCounter);
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                pswp.close();
            });
        }
    });
});

lightbox.init();

// Скрытие аватара при открытии галереи
lightbox.on('open', () => {
    const img = document.getElementById('avatar-img');
    if (img) img.style.visibility = 'hidden';
});
lightbox.on('close', () => {
    const img = document.getElementById('avatar-img');
    if (img) img.style.visibility = '';
});

// Иконки Lucide
lucide.createIcons();

// Модальное окно контактов
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = modal ? modal.querySelector('button') : null; // Выбираем кнопку закрытия (единственная кнопка в модалке)

    if (closeBtn) closeBtn.removeAttribute('onclick'); // Удаляем старый onclick, если есть

    const openModal = () => {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Modal opened'); // Для отладки
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            console.log('Modal closed'); // Для отладки
        }
    };

    // Слушатель на кнопку "Написать"
    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    // Слушатель на кнопку "X" (закрыть)
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Закрытие по клику на фон
    if (modal) {
        modal.addEventListener('click', (e) => { 
            if (e.target === modal) closeModal(); 
        });
    }

    // Экспортируем в window на всякий случай
    window.openModal = openModal;
    window.closeModal = closeModal;
});

// Карусель карьеры
const container = document.getElementById('carousel-container');
const leftBtn = document.getElementById('left-arrow');
const rightBtn = document.getElementById('right-arrow');

const updateArrows = () => {
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    if (leftBtn) leftBtn.style.opacity = scrollLeft <= 10 ? "0.3" : "1";
    if (rightBtn) rightBtn.style.opacity = scrollLeft + clientWidth >= scrollWidth - 10 ? "0.3" : "1";
};

if (leftBtn && rightBtn && container) {
    leftBtn.addEventListener('click', () => { container.scrollBy({ left: -200, behavior: 'smooth' }); });
    rightBtn.addEventListener('click', () => { container.scrollBy({ left: 200, behavior: 'smooth' }); });
    container.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('load', updateArrows);
}