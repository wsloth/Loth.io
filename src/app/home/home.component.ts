import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http/http';
import { HttpClient } from '@angular/common/http';

import { TimelineMax, TweenMax, Quad, Expo } from 'gsap';
import { RoutingService } from '../services/routing.service';

@Component({
	selector: 'loth-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
	constructor(public routingService: RoutingService) {}
}
