import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { 
    SIGNIN_USER, 
    SIGNUP_USER 
} from '../../actions/types';

class FormAuth extends Component{

    renderFieldText(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit({ email, password}){

        if(this.props.action == SIGNIN_USER){
            this.props.signinUser({email, password});
        }
        else if(this.props.action == SIGNUP_USER){
            this.props.signupUser({email, password});
        }

    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
        const { handleSubmit } = this.props;
        return (

            <div>

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    {this.renderAlert()}
                    <Field 
                        label="Email"
                        name="email"
                        type="text"
                        component={this.renderFieldText}
                    />

                    <Field 
                        label="Password"
                        name="password"
                        type="password"
                        component={this.renderFieldText}
                    />

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link className="btn btn-danger margin-left-5" to="/">Cancel</Link>

                </form>
                
            </div> 
        );
    }
}

function validate(values){
    const errors = {};

    if(!values.email){
        errors.email="Enter an email";
    }

    if(!values.password){
        errors.password="Enter a password";
    }

    return errors;
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}

let InitializeFromStateForm = reduxForm({
    validate,
    form: 'FormAuth',
    enableReinitialize : true
})(FormAuth);

InitializeFromStateForm = connect(mapStateToProps, actions)(InitializeFromStateForm);

export default InitializeFromStateForm;