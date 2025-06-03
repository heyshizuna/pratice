import { ImageValidate } from "@xwadex/fesd";

export const lazyOptionsConfig = {
	elements_selector: '.lazy:not([data-lazy-active])',
	callback_loaded: img => {
		img.setAttribute('data-lazy-active', '')
	},
	callback_error: (el) => {
		console.log("Error", el)
		el.setAttribute('src', '')
		el.setAttribute('data-src', '')
		if (el.getAttribute('src') === '') {
			new ImageValidate();
		}
	}
}