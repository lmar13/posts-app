import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {Post} from '../../model/Post';
import {PostService} from '../../services/post/post.service';
import {select} from '../../store/actions/post.action';
import {State} from '../../store/reducers';

@Component({
  selector: 'app-post',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public filteredPosts: Post[] = [];
  public activeId = '';
  private subscription: Subscription = new Subscription();

  constructor(private postService: PostService,
              private store: Store<State>) {
  }

  public ngOnInit(): void {
    this.subscription
      .add(this.store.select((x: State) => x.posts.list).subscribe(posts => {
        this.posts = posts;
        this.filteredPosts = posts;
      }))
      .add(this.store.select((x: State) => x.post.selected).pipe(first()).subscribe(x => this.activeId = x));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public handlePanelChange(event: NgbPanelChangeEvent): void {
    this.store.dispatch(select({selectedId: event.panelId}));
  }

  public handlePostFilter(value: Post[]): void {
    this.filteredPosts = value;
  }
}
