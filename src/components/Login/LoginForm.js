import React from 'react';
import {
    Field, reduxForm
} from 'redux-form';
import './Login.css'

export class LoginForm extends React.Component {
    renderError({
                    error, touched
                }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({
                       input, label, meta
                   }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>
                    {label}
                </label>
                <input
                    {...input}
                    autoComplete="off"
                />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error form-login"
            >
                <Field
                    name="username"
                    component={this.renderInput}
                    label="Логин"
                />
                <Field
                    name="password"
                    component={this.renderInput}
                    label="Пароль"
                />
                <button className="ui button primary login-button">Войти</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(LoginForm);
