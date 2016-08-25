import React, { Component, PropTypes } from 'react'
import InfiniteScroller from 'react-variable-height-infinite-scroller'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

require('./reposList.scss')

class ReposList extends Component {
    constructor(props){
        super(props)
        this.onRepoSelected = this.onRepoSelected.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
    }

    render() {
        let that = this
        if(this.props.repos.length > 0){
            return (
                <div className="tabularList">
                    <div className="table_header">
                        <div className="table_column table_column-repo_id">Id</div>
                        <div className="table_column table_column-repo_name">Name</div>
                        <div className="table_column table_column-owner">Owner</div>
                        <div className="table_column table_column-owner_type">Owner Type</div>
                        <div className="table_column table_column-description"> Description</div>
                        <div></div>
                    </div>
                    <InfiniteScroller
                      averageElementHeight={100} // this is a guess you make!
                      containerHeight={600}
                      renderRow={this.renderItem} // function to render a row
                      onScroll={this.handleScroll}
                      totalNumberOfRows={this.props.repos.length}/>   
                </div>
            );    
        }
        else{
            return null
        }
        
    }

    onRepoSelected(repo){
        this.props.setRepoForEdit(repo);
    }

    renderItem(rowNo){
        let repo = this.props.repos[rowNo]
        const iconStyles = { marginRight: 24 };

        const ownerPhotoStyle = {
            display: 'inline-block',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            fontSize: '12px',
        }
        return(
            <div className="reposList_row">
                <div className="table_column table_column-repo_id">{`#${repo.id}`}</div>
                <div className="table_column table_column-repo_name">
                    {repo.name}
                    <div className="tabularList_subText">{repo.url}</div>
                </div>
                <div className="table_column table_column-owner">
                    <img style={ownerPhotoStyle} src={repo.owner.avatar_url} alt={'Team Lead Image'}/>
                    <div className="owner_info">
                      <div className="">{repo.owner ? repo.owner.login : ""}</div>
                      <div className="tabularList_subText">{repo.owner ? repo.owner.id : null}</div>
                    </div>
                </div>
                <div className="table_column table_column-owner_type">
                    {repo.owner.type}
                </div>
                <div className="table_column table_column-description">{repo.description}</div>
                <div className="table_column table_column-icon_col" style={{paddingRight: '24px'}}>
                    <IconMenu iconButtonElement={<FontIcon className="material-icons" style={{"cursor": "pointer"}}>more_vert</FontIcon>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                        <MenuItem primaryText='Edit Repo' onTouchTap={this.onRepoSelected.bind(null, repo)}/>
                    </IconMenu>
                </div>
            </div>
        )
    }

    handleScroll(event){
        let that = this
        var scrollTop = event.target.scrollTop;
        var scrollHeight = event.target.scrollHeight;
        var offsetHeight = event.target.offsetHeight;
        
        if(scrollHeight - (scrollTop + offsetHeight) < 250){
           this.props.getRepos();
        }
    }


};

export default ReposList;