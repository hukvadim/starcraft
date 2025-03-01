import { comparisons } from './app/comparisons.js';
import { headerScroll } from './app/headerScroll.js';
import { toggleModal } from './app/modal.js';

// Слідкуємо за скором, щоб добавити до меню css клас
document.addEventListener("scroll", headerScroll);

// Запускаємо comparisons
comparisons();