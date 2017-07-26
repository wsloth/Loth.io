import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http/http';
import { HttpClient } from '@angular/common/http';
import ScrollMagic from 'scrollmagic';
import { TimelineMax, TweenMax, Quad, Expo } from 'gsap';
import { RoutingService } from '../services/routing.service';
import { Revealable } from '../shared/revealable';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'loth-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent extends Revealable implements OnInit, OnDestroy {
	private scrollMagicController: ScrollMagic.Controller;
	private transitionFinishedSubscription: Subscription;

	constructor(public routingService: RoutingService) {
		super();
	}

	ngOnInit() {
		this.scrollMagicController = new ScrollMagic.Controller({
			loglevel: 0
		});

		this.transitionFinishedSubscription = this.routingService.onTransitionOutFinished.subscribe(() => {
			this.revealElementsOnPage(this.scrollMagicController);
		});
	}

	ngOnDestroy() {
		if (this.scrollMagicController) {
			this.scrollMagicController.destroy();
		}

		this.transitionFinishedSubscription.unsubscribe();
	}
}
