import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Store} from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';
import {debounceTime, first} from 'rxjs/operators';
import {Post} from '../../model/Post';
import {search} from '../../store/actions/post.action';
import {State} from '../../store/reducers';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly delay: number = 200;

  @Output() postFiltered: EventEmitter<Post[]> = new EventEmitter<Post[]>();
  @ViewChild('input') public input: ElementRef;

  private isNoFilter = true;
  public name = '';
  private posts: Post[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<State>) {
  }

  public ngOnInit(): void {
    this.subscription
      .add(this.store.select((x: State) => x.posts.list).subscribe(x => this.posts = x))
      .add(this.store.select((x: State) => x.post.searched).pipe(first()).subscribe(x => {
        this.name = x;
        this.handleFilterInputChange();
      }));
  }

  public ngAfterViewInit(): void {
    this.subscription
      .add(
        fromEvent(this.input.nativeElement, 'input')
          .pipe(
            debounceTime(this.delay),
          )
        .subscribe(() => {
          console.log('test');
          this.handleFilterInputChange();
        }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public handleFilterInputChange(): void {
    if (this.name.length > 2) {
      const temp = this.posts.filter(post => post.title.includes(this.name));
      this.postFiltered.emit(temp);
      this.isNoFilter = false;
    } else if (!this.isNoFilter) {
      this.postFiltered.emit(this.posts);
      this.isNoFilter = true;
    }
    this.store.dispatch(search({searchedText: this.name}));
  }
}
