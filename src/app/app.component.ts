import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { query, style, group, animate, trigger, transition, stagger } from '@angular/animations';
import { MdSidenav } from "@angular/material";

const fadeTransition = [
	query(':leave', style({ display: 'none' })),
	query(':enter', style({ display: 'inherit' })),

	group([
		query(':leave', animate('1s', style({ opacity: 0 }))),
		query(':enter', animate('1s', style({ opacity: 1 })))
	])
];

@Component({
	selector: 'loth-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	animations: [
		trigger('routerAnimations', [
			transition('blog => home', fadeTransition),
			transition('home => blog', fadeTransition)
		])
	]
})
export class AppComponent implements OnInit {

	@ViewChild('sidenav') private sidenav:MdSidenav;

	ngOnInit(): void {
		console.log(this.sidenav);
		this.sidenav.open();
	}
	constructor(public router: Router) { }

	prepareRouteAnimation(r: RouterOutlet) {
		const animation = r.activatedRouteData['animation'];
		const value = animation ? animation['value'] : null;
		return value;
	}
}
