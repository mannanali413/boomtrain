import { createAction } from 'redux-actions';
import request from 'superagent'

import * as constants from './constants';

const getAPI = 'https://api.github.com/repositories'
const postAPI = 'https://requestb.in/18wzqj51/'

export const getRepos = createAction(constants.GET_REPOS, payload => new Promise((resolve, reject) => {
	request.get(getAPI)
		.query(`since=${payload.since}`) // check for request params
		.end((err, res) => {
			if (err) reject(err);

			if(res.body && res.statusCode == 200){
				let result = res;
				resolve(result);
			} else {
				reject(res.body);
			}
		})
}))

export const editRepo = createAction(constants.SUBMIT_REPO_EDIT, payload => new Promise((resolve, reject) => {
	let {id,name, url, user_name, user_type, description} = payload

	let data = {
		id,
		name,
		url,
		user_name,
		user_type,
		description
	}

	request.post(postAPI)
		.send(data)
		.type('form')
		.end((err, res) => {
			resolve(data);
		})
}))

export const setSelectedRepo = createAction(constants.SET_REPO_EDIT)

export const clearSelectedRepo = createAction(constants.CLEAR_REPO_EDIT)

export const closeModal = createAction(constants.CLOSE_REPOS_MODAL)

export const openModal = createAction(constants.OPEN_REPOS_MODAL)

