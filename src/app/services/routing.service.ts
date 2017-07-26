import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Location } from "@angular/common";

/**
 * Service responsible for notifying components about route changes
 * and transition states.
 * 
 * @export
 * @class RoutingService
 */
@Injectable()
export class RoutingService {
	private routeChangeSubject: Subject<any> = new Subject<any>();
	private transitionOutStartedSubject: Subject<void> = new Subject<void>();
	private transitionOutFinishedSubject: Subject<void> = new Subject<void>();

	public get onRouteChangeRequested(): Observable<any> {
		return this.routeChangeSubject.asObservable();
	}

	public get onTransitionOutStarted() : Observable<void> {
		return this.transitionOutStartedSubject.asObservable();
	}

	public get onTransitionOutFinished() : Observable<void> {
		return this.transitionOutFinishedSubject.asObservable();
	}

	constructor(private router: Router, private location: Location) {
		// When the user has pressed the back button, manually fire event
		this.location.subscribe(() => {
			// Timeout so components have a chance to initialize
			setTimeout(() => {
				this.notifyTransitionOutFinished();
			}, 250);
		});
	}

	/**
	 * Go to a new route and perform transitions.
	 * 
	 * @param {any} value 
	 * @memberof RoutingService
	 */
	public routeTo(value): void {
		this.routeChangeSubject.next(value);
	}

	/**
	 * Notify subscribers that the out transition has started.
	 * 
	 * @memberof RoutingService
	 */
	public notifyTransitionOutStarted() {
		this.transitionOutStartedSubject.next();
	}

	/**
	 * Notify subscribers that the out transition has finished.
	 * 
	 * @memberof RoutingService
	 */
	public notifyTransitionOutFinished() {
		this.transitionOutFinishedSubject.next();
	}
}
