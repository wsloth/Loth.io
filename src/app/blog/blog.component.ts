import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loth-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
    public blogposts = [
        'test.md',
        'test.md'
    ]

}
