import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import ScrollMagic from 'scrollmagic';
import { TimelineMax, TweenMax, Expo } from 'gsap';

@Component({
	selector: 'loth-about',
	templateUrl: './about.component.html',
	styleUrls: [ './about.component.scss' ]
})
export class AboutComponent implements OnInit, AfterViewInit {

    private scrollMagicController: any;

	constructor() {}

	ngOnInit() {
        this.scrollMagicController = new ScrollMagic.Controller({
            loglevel: 0
        });
    }
    
    ngAfterViewInit() {
        let elementsToReveal = document.getElementsByClassName('reveal');
        console.log('elements found', elementsToReveal);


        const tl = new TimelineMax();
        tl.addLabel('revealText');

        const lineTweens = [];

        for (let i = 0; i < elementsToReveal.length; i++) {
            const element = elementsToReveal.item(i);

            // Set the new element content
            let content = element.innerHTML;
            element.innerHTML = `
            <div class="reveal-text">
                ${content}
                <div class="reveal-text__line">${content}</div>
            </div>`

            const params = { percentage: 0 };

            const tween = TweenMax.fromTo(params, 2, { percentage: 0 }, { delay: (i * 0.8), percentage: 100, ease: Expo.easeOut, onUpdate: () => {
                // $line.addClass('visible');
                TweenMax.set(element, { webkitClipPath: `polygon(0% 100%, ${params.percentage}% 100%, ${params.percentage}% 0%, 0% 0%` });
            }}, 'revealText')

            lineTweens.push(tween); 
        }

        tl.add(lineTweens, 'revealText');

            
		const scene = new ScrollMagic.Scene({
			triggerElement: document.getElementById('about'),
			reverse: false
        })
        .setTween(tl)
        .addTo(this.scrollMagicController);
        
        console.log(scene);
    }
}
