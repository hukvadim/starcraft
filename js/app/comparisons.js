export function comparisons() {
    // Знаходимо всі елементи з класом .img-comp-overlay і застосовуємо функцію compareImages
    document.querySelectorAll(".img-comp-overlay").forEach(compareImages);
}

function compareImages(img) {
    let clicked = false; // Стан, чи натиснуто на слайдер
    const w = img.offsetWidth, h = img.offsetHeight; // Отримуємо ширину та висоту зображення
    img.style.width = `${w / 2}px`; // Спочатку обрізаємо зображення до 50%
    
    // Створюємо слайдер
    const slider = document.createElement("DIV");
    slider.classList.add("img-comp-slider");
    img.parentElement.insertBefore(slider, img);
    
    // Встановлюємо слайдер у центр зображення
    slider.style.top = `${h / 2 - slider.offsetHeight / 2}px`;
    slider.style.left = `${w / 2 - slider.offsetWidth / 2}px`;
    
    // Додаємо події для обробки натискання миші та торкань на сенсорних пристроях
    slider.addEventListener("mousedown", () => {
        clicked = true;
        stopAnimation();
    });
    window.addEventListener("mouseup", () => clicked = false);
    slider.addEventListener("touchstart", () => {
        clicked = true;
        stopAnimation();
    });
    window.addEventListener("touchend", () => clicked = false);
    
    // Додаємо обробку переміщення слайдера при русі миші або торканні
    window.addEventListener("mousemove", e => clicked && slide(e, img, slider, w));
    window.addEventListener("touchmove", e => clicked && slide(e, img, slider, w));
    
    // Запускаємо автоматичну анімацію
    startAnimation(img, slider, w);
}

function slide(e, img, slider, w) {
    // Отримуємо позицію курсора і обмежуємо її в межах ширини зображення
    const pos = Math.max(20, Math.min(getCursorPos(e, img), w - 40));
    img.style.width = `${pos}px`; // Змінюємо ширину зображення
    slider.style.left = `${img.offsetWidth - slider.offsetWidth / 2}px`; // Переміщаємо слайдер
}

function getCursorPos(e, img) {
    e = e.changedTouches ? e.changedTouches[0] : e; // Обробка для сенсорних пристроїв
    return e.pageX - img.getBoundingClientRect().left - window.pageXOffset; // Обчислення позиції курсора
}

let animationInterval;

function startAnimation(img, slider, w) {
    let direction = 0.6;
    let pos = 300;
    
    animationInterval = setInterval(() => {
        if (pos >= w - 100 || pos <= 100) direction *= -1;
        pos += direction * 2; // Плавне переміщення
        img.style.width = `${pos}px`;
        slider.style.left = `${img.offsetWidth - slider.offsetWidth / 2}px`;
    }, 10);
}

function stopAnimation() {
    clearInterval(animationInterval);
}
