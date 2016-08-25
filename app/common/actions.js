import { createAction } from 'redux-actions';
import * as constants from './constants';

export const showLoader = createAction(constants.SHOW_LOADER)

export const hideLoader = createAction(constants.HIDE_LOADER)