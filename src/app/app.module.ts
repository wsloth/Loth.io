import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { MarkdownModule } from 'angular2-markdown';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { RoutingService } from './services/routing.service';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'blog',
		component: BlogComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	}
];

@NgModule({
	declarations: [ AppComponent, HomeComponent, BlogComponent, ContactComponent, AboutComponent ],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		MaterialModule,
		MarkdownModule.forRoot(),
		RouterModule.forRoot(routes)
	],
	providers: [ RoutingService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
