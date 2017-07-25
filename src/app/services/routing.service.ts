import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoutingService {
	private subject: Subject<any> = new Subject<any>();

	public get onRouteChangeRequested(): Observable<any> {
		return this.subject.asObservable();
	}

	constructor(private router: Router) {}

	public go(value): void {
		this.subject.next(value);
	}
}
