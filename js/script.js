const bodyHtml = document.querySelector('body');
const modalHtml = document.querySelector('.modal');
const modalIframe = document.querySelector('.modal iframe');
const btnListVideoPlay = document.querySelectorAll('[data-modal-video]');


// Функція для показу модального вікна з відео
function setModalVideo(event) {
	
	// Додаємо в body клас, щоб показати модальне вікно
	bodyHtml.classList.add('modal-show');

	// Також добавляємо клас на модалку, щоб її показати
	modalHtml.classList.add('active');

	// Відбираємо дані про відео
	const videoId = event.target.getAttribute('data-modal-video');
	console.log("videoId: ", videoId);
	
	// Поміщаємо помилання в iframe
	modalIframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1');
}

// Перебираємо всі кнопки за якими потрібно слідкувати
if (btnListVideoPlay) {	
	btnListVideoPlay.forEach(element => {
		
		// Слідкуємо за кліком поточної кнопки
		element.onclick = setModalVideo;
	});
}

// Слідкуємо за кліком по модальному вікні, щоб його приховати
modalHtml.onclick = () => {
	modalHtml.classList.remove('active');
	bodyHtml.classList.remove('modal-show');
	modalIframe.removeAttribute('src');
}