import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import classes from './Login.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios'
class Login extends Component {
    state = {
        fields: {
            username: {
                elementType: 'input',
                elementTitle: 'username',
                value: '',
                validation: {
                    required: true,
                    isName: true
                },
                valid: false,
                touched: false,
                messages: []
            },
            password: {
                elementType: 'password',
                elementTitle: 'password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                messages: []
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let message = []
        let isValid = true;
        let numberOfFalseRules = 0;
        if (!rules) {
            return [true, []];
        }
        if (rules.required) {
            isValid = value.trim() !== '';
            if (!isValid) {
                numberOfFalseRules++;
                message.push('value of this field can\'t be empty');
                return [!numberOfFalseRules, message];
            }
        }
        if (rules.isName && value.trim() !== '') {
            const pattern = /^[A-Za-z]+([ A-Za-z]+)*$/;
            isValid = pattern.test(value)
            if (!isValid) {
                message.push('please insert a valid Name');
                numberOfFalseRules++;
            }
        }
        if (rules.minLength && value.trim() !== '') {
            isValid = value.length >= rules.minLength
            if (!isValid) {
                message.push(`your password must be at least ${rules.minLength} characters long`);
                numberOfFalseRules++;
            }
        }
        return [!numberOfFalseRules, message];
    }

    inputChangeHandler = (event, controlName) => {
        const updatedState = { ...this.state }
        updatedState.fields[controlName].value = event.target.value;
        updatedState.fields[controlName].touched = true;
        [updatedState.fields[controlName].valid, updatedState.fields[controlName].messages] = this.checkValidity(event.target.value, this.state.fields[controlName].validation)
        let formIsValid = true;
        Object.keys(updatedState.fields).forEach(element => {
            formIsValid = updatedState.fields[element].valid && formIsValid;
        });
        updatedState.formIsValid = formIsValid;
        this.setState({ fields: updatedState.fields, formIsValid: updatedState.formIsValid });
    }

    submitHandler = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let response;
        try {
            response = await axios.post('//localhost:3000/get_auth_token/', { username: this.state.fields.username.value, password: this.state.fields.password.value })
            localStorage.setItem('token', response.data.token)
            this.setState({ loading: false });
            this.props.history.push('/');
        } catch (e) {
            throw e
        }
        return response;
    }

    render() {
        const formElementsArray = [];
        let form;
        for (let key in this.state.fields) {
            formElementsArray.push({
                id: key,
                config: this.state.fields[key]
            });
        }
        if (this.state.loading)
            form = <Spinner />
        else {
            form = formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementName={formElement.config.elementTitle}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    messages={formElement.config.messages} />
            ));
        }
        return (
            <div className={classes.form}>
                <h3>Login</h3>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <button className={classes.Button} disabled={!this.state.formIsValid}>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;