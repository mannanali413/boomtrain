import { handleActions } from 'redux-actions'

import * as constants from './constants';

const defaultState = {
	all_repos: [],
	repos: [],
	selected_repo: {},
	since: 0,
	open_modal: false
}

export default handleActions(Object.assign({}, {
	
	[constants.GET_REPOS] (state, action){
		let newState = Object.assign({}, state);
		newState.all_repos = [...newState.all_repos, ...action.payload.body];
		let link = action.payload.header.link.split(";")[0]
		let eqIndex = link.indexOf("=");
		newState.since = parseInt(link.substring(eqIndex+1, link.length-1));
		return newState;
	},

	[constants.SUBMIT_REPO_EDIT] (state, action){
		let newState = Object.assign({}, state)
		for(let i=0; i < newState.all_repos.length; i++){
			if(newState.all_repos[i]['id'] == action.payload.id){
				let repoObj = newState.all_repos[i]
				repoObj['name'] = action.payload.name
				repoObj['url'] = action.payload.url
				repoObj['owner']['login'] = action.payload.user_name
				repoObj['owner']['type'] = action.payload.user_type
				repoObj['description'] = action.payload.description
			}
		}
		newState.selected_repo = {}
		newState.open_modal = false
		return newState;
	},

	[constants.SET_REPO_EDIT] (state, action){
		let newState = Object.assign({}, state);
		newState.selected_repo = action.payload
		newState.open_modal = true
		return newState
	},

	[constants.CLEAR_REPO_EDIT] (state, action){
		let newState = Object.assign({}, state, {selected_repo: {}});
		return newState;
	},

	[constants.OPEN_REPOS_MODAL] (state, action){
		let newState = Object.assign({}, state, {open_modal: true});
		return newState;
	},

	[constants.CLOSE_REPOS_MODAL] (state, action){
		let newState = Object.assign({}, state, {open_modal: false});
		return newState;
	}

}), defaultState);