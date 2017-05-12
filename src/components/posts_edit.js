import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { UPDATE_POST } from '../actions/types';
import FormPosts from './form_posts';

class PostsEdit extends Component{

    componentDidMount(){
        window.scrollTo(0,0);
        const { slug } = this.props.params;
        this.props.fetchPost(slug);
    }

    render(){

        if(_.isUndefined(this.props.post)){
            return <div>Loading...</div>
        }
        
        return (

            <div>

                <header className="intro-header" style={{backgroundImage: "url('../../public/imgs/home-bg.jpg')"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>Edit Post</h1>
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
                                post={this.props.post} 
                                labelBtn="Edit" 
                                action={UPDATE_POST}
                                history={this.props.history}
                            />

                        </div>
                    </div>
                </div>
                
            </div> 
        );
    }
}

function mapStateToProps({posts}, ownProps){
    return { post: posts[ownProps.params.slug] };
}

export default connect(mapStateToProps, {fetchPost})(PostsEdit);