import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {Post} from '../../model/Post';
import {postReducer} from './post.reducer';
import {postsListReducer} from './postsList.reducer';

export interface State {
  post: {
    searched: string,
    selected: string,
  };
  posts: {
    list: Post[];
  };
}

export const reducers: ActionReducerMap<State> = {
  post: postReducer,
  posts: postsListReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
