import { Component, AfterViewInit, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TweenMax, Expo } from 'gsap';
import { RoutingService } from './services/routing.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'loth-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
	public showOverlay: boolean = true;
	private subscription: Subscription;

	constructor(private routingService: RoutingService, private cdRef: ChangeDetectorRef) {}

	public ngOnInit(): void {
		this.subscription = this.routingService.onRouteChangeRequested.subscribe(async (val) => {
			console.log(val);
			await this.performTransition();
			this.animateTransitionOut();
		});
	}

	public ngAfterViewInit() {
		this.animateTransitionOut();
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private async performTransition() {
		this.showOverlay = true;
		this.cdRef.detectChanges();
		await Promise.resolve(null);
	}
	private animateTransitionOut() {
		let $left = document.getElementById('overlay-left');
		let $middle = document.getElementById('overlay-middle');
		let $right = document.getElementById('overlay-right');

		setTimeout(() => TweenMax.fromTo($left, 1, { x: '0%' }, { x: '100%', ease: Expo.easeIn }), 1000);
		setTimeout(() => TweenMax.fromTo($middle, 1, { x: '0%' }, { x: '100%', ease: Expo.easeIn }), 1150);
		setTimeout(() => TweenMax.fromTo($right, 1, { x: '0%' }, { x: '100%', ease: Expo.easeIn }), 1300);

		setTimeout(() => (this.showOverlay = false), 2300);
	}
}
