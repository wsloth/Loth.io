import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http/http';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import ScrollMagic from 'scrollmagic';
import { TimelineMax, TweenMax, Quad, Expo } from 'gsap';

import { RoutingService } from '../services/routing.service';
import { AnimationService } from '../animations/animation.service';

@Component({
	selector: 'loth-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy {
	private scrollMagicController: ScrollMagic.Controller;
	private transitionFinishedSubscription: Subscription;

	constructor(public routingService: RoutingService, private animationService: AnimationService) {}

	ngOnInit() {
		this.scrollMagicController = new ScrollMagic.Controller({
			loglevel: 0
		});

		this.transitionFinishedSubscription = this.routingService.onTransitionOutFinished.subscribe(() => {
			this.animationService.initializeAnimations(this.scrollMagicController);
		});
	}

	ngOnDestroy() {
		if (this.scrollMagicController) {
			this.scrollMagicController.destroy();
		}

		this.transitionFinishedSubscription.unsubscribe();
	}
}
