import { handleActions } from 'redux-actions'

import * as constants from './constants';

const defaultState = {
	show_loader: true,
}

export default handleActions(Object.assign({}, {
	[constants.SHOW_LOADER] (state, action){
		let newState = Object.assign({}, state);
		newState.show_loader = true;
		return newState;
	},

	[constants.HIDE_LOADER] (state, action){
		let newState = Object.assign({}, state)
		newState.show_loader = false
		return newState;
	}

}), defaultState);