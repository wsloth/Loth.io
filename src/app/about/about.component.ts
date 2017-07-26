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
		this.subscription = this.routingService.onTransitionOutFinished.subscribe(() =>
			this.revealElementsOnPage(this.scrollMagicController)
		);

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
}
