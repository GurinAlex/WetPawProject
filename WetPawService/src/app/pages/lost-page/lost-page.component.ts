import { Component, OnInit } from '@angular/core';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/post.service';

@Component({
  selector: 'app-lost-page',
  templateUrl: './lost-page.component.html',
  styleUrls: ['./lost-page.component.scss']
})
export class LostPageComponent implements OnInit {

  post: Post;
  postsEven: Post[] = [];
  postNotEven: Post[] = [];
  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getByCategory('Потерявшиеся').subscribe((posts: Post[]) => {
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
