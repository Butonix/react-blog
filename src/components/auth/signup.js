import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FormAuth from './form_auth';
import { SIGNUP_USER } from '../../actions/types';

class Signup extends Component{

    componentDidMount(){
        window.scrollTo(0,0);
    }

    renderSignInLink(){

        if(this.props.location.query.redir){
            const url = '/signin?redir='+encodeURIComponent(this.props.location.query.redir);
            return (
                <Link className="btn btn-success" to={url}>Sign In</Link>
            );
        }

        return (
            <Link className="btn btn-success" to="/signin">Sign In</Link>
        );
    }

    render(){

        return (

            <div>
                <header className="intro-header" style={{backgroundImage: "url('../public/imgs/home-bg.jpg')"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>Sign Up</h1>
                                    <hr className="small" />
                                    <span className="subheading">Made with ReactJS + Redux</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">

                            <FormAuth 
                                action={SIGNUP_USER}
                                redir={this.props.location.query.redir}
                            />

                            <hr />
                            <div className="text-align-center">
                                <p>OR</p>
                                {this.renderSignInLink()}
                            </div>

                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default connect(null)(Signup);
