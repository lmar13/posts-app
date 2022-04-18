import {createAction, props} from '@ngrx/store';
import {Post} from '../../model/Post';

export const addToList = createAction(
  'addToList',
  props<{posts: Post[]}>(),
);
