import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators'
@Injectable({ providedIn: 'root'  })
export class postsService {
  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        'https://ng-angular-guide.firebaseio.com/posts.json',
        postData
      )

      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-angular-guide.firebaseio.com/posts.json'
      )
      .pipe(
        map((responsedata: { [key: string]: Post }) => {
          const postarray: Post[] = [];
          for (const key in responsedata) {
            if (responsedata.hasOwnProperty(key)) {
              postarray.push({ ...responsedata[key], id: key })
            }
          }
          return postarray;

        })
      );
      
  }

  deletePost() {
    return this.http.delete('https://ng-angular-guide.firebaseio.com/posts.json');
  }
}
