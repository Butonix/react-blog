import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createPost, updatePost } from '../actions';
import { CREATE_POST, UPDATE_POST } from '../actions/types';

class FormPosts extends Component{

    renderFieldText(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderFieldSelect(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <div>
                    <select {...field.input}>
                        <option value='' disabled>Select a category</option>
                        <option value="Programming">Programming</option>
                        <option value="Science">Science</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                    </select>
                </div>
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderFieldTextarea(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <textarea 
                    rows="4"
                    className="form-control"
                    {...field.input}
                >
                </textarea>
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values){

        switch(this.props.action){

            case CREATE_POST:
                this.props.createPost(values, () => {
                    this.props.history.push('/');
                });
                break;
            
            case UPDATE_POST:
                this.props.updatePost(values, () => {
                    this.props.history.push('/');
                });
            break;
        }
        
    }

    render(){
        const { handleSubmit } = this.props;
        return (

            <div>

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                    <Field 
                        label="Title"
                        name="title"
                        component={this.renderFieldText}
                    />

                    <Field 
                        label="Brief Summary"
                        name="summary"
                        component={this.renderFieldText}
                    />

                    <Field 
                        label="Category"
                        name="categories"
                        component={this.renderFieldSelect}
                    />

                    <Field 
                        label="Content"
                        name="content"
                        component={this.renderFieldTextarea}
                    />

                    <Field 
                        label="Post Author"
                        name="author"
                        component={this.renderFieldText}
                    />

                    <button type="submit" className="btn btn-primary">{this.props.labelBtn}</button>
                    <Link className="btn btn-danger margin-left-5" to="/">Cancel</Link>

                </form>
                
            </div> 
        );
    }
}

function validate(values){
    const errors = {};

    if(!values.title){
        errors.title="Enter a title";
    }

    if(!values.summary || values.summary.length > 100){
        errors.summary="Enter a brief summary no longer than 100 characters";
    }

    if(!values.categories){
        errors.categories="Select a category";
    }

    if(!values.content){
        errors.content="Enter some content";
    }

    if(!values.author){
        errors.author="Enter an author for the post";
    }

    return errors;
}

function mapStateToProps(state, ownProps){
    return {initialValues: ownProps.post};
}

let InitializeFromStateForm = reduxForm({
    validate,
    form: 'PostsForm',
    enableReinitialize : true
})(FormPosts);

InitializeFromStateForm = connect(mapStateToProps,{ createPost, updatePost })(InitializeFromStateForm);

export default InitializeFromStateForm;