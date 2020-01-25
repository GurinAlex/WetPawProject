import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.apiKey}/articles`, post);
  }

  getByCategory(category: string): Observable<any> {
    return this.http.get(`${environment.apiKey}/articles/category/${category}`)
      .pipe((map((response: Post[]) => {
        return  response;
      })));
  }

  getByUsername(username: string): Observable<any> {
    return this.http.get(`${environment.apiKey}/articles/${username}`)
      .pipe(map( (response: Post[]) => response ));
  }
  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.apiKey}/articles`)
      .pipe(map( (response: Post[]) => response ));
  }

  getById(id: number): Observable<Post> {
    return this.http.get(`${environment.apiKey}/articles/post/${id}`)
      .pipe(map( (response: Post) => response ));
  }
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiKey}/articles/${id}`);
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.apiKey}/articles/${post.id}`, post);
  }
}
