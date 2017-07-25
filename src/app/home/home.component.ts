import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http/http';
import { HttpClient } from '@angular/common/http';

import { TimelineMax, TweenMax, Quad, Expo } from 'gsap';

@Component({
	selector: 'loth-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, AfterViewInit {

    public showOverlay = true;

	public ngOnInit() {}

	public ngAfterViewInit() {
		let $intro = document.getElementById('overlay-intro');
		let $blog = document.getElementById('overlay-blog');
        let $about = document.getElementById('overlay-about');
        
        setTimeout(
			() => TweenMax.fromTo($intro, 1, { x: '0%' }, { x: '100%', ease: Expo.easeIn }),
			1000
		);
		setTimeout(
			() => TweenMax.fromTo($blog, 1, { x: '0%' }, { x: '100%', ease: Expo.easeIn }),
			1250
		);
		setTimeout(
			() => TweenMax.fromTo($about, 1, { x: '0%' }, { x: '100%', ease: Expo.easeIn }),
			1500
        );
        
        setTimeout(() => this.showOverlay = false, 2500);
	}
}
