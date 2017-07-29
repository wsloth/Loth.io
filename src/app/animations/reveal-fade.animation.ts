import ScrollMagic from 'scrollmagic';
import { TweenMax, Expo, TimelineMax } from 'gsap';

import { Animation } from './animation.service';


export class RevealFadeAnimation implements Animation {

    /**
	 * Reveal Fade animation. Slides an element in from the bottom, going from
	 * opacity 0 to opacity 1.
	 */
    public animate(controller: ScrollMagic.Controller): void {
        let elementsToReveal = document.getElementsByClassName('reveal-fade');

		for (let i = 0; i < elementsToReveal.length; i++) {
			let tl = new TimelineMax();

			// Get the element data
			let element = <HTMLElement>elementsToReveal.item(i);
			let initY = element.clientHeight;

			// Set up animation (fade in from 100px bottom)
			let tween = TweenMax.fromTo(
				element,
				1,
				{ autoAlpha: 0, y: 100 },
				{ autoAlpha: 1, y: 0, ease: Expo.easeOut }
			);

			// Hook element up to scene
			let scene = new ScrollMagic.Scene({
				triggerElement: element,
				triggerHook: 1,
				reverse: false
			})
				.setTween(tween)
				.addTo(controller);
		}
    }
}