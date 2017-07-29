import { Injectable } from '@angular/core';
import ScrollMagic from 'scrollmagic';
import { RevealFadeAnimation } from './reveal-fade.animation';
import { RevealSlideAnimation } from './reveal-slide.animation';

/**
 * Represents a reusable animation which can be used on multiple pages.
 */
export abstract class Animation {
	public abstract animate(controller: ScrollMagic.Controller): void;
}

/**
 * Service for controlling animations on page. The reason this is a service
 * and not a directive, is that we have more control over the animation timings
 * using this service. 
 * 
 * @export
 * @class AnimationService
 */
@Injectable()
export class AnimationService {
	/**
	 * Array of reusable animations available in this application.
	 */
	private animations: Animation[] = [
        new RevealSlideAnimation(),
        new RevealFadeAnimation() 
    ];

	/**
     * Initialize all reusable animations that exist on multiple pages.
     * Call this function when the router has just loaded a page, and the
     * out transition animation has started.
     */
	public initializeAnimations(controller: ScrollMagic.Controller) {
		for (let animation of this.animations) {
			animation.animate(controller);
		}
	}
}
