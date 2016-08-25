import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AppActions from 'common/actions'
import * as actions from './actions'
import * as constants from './constants'

import Modal from 'react-modal'
import ReposList from './components/ReposList'
import EditRepo from './components/EditRepo'

class Repos extends Component {
	constructor(props){
		super(props)
		this._resizeTimer = null
		this.onRepoSelected = this.onRepoSelected.bind(this)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.getRepos = this.getRepos.bind(this)
		this.onEditSubmit = this.onEditSubmit.bind(this)
	}

	componentDidMount(){
		this.getRepos()
	}

	render(){
		let modal = null;
		const iconStyles = { marginRight: 24 };
		if(this.props.open_modal){
			modal = getEditRepoModal(this);
		}

		let {repos} = this.props

		return (
			<div className="page">
				<div className="page_header">
					<h1 className="page_header_title">Repos List</h1>
				</div>
				<div className="page_content" onScroll={this.handleScroll}>
					<ReposList setRepoForEdit={this.onRepoSelected} repos={this.props.all_repos} getRepos={this.getRepos}/> 
				</div>
				{modal}
			</div>
			)

	}

	onRepoSelected(repo){
		this.props.actions.setSelectedRepo(repo)
	}

	openModal(){
		this.props.actions.openModal()
	}

	closeModal(){
		this.props.actions.closeModal()
	}

	getRepos(){
		let {since} = this.props
		AppActions.showLoader()
		this.props.actions.getRepos({since})
		AppActions.hideLoader();
	}

	onEditSubmit(){
		this.props.actions.closeModal()
	}

}

function getEditRepoModal(ctx){
	let selected_repo = ctx.props.selected_repo;
    return (
        <Modal
            className='modal_editRepoInfo'
            style={getModalStyle()}
            onRequestClose={ctx.closeModal}
            isOpen={ctx.props.open_modal}>
            <EditRepo
            	selected_repo={ctx.props.selected_repo}
                closeModal={ctx.closeModal}
                editRepo={ctx.props.actions.editRepo}
                postEditRepo={ctx.onEditSubmit.bind(ctx)}/>
        </Modal>
    )
}

function getModalStyle() {
    return {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0, 0.2)',
            zIndex: 10
        },
        content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: 10001,
            border: '1px solid #d8d8d8',
            background: '#fff',
            borderRaadius: 4,
            borderRadius: '4px',
            outline: 'none',
        }
    }
}


function mapStateToProps(state) {
	let _reposData = state['repos']
	return {
		all_repos: _reposData['all_repos'],
		repos: _reposData['repos'],
		selected_repo: _reposData['selected_repo'],
		since: _reposData['since'],
		open_modal: _reposData['open_modal'],
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Repos);

