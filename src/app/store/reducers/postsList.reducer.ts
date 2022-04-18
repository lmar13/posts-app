import {createReducer, on} from '@ngrx/store';
import {addToList} from '../actions/postsList.action';

export const initialState = {
  list: [],
};

export const postsListReducer = createReducer(
  initialState,
  on(addToList, (state, action) => ({
    ...state,
    list: action.posts
  }))
);
