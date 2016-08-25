import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import classNames from 'classnames'

function objectFromKeys(obj = {}, keys = []) {
    let res = {}

    keys.forEach((key, i) => {
        if (obj.hasOwnProperty(key))
            res[key] = obj[key]
    })

    return res
}

class EditRepo extends Component {
	constructor(props){
		super(props);

		let _props = this.props.selected_repo

		this.state = {
			'id': _props.id,
			'name': _props.name,
			'url': _props.url,
			'description': _props.description,
			'user_name': _props.owner.login,
			'user_type': _props.owner.type,
			'status': '',
			'msg': ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	render(){

		return(
			<div style={{width: '100%', height: '100%'}}>
				<h1 className="modal_header">Edit Repo Info</h1>
				<div className="modal_content">

					<div className="mt-10">
						<label className="input_label mr-20">Repo Name</label>
						<input name="name" className="input_input" value={this.state.name} onChange={this.onChange}/>
					</div>
					<div className="mt-10">
						<label className="input_label mr-20">Repo URL</label>
						<input name="url" className="input_input" value={this.state.url} onChange={this.onChange}/>
					</div>
					<div className="mt-10">
						<label className="input_label mr-20">User Login</label>
						<input name="user_name" className="input_input" value={this.state.user_name} onChange={this.onChange}/>
					</div>
					<div className="mt-10">
						<label className="input_label mr-20">User Type</label>
						<input name="user_type" className="input_input" value={this.state.user_type} onChange={this.onChange}/>
					</div>
					<div className="mt-10">
						<label className="input_label mr-20" style={{verticalAlign: 'top'}}>Description</label>
						<textarea name="description" className="input_textarea" rows="10" cols="50" value={this.state.description} onChange={this.onChange}></textarea>
					</div>
				</div>
				<div className="modal_footer">
					<RaisedButton label="Save" primary={true} style={{float: 'right'}} onTouchTap={this.onSubmit}/>
					<FlatButton label="Cancel" style={{float: 'right', marginRight: 30}} onTouchTap={this.onCancel}/>
					<div className={classNames('modal_footer_msg', {
					        'modal_footer_msg-error': this.state.status == 'error',
					        'modal_footer_msg-success': this.state.status == 'success'
					    })}>{this.state.msg}</div>
				</div>
			</div>
		)
	}

	onChange(e){
		let value = e.target.value;
		let name = e.target.name;

		this.setState({[name]: value});
	}

	onCancel(e){
		this.props.closeModal();
	}

	onSubmit(e){
		let data = objectFromKeys(this.state, ['name', 'url', 'user_name', 'user_type', 'description', 'id']);

		this.props.editRepo(data)
	}
}

EditRepo.propTypes = {
	name: React.PropTypes.string,
	url: React.PropTypes.string,
	description: React.PropTypes.string,
	user_name: React.PropTypes.string,
	user_type: React.PropTypes.string,
	closeModal: React.PropTypes.func,
	editRepo: React.PropTypes.func,
	postEditRepo: React.PropTypes.func
}

export default EditRepo;