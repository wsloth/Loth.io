import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http/http";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: 'loth-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
	public markdowncontent;
    constructor(private http:HttpClient) {}

    public ngOnInit() {
        this.http.get('/assets/blogposts/test.md', {responseType: 'text'})
            .subscribe(data => {
                this.markdowncontent = data;
            });
    }
}
