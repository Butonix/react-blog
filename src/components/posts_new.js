import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { CREATE_POST } from '../actions/types';
import FormPosts from './form_posts';

class PostsNew extends Component{

    componentDidMount(){
        window.scrollTo(0,0);
    }

    render(){

        return (

            <div>

                <header className="intro-header" style={{backgroundImage: "url('../public/imgs/home-bg.jpg')"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>Create Post</h1>
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

                            <FormPosts 
                                post={{}}
                                labelBtn="Create" 
                                action={CREATE_POST} 
                                history={this.props.history}
                            />

                        </div>
                    </div>
                </div>
                
            </div> 
        );
    }
}

export default connect(null)(PostsNew);
