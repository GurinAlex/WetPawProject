import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Observable} from 'rxjs';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/post.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  posts$: Observable<Post[]>;
  postEven: Post[] = [];
  postNotEven: Post[] = [];
  username = '';
  constructor(
    private postService: PostService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.posts$ = this.postService.getByUsername(this.username = this.auth.getUsername());
    this.posts$.subscribe((posts: Post[]) => {
      for (let i = 0; i <= posts.length - 1; i++) {
        if (i % 2 === 0) {
          this.postEven.push(posts[i]);
        } else {
          this.postNotEven.push(posts[i]);
        }
      }
    });
  }

}
