import { TimelineMax, TweenMax, Expo } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { element } from 'protractor';

/**
 * Helper class for performing TweenMax reveal fade animations
 * on elements.
 * 
 * @export
 * @class Revealable
 */
export class Revealable {
    
    public revealElementsOnPage(controller:ScrollMagic.Controller) {
		this.configureRevealSlideElements(controller);
		this.configureRevealFadeElements(controller);
	}

	private configureRevealSlideElements(controller:ScrollMagic.Controller) {
		let elementsToReveal = document.getElementsByClassName('reveal-slide');

		for (let i = 0; i < elementsToReveal.length; i++) {
			let tl = new TimelineMax();

			// Get the element data
			let $element = <HTMLElement> elementsToReveal.item(i);
			let initY = $element.clientHeight;
			let elementContent = $element.innerHTML;
			
			// Set up the new HTML structure
			$element.innerHTML = `
				<div class="reveal-slide__inner">
					<div class="reveal-slide__inner-content">${elementContent}</div>
				</div>
			`;

			let $inner = <HTMLElement> $element.getElementsByClassName('reveal-slide__inner').item(0);
			let $innerContent = <HTMLElement> $element.getElementsByClassName('reveal-slide__inner-content').item(0);

			// Make the element visible on the page
			$element.style.opacity = '1';
			$inner.style.height = `${initY + 1}px`;
			
			// Set up animation
			tl.add([
				TweenMax.fromTo(
					$element,
					1,
					{ y: initY + 10 },
					{ y: 0, ease: Expo.easeOut }
				),
				TweenMax.fromTo(
					$inner,
					1,
					{ y: -1 * (initY + 10) },
					{ y: 0, ease: Expo.easeOut }
				),
				TweenMax.fromTo(
					$innerContent,
					1,
					{ y: -1 * (initY + 10) },
					{ y: 0, ease: Expo.easeOut}
				)
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

	private configureRevealFadeElements(controller:ScrollMagic.Controller) {
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