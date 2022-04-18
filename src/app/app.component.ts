import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {first} from 'rxjs/operators';
import {PostService} from './services/post/post.service';
import {addToList} from './store/actions/postsList.action';
import {State} from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'posts-app';

  constructor(private store: Store<State>,
              private postService: PostService) {
    this.postService.getPosts().pipe(first()).subscribe(posts => this.store.dispatch(addToList({posts})));
  }
}
