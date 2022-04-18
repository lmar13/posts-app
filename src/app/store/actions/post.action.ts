import {createAction, props} from '@ngrx/store';

export const select = createAction(
  'select',
  props<{selectedId: string}>()
);
export const search = createAction(
  'search',
  props<{searchedText: string}>()
);
