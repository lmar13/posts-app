import {createReducer, on} from '@ngrx/store';
import {search, select} from '../actions/post.action';

export const initialState = {
  selected: '',
  searched: '',
};

export const postReducer = createReducer(
  initialState,
  on(select, (state, action) => ({
    ...state,
    selected: action.selectedId
  })),
  on(search, (state, action) => ({
    ...state,
    searched: action.searchedText
  })),
);
