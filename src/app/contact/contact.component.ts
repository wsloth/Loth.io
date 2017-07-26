import { Component, OnInit, OnDestroy } from '@angular/core';
import { Revealable } from '../shared/revealable';
import ScrollMagic from 'scrollmagic';
import { RoutingService } from '../services/routing.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'loth-contact',
	templateUrl: './contact.component.html',
	styleUrls: [ './contact.component.scss' ]
})
export class ContactComponent extends Revealable implements OnInit, OnDestroy {

    private scrollMagicController: ScrollMagic.Controller;
    private subscription: Subscription;

	constructor(public routingService: RoutingService) {
        super();
        
        this.subscription = this.routingService.onTransitionOutFinished.subscribe(() => {
            this.revealElementsOnPage(this.scrollMagicController);
        });
	}

	ngOnInit() {
        this.scrollMagicController = new ScrollMagic.Controller({
            loglevel: 0
        })
    }

    ngOnDestroy() {
        if (this.scrollMagicController) {
            this.scrollMagicController.destroy();
        }
        this.subscription.unsubscribe();
    }
}
