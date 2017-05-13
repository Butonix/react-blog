import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Navbar extends Component{

    handleSignOut(){
        this.props.signoutUser();
    }

    renderLinks(device){

        if(this.props.authenticated){

            if(device === 'DESKTOP'){
                return(
                    <li className="nav-item">                    
                        <Link className="nav-link" to="#" onClick={this.handleSignOut.bind(this)}>Sign out</Link>
                    </li>
                );
            }
            else{
                return(
                    <Link to="#" onClick={this.handleSignOut.bind(this)}><li>Sign out</li></Link>
                );
            }

        }
        else{

            if(device === 'DESKTOP'){
                return [
                    <li className="nav-item" key={'signin-desktop'}>
                        <Link className="nav-link" to="/signin">Sign in</Link>
                    </li>,
                    <li className="nav-item" key={'signup-desktop'}>
                        <Link className="nav-link" to="/signup">Sign up</Link>
                    </li>
                ];
            }
            else{
                return [
                    <Link to="/signin" key={'signin-mobile'}><li>Sign in</li></Link>,
                    <Link to="/signup" key={'signup-mobile'}><li>Sign up</li></Link>
                ];
            }

        }
    }

    render(){
        return (
            <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
                <div className="container-fluid">

                    <div className="navbar-header page-scroll">
                        <Link className="navbar-brand hidden-xs" to="/">React Blog</Link>

                        <div id="menuToggle" className="visible-xs">
                            <input type="checkbox" />
                            <span></span>
                            <span></span>
                            <span></span>

                            <ul id="menu">
                              <Link to="/posts/new"><li>Create Post</li></Link>
                              <Link to="/about"><li>About</li></Link>
                              {this.renderLinks('MOBILE')}
                            </ul>
                        </div>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/posts/new">
                                    Create Post
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    About
                                </Link>
                            </li>
                            {this.renderLinks('DESKTOP')}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
};

function mapStateToProps(state){
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(Navbar);