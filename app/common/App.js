import React, {Component} from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'
import Header from 'layout/Header/Header'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class App extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			show_loader: this.props.show_loader
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			show_loader: nextProps.show_loader
		})
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div style={{height: '100%'}}>
					<Header/>
					{this.props.children}
					{
						this.props.show_loader ? (
							<div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent:'center',position:'fixed', top:'50px', background:'rgba(255,255,255,0.7)'}}>
                            <CircularProgress />
                        </div>
						) : null
					}
				</div>
			</MuiThemeProvider>
		)
	}
}

function mapStateToProps(state){
	let _appState = state['common']
	return {
		show_loader: state['show_loader']
	}
}

export default connect(mapStateToProps)(App);