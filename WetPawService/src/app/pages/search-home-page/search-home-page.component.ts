import { Component, OnInit } from '@angular/core';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/post.service';

@Component({
  selector: 'app-search-home-page',
  templateUrl: './search-home-page.component.html',
  styleUrls: ['./search-home-page.component.scss']
})
export class SearchHomePageComponent implements OnInit {

  post: Post;
  postsEven: Post[] = [];
  postNotEven: Post[] = [];
  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getByCategory('Ищут Дом').subscribe((posts: Post[]) => {
      for (let i = 0; i <= posts.length - 1; i++) {
        if (i % 2 === 0) {
          this.post = posts[i];
          this.postsEven.push(this.post);
        } else {
          this.post = posts[i];
          this.postNotEven.push(this.post);
        }
      }
    });
  }

}
