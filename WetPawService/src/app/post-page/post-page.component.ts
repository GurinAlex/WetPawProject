import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../shared/post.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../shared/interfaces';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.post$ = this.route.params.pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id']);
      }));
  }
  goBeck() {
    this.router.navigate(['/']);
  }
}
