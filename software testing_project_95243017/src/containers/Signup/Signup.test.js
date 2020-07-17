import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Signup from './Signup'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as axios from "axios";
jest.mock('axios')

configure({ adapter: new Adapter() });

let wrapper
beforeAll(() => {
    wrapper = shallow(<Signup history={[]} />)
    wrapper.setState({
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
            email: {
                elementType: 'input',
                elementTitle: 'email',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
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
            },
            role: {
                elementType: 'dropdown',
                elementTitle: 'role',
                elementOptions: [
                    { "label": "cca", "value": "Control Center Agent" },
                    { "label": "fa", "value": "Field Agent" }
                ],
                value: 'Control Center Agent',
                touched: false,
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    })
})

describe('checkValidity', () => {
    // satisfy edge coverage
    it(`should satisfy the '!rules' condition`, () => {
        const value = null;
        const rules = null;
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([true, []]);
    });
    it(`shouldn't satisfy the first condition but it should satisfy the second one and the if inside it`, () => {
        const value = '';
        const rules = { required: true };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([false, ['value of this field can\'t be empty']]);
    });
    it(`shouldn't satisfy any condition`, () => {
        const value = '';
        const rules = { something: true };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([true, []]);
    });
    it(`shouldn't satisfy first condition and second condition's inside if, but should satisfy other conditions and the if inside them`, () => {
        const value = '12';
        const rules = { required: true, isName: true, minLength: 6, isEmail: true };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([false, ['please insert a valid Name', 'your password must be at least 6 characters long', 'please insert a valid Email address']]);
    });
    it(`should reach the third condition and satisfy third and forth condition without satisfying 'if' inside them`, () => {
        const value = 'abcdef';
        const rules = { isName: true, minLength: 6 };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([true, []]);
    });
    it(`should reach the fifth condition and satisfy it without satisfying 'if' inside it`, () => {
        const value = 'ali@gmail.com';
        const rules = { isEmail: true };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([true, []]);
    });
});

describe('inputChangeHandler', () => {
    it(`should test onChange event handler`, () => {
        const event = {
            target: { value: '123456' }
        };
        wrapper.instance().inputChangeHandler(event, 'password');
        //password field should be changed but other must remain the same
        expect(wrapper.state().fields).toMatchObject({
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
            email: {
                elementType: 'input',
                elementTitle: 'email',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                messages: []
            },
            password: {
                elementType: 'password',
                elementTitle: 'password',
                value: '123456',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: true,
                touched: true,
                messages: []
            },
            role: {
                elementType: 'dropdown',
                elementTitle: 'role',
                elementOptions: [
                    { "label": "cca", "value": "Control Center Agent" },
                    { "label": "fa", "value": "Field Agent" }
                ],
                value: 'Control Center Agent',
                touched: false,
                valid: true
            }
        });
        //form shouldn't be valid
        expect(wrapper.state().formIsValid).toBe(false)
    });
});

describe('submitHandler', () => {
    it(`should test submit event handler when post operation succeed and role is admin`, () => {
        const event = {
            preventDefault() { }
        };
        //mock the api call
        axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: { token: 'test' } }))
        const returnedPromise = wrapper.instance().submitHandler(event);
        returnedPromise.then(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('isAdmin', true)
            expect(wrapper.state().loading).toBe(false);
        }, () => { })
    });
    it(`should test submit event handler when post operation succeed and role is fieldagent`, () => {
        const event = {
            preventDefault() { }
        };
        wrapper.setState({
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
                email: {
                    elementType: 'input',
                    elementTitle: 'email',
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
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
                },
                role: {
                    elementType: 'dropdown',
                    elementTitle: 'role',
                    elementOptions: [
                        { "label": "cca", "value": "Control Center Agent" },
                        { "label": "fa", "value": "Field Agent" }
                    ],
                    value: 'Field Agent',
                    touched: false,
                    valid: true
                }
            },
            formIsValid: false,
            loading: false
        })
        //mock the api call
        axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: { token: 'test' } }))
        const returnedPromise = wrapper.instance().submitHandler(event);
        returnedPromise.then(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('isAdmin', true)
            expect(wrapper.state().loading).toBe(false);
        }, () => { })
    });
    it(`should test submit event handler when post operation fails`, () => {
        const event = {
            preventDefault() { }
        };
        //mock the api call
        axios.post.mockImplementation(() => Promise.reject({ status: 400, data: { token: 'test' } }))
        const returnedPromise = wrapper.instance().submitHandler(event);
        returnedPromise.then(() => {},
            () => {
                expect(wrapper.state().loading).toBe(true);
            }
        )
    });
});

describe('render', () => {
    it(`should contain four Input element when this.state.loading is false`, () => {
        wrapper.setState({ loading: false });
        expect(wrapper.find(Input)).toHaveLength(4);
        wrapper.find(Input).findWhere(n => n.prop('elementType') === 'password').prop('changed')({
            target: { value: '123456' }
        })
    });
    it(`should contain one Spinner element when this.state.loading is true`, () => {
        wrapper.setState({ loading: true });
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});