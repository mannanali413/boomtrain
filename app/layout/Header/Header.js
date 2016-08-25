import React, { Component } from 'react'
import { Link } from 'react-router'

require('./header.scss')

class HeaderLinks extends Component {
    constructor(props) {
        super(props)
        this.links = [
            { title: 'Repos', url: '/repos/' },
        ]
    }

    render() {
        return (
            <nav className="header_links">
                <ul>
                    {this.links.map((link, index) => {
                        return <li key={index}><Link to={link.url} activeClassName="active">{link.title}</Link></li>
                    })}
                </ul>
            </nav>
        )
    }
}

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header_logo"></div>
                <HeaderLinks/>
            </div>
        )
    }
}