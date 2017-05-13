import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FormAuth from './form_auth';
import { SIGNIN_USER } from '../../actions/types';

class Signin extends Component{

    componentDidMount(){
        window.scrollTo(0,0);
    }

    renderSignUpLink(){

        if(this.props.location.query.redir){
            const url = '/signup?redir='+encodeURIComponent(this.props.location.query.redir);
            return (
                <Link className="btn btn-success" to={url}>Sign Up</Link>
            );
        }

        return (
            <Link className="btn btn-success" to="/signup">Sign Up</Link>
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
                                    <h1>Sign In</h1>
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
                                action={SIGNIN_USER}
                                redir={this.props.location.query.redir}
                            />

                            <hr />
                            <div className="text-align-center">
                                <p>OR</p>
                                {this.renderSignUpLink()}
                            </div>

                        </div>
                    </div>
                </div>
                
            </div> 
        );
    }
}

export default connect(null)(Signin);
