import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { MarkdownModule } from 'angular2-markdown';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: {
			animation: {
				value: 'home'
			}
		}
	},
	{
		path: 'blog',
		component: BlogComponent,
		data: {
			animation: {
				value: 'blog'
			}
		}
	}
];

@NgModule({
	declarations: [ AppComponent, HomeComponent, BlogComponent ],
	imports: [
		BrowserModule,
    	HttpClientModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		MaterialModule,
		MarkdownModule.forRoot(),
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
