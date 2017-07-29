import { Component, OnInit, OnDestroy } from '@angular/core';
import ScrollMagic from 'scrollmagic';
import { Subscription } from 'rxjs/Subscription';

import { RoutingService } from '../services/routing.service';
import { AnimationService } from '../animations/animation.service';

@Component({
	selector: 'loth-contact',
	templateUrl: './contact.component.html',
	styleUrls: [ './contact.component.scss' ]
})
export class ContactComponent implements OnInit, OnDestroy {
	private scrollMagicController: ScrollMagic.Controller;
	private subscription: Subscription;

	constructor(public routingService: RoutingService, private animationService: AnimationService) {
		this.subscription = this.routingService.onTransitionOutFinished.subscribe(() => {
			this.animationService.initializeAnimations(this.scrollMagicController);
		});
	}

	ngOnInit() {
		this.scrollMagicController = new ScrollMagic.Controller({
			loglevel: 0
		});
	}

	ngOnDestroy() {
		if (this.scrollMagicController) {
			this.scrollMagicController.destroy();
		}
		this.subscription.unsubscribe();
	}
}
