import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions';

class PostsIndex extends Component{
    
    componentDidMount(){
        window.scrollTo(0,0);
        this.props.fetchPosts();
    }

    renderPosts(){

        if(_.isEmpty(this.props.posts)){
            return (
                <div className="text-align-center">
                    <i className="fa fa-spinner fa-pulse fa-fw"></i>
                </div>

            );
        }

        return _.map(this.props.posts, post => {
            return (
                <div key={post._id}>
                    <div className="post-preview">
                        <Link to={`/posts/${post.slug}`}>
                            <h2 className="post-title">
                                {post.title}
                            </h2>
                            <h5>
                                <span className="label label-primary">
                                    {post.categories}
                                </span>
                            </h5>
                            <h3 className="post-subtitle">
                                {post.summary}
                            </h3>
                        </Link>
                        <p className="post-meta">Posted by {post.author}</p>
                    </div>
                    <hr/>
                </div>
            );
        });
    }

    render(){
        return (
            <div>
                <header className="intro-header" style={{backgroundImage: "url('public/imgs/home-bg.jpg')"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>React Blog</h1>
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
                            {this.renderPosts()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);