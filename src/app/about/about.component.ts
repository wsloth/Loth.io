import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import ScrollMagic from 'scrollmagic';
import 'animation.gsap';
import { TimelineMax, TweenMax, Expo } from 'gsap';
import { RoutingService } from '../services/routing.service';
import { Subscription } from 'rxjs/Subscription';
import { Revealable } from '../shared/revealable';

@Component({
	selector: 'loth-about',
	templateUrl: './about.component.html',
	styleUrls: [ './about.component.scss' ]
})
export class AboutComponent extends Revealable implements OnInit, AfterViewInit, OnDestroy {
	private scrollMagicController: ScrollMagic.Controller;
	private subscription: Subscription;

	constructor(public routingService: RoutingService) {
		super();
	}

	ngOnInit() {
		this.subscription = this.routingService.onTransitionOutFinished.subscribe(() => {
			this.revealElementsOnPage(this.scrollMagicController);
			this.setUpAnimationsForPage(this.scrollMagicController);
		});

		this.scrollMagicController = new ScrollMagic.Controller({
			loglevel: 0
		});
	}

	ngAfterViewInit() {}

	ngOnDestroy() {
		if (this.scrollMagicController) {
			this.scrollMagicController.destroy();
		}

		this.subscription.unsubscribe();
	}

	setUpAnimationsForPage(controller: ScrollMagic.Controller) {
		let $slide1 = document.getElementById('slide-1');
		let $slide2 = document.getElementById('slide-2');

		let tl = new TimelineMax();

		let tween = tl.add([
			TweenMax.fromTo(
				$slide1,
				2.5,
				{ padding: '100px 200px 500px 200px' },
				{ padding: '100px 200px 160px 200px', ease: Expo.easeOut,  }
			)
		]);

		// Hook element up to scene
		let scene = new ScrollMagic.Scene({
			triggerElement: $slide2,
			triggerHook: 4,
			reverse: false
		})
			.setTween(tl)
			.addTo(controller);
	}
}
