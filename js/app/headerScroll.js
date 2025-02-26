import { header } from './elements.js';

export function headerScroll() {
	
	// Замініть .menu на ваш селектор
   if (window.scrollY > 60) {
	   header.classList.add("scroll-down");
   } else {
	   header.classList.remove("scroll-down");
   }
}