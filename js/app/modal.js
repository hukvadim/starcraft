import { bodyHtml, listBtnModals } from './elements.js';

// Додаємо обробник кліків для кнопок модалок, якщо вони існують
listBtnModals?.forEach(btn => btn.addEventListener('click', toggleModal));

// Функція для відкриття/закриття модального вікна
export function toggleModal(e) {
    e.preventDefault();
    
    // Отримуємо id модального вікна з data-атрибута кнопки
    const modalType = e.target.dataset.modalToggle;
    const modalCurrent = document.getElementById(modalType);
    if (!modalCurrent) return;
    
    // Перевіряємо, чи модальне вікно вже відкрите
    const isVisible = modalCurrent.classList.contains('active');
    
    // Перемикаємо клас "active" у модального вікна
    modalCurrent.classList.toggle('active');
    
    // Додаємо або видаляємо клас "modal-show" у body
    bodyHtml.classList.toggle('modal-show', !isVisible);
    
    // Викликаємо додаткові дії при відкритті або закритті модалки
    handleModalActions(modalType, modalCurrent, e.target, isVisible ? 'close' : 'open');
}

// Функція для виконання додаткових дій при відкритті/закритті модалки
function handleModalActions(modalType, modalBox, triggerElement, action) {
    const actions = {
        'modal-video-iframe': setModalIframe, // Обробка відео-модалки
        'modal-feedback': () => {} // Додатковий функціонал можна додати тут
    };
    
    // Викликаємо відповідну функцію, якщо вона існує
    actions[modalType]?.(action, modalBox, triggerElement);
}

// Функція для роботи з iframe у модальному вікні
function setModalIframe(action, modal, triggerElement) {
    const modalIframe = modal.querySelector('iframe');
    if (!modalIframe) return;
    
    if (action === 'close') {
        // При закритті очищуємо src, щоб зупинити відео
        modalIframe.removeAttribute('src');
    } else if (action === 'open') {
        // При відкритті отримуємо id відео та встановлюємо посилання
        const videoId = triggerElement.dataset.modalVideo;
        modalIframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&vq=720`);
    }
}
