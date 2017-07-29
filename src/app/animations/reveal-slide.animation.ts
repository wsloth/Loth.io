import ScrollMagic from 'scrollmagic';
import { TweenMax, Expo, TimelineMax } from 'gsap';

import { Animation } from './animation.service';


export class RevealSlideAnimation implements Animation {

    /**
	 * Reveal slide animation. Initially the element being animated will be invisible,
	 * and it will slide in from the top. The difference with Reveal Fade is that this
	 * animation slides in from the top with an overflow set to hidden, making it appear
	 * out of thin air, giving a cool effect.
	 */
	public animate(controller: ScrollMagic.Controller): void {
		let elementsToReveal = document.getElementsByClassName('reveal-slide');

		for (let i = 0; i < elementsToReveal.length; i++) {
			let tl = new TimelineMax();

			// Get the element data
			let $element = <HTMLElement>elementsToReveal.item(i);
			let initY = $element.clientHeight;
			let elementContent = $element.innerHTML;

			// Set up the new HTML structure
			$element.innerHTML = `
				<div class="reveal-slide__inner">
					<div class="reveal-slide__inner-content">${elementContent}</div>
				</div>
			`;

			let $inner = <HTMLElement>$element.getElementsByClassName('reveal-slide__inner').item(0);
			let $innerContent = <HTMLElement>$element.getElementsByClassName('reveal-slide__inner-content').item(0);

			// Make the element visible on the page
			$element.style.opacity = '1';
			$inner.style.height = `${initY + 5}px`;

			// Set up animation
			tl.add([
				TweenMax.fromTo($element, 1, { y: initY + 10 }, { overflow: 'inherit', y: 0, ease: Expo.easeOut }),
				TweenMax.fromTo($inner, 1, { y: -1 * (initY + 10) }, { y: 0, ease: Expo.easeOut }),
				TweenMax.fromTo($innerContent, 1, { y: -1 * (initY + 10) }, { y: 0, ease: Expo.easeOut })
			]);

			// Hook element up to scene
			let scene = new ScrollMagic.Scene({
				triggerElement: $element,
				triggerHook: 1,
				reverse: false
			})
				.setTween(tl)
				.addTo(controller);
		}
	}
}
