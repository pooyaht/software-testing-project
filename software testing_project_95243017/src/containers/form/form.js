import React, { Component } from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './form.module.css';
import Input from '../../components/UI/Input/Input';
import axios from 'axios'
class form extends Component {
    constructor(props) {
        super(props);
        let nextState = JSON.parse(JSON.stringify(this.props.location.state));
        nextState.fields.forEach(element => {
            switch (element.type.trim().toLowerCase()) {
                case ("dropdown"):
                    element.options = element.value;
                    element.value = element.options[0].value;
                    break;
                case ("email"):
                    element.validation = {
                        "required": true,
                        "isEmail": true
                    }
                    element.value = '';
                    break;
                case ("number"):
                    element.validation = {
                        "required": true,
                        "isNumber": true
                    }
                    element.value = '';
                    break;
                case ("date"):
                    element.validation = {
                        "required": true
                    }
                    element.value = '';
                    break;
                case ("location"):
                    element.value = '';
                    break;
                case ("name"):
                    element.validation = {
                        "required": true,
                        "isName": true
                    }
                    element.value = '';
                    break;
                default:
                    element.validation = {
                        "required": true
                    }
                    element.value = '';
            }
            if (!element.validation || !element.validation.required)
                element.valid = true;
            else
                element.valid = false;
            element.touched = false;
        });
        this.state = { form: nextState, formIsValid: false, loading: false }
    }
    async componentDidMount() {
        if (this.state.form.fields.find((element => element.name === 'location'))) {
            let data = [];
            try {
                data = await this.getcurrentLocation()
                const updatedform = [...this.state.form.fields];
                let temp = updatedform.find(element => element.name === "location");
                const updatedFormElement = { ...temp };
                updatedFormElement.value = data;
                let index = updatedform.findIndex((element) => element.name === "location")
                updatedform.splice(index, 1, updatedFormElement);
                this.setState({ form: { title: this.state.form.title, fields: updatedform } });
            }
            catch (data) {
                const updatedform = [...this.state.form.fields];
                let temp = updatedform.find(element => element.name === "location")
                const updatedFormElement = { ...temp }
                updatedFormElement.value = data;
                let index = updatedform.findIndex((element) => element.name === "location")
                updatedform.splice(index, 1, updatedFormElement);
                this.setState({ form: { title: this.state.form.title, fields: updatedform } });
                throw data
            };
            return data
        }
    }
    getcurrentLocation() {
        return new Promise((resolve, reject) => {
            const options = { enableHighAccuracy: true, timeout: 1000, maximumAge: 10000 }
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                resolve([
                    coords.latitude,
                    coords.longitude
                ]
                );
            }, (err) => {
                reject([35.68627757389, 51.39068621881188])
            }, options);
        });
    }
    formHandler = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let temp = JSON.parse(JSON.stringify(this.state));
        delete temp.formIsValid;
        delete temp.loading;
        temp.form.fields.forEach((element) => {
            if (element.type === "location") {
                temp.form.location = element.value;
            }
            delete element.valid;
            delete element.touched;
            delete element.messages;
            delete element.options;
            delete element.validation;
        })
        const token = localStorage.getItem('token')
        let response;
        try {
            response = await axios.post('//localhost:3000/submit_form', temp.form, {
                headers: {
                    Authorization: token
                }
            })
            this.setState({ loading: false });
            this.props.history.push('/');
        } catch (err) {
            throw err
        }
        return response
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
            }
        }
        if (rules.isName && value.trim() !== '') {
            const pattern = /^[A-Za-z]+([ A-Za-z]+)*$/;
            isValid = pattern.test(value);
            if (!isValid) {
                numberOfFalseRules++;
                message.push('please insert a valid Name');
            }
        }

        if (rules.isEmail && value.trim() !== '') {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value)
            if (!isValid) {
                numberOfFalseRules++;
                message.push('please insert a valid Email address');
            }
        }
        if (rules.isNumber && value.trim() !== '') {
            const pattern = /[0-9]$/;
            isValid = pattern.test(value)
            if (!isValid) {
                numberOfFalseRules++;
                message.push('please insert a valid Number');
            }
        }
        return [!numberOfFalseRules, message];
    }
    inputChangeHandler = (event, inputIdentifier) => {
        const updatedform = [...this.state.form.fields];
        let temp = updatedform.find(element => element.name === inputIdentifier)

        const updatedFormElement = { ...temp }

        if (inputIdentifier === 'location') {
            updatedFormElement.value = [event.lat, event.lng];
        }
        else
            updatedFormElement.value = event.target.value;
        [updatedFormElement.valid, updatedFormElement.messages] = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        let index = updatedform.findIndex((element) => element.name === inputIdentifier)
        updatedform.splice(index, 1, updatedFormElement);
        let formIsValid = true;
        for (let inputIdentifier of updatedform) {
            formIsValid = inputIdentifier.valid && formIsValid;
        }
        this.setState({ form: { title: this.state.form.title, fields: updatedform }, formIsValid: formIsValid });
    }
    render() {
        const formElementsArray = JSON.parse(JSON.stringify(this.state.form.fields));
        let form = (
            <form onSubmit={this.formHandler}>
                {formElementsArray.map((formElement, index) => (
                    <Input
                        key={index}
                        elementName={formElement.name}
                        elementType={formElement.type}
                        elementOptions={formElement.options}
                        value={formElement.value}
                        invalid={!formElement.valid}
                        shouldValidate={formElement.validation}
                        touched={formElement.touched}
                        changed={(event) => this.inputChangeHandler(event, formElement.name)}
                        messages={formElement.messages}
                    />
                ))}
                <button className={classes.Button} disabled={!this.state.formIsValid}>SUBMIT</button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.form}>
                <h3>{this.state.form.title}</h3>
                {form}
            </div>
        );
    }
}

export default form;