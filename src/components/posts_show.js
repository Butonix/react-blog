import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component{

    componentDidMount(){
        window.scrollTo(0,0);
        const { slug } = this.props.params;
        this.props.fetchPost(slug);
    }

    onDeleteClick(){
        const { slug } = this.props.params;
        this.props.deletePost(slug, () => {
            this.props.history.push('/');
        });
    }

    render(){
        const { post } = this.props;

        if(!post){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <header className="intro-header" style={{backgroundImage: "url('../public/imgs/"+post.img+"')"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="post-heading">
                                    <h1>{post.title}</h1>
                                    <h2 className="subheading">{post.summary}</h2>
                                    <span className="meta">Posted by {post.author}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <article>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <span dangerouslySetInnerHTML={{__html: post.content}} />

                                <div className="text-align-center">
                                    
                                    <Link className="btn btn-primary margin-left-5" to={`/posts/${this.props.params.slug}/edit`}>Edit Post</Link>
                                    
                                    <button
                                        className="btn btn-danger margin-left-5"
                                        onClick={this.onDeleteClick.bind(this)}
                                    >
                                        Delete Post
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </article>

                <hr />

            </div>
        );
    }
}

function mapStateToProps({posts}, ownProps){
    return { post: posts[ownProps.params.slug] };
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);