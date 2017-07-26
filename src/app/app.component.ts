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

	constructor(private router: Router, private routingService: RoutingService, private cdRef: ChangeDetectorRef) {}

	public ngOnInit(): void {
		// Set up subscription to listen to router change requests
		this.subscription = this.routingService.onRouteChangeRequested.subscribe(route => this.transitionToRoute(route));
	}

	private async transitionToRoute(route:string[]) {
		// Start the "in" transition and continue when the whole screen is filled
		await this.animateTransitionIn();

		// Perform the actual routing action
		await this.router.navigate([route]);

		// Notify other components that the "out" transition has started
		this.routingService.notifyTransitionOutStarted();

		// Start the "out" transition and continue when finished
		await this.animateTransitionOut();

		// Notify other components that the "out" transition has finished
		this.routingService.notifyTransitionOutFinished();
	}

	/**
	 * When the page has initially loaded, use the Out transition to
	 * initially reveal the webpage.
	 * 
	 * @memberof AppComponent
	 */
	public ngAfterViewInit() {
		this.animateTransitionOut();
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private async animateTransitionIn() {
		this.showOverlay = true;
		this.cdRef.detectChanges();
		await Promise.resolve(null);

		return new Promise((resolve, reject) => {
			let $left = document.getElementById('overlay-left');
			let $middle = document.getElementById('overlay-middle');
			let $right = document.getElementById('overlay-right');

			$left.style.backgroundColor = 'transparent';
			$middle.style.backgroundColor = 'transparent';
			$right.style.backgroundColor = 'transparent';

			setTimeout(() => TweenMax.fromTo($left, 1, { backgroundColor: '#fff', x: '-100%' }, { x: '0%', ease: Expo.easeOut }), 0);
			setTimeout(() => TweenMax.fromTo($middle, 1, { backgroundColor: '#fff', x: '-100%' }, { x: '0%', ease: Expo.easeOut }), 200);
			setTimeout(() => TweenMax.fromTo($right, 1, { backgroundColor: '#fff', x: '-100%' }, { x: '0%', ease: Expo.easeOut }), 400);

			setTimeout(() => {
				// notify that the "in" transition is done
				resolve();

				// Start the "out" transition
				this.animateTransitionOut();
			}, 1400);
		});
	}
	private async animateTransitionOut() {
		return new Promise((resolve, reject) => {
			let $left = document.getElementById('overlay-left');
			let $middle = document.getElementById('overlay-middle');
			let $right = document.getElementById('overlay-right');

			TweenMax.fromTo($left, 1.5, { backgroundColor: '#fff' }, { backgroundColor: '#252525', ease: Expo.easeIn });
			TweenMax.fromTo($middle, 1.5, { backgroundColor: '#fff' }, { backgroundColor: '#252525', ease: Expo.easeIn });
			TweenMax.fromTo($right, 1.5, { backgroundColor: '#fff' }, { backgroundColor: '#252525', ease: Expo.easeIn });

			
			setTimeout(() => TweenMax.fromTo($left, 0.7, { x: '0%' }, { x: '100%', ease: Expo.easeIn }), 1000);
			setTimeout(() => TweenMax.fromTo($middle, 0.7, { x: '0%' }, { x: '100%', ease: Expo.easeIn }), 1100);
			setTimeout(() => TweenMax.fromTo($right, 0.7, { x: '0%' }, { x: '100%', ease: Expo.easeIn }), 1150);

			setTimeout(() => {
				this.showOverlay = false;

				// Notify that the "out" transition finished
				resolve();
			}, 2150);
		});
	}
}
