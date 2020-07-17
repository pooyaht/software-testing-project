import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from './Login'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as axios from "axios";
jest.mock('axios')

configure({ adapter: new Adapter() });

let wrapper
beforeAll(() => {
    wrapper = shallow(<Login history = {[]} />)
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
    )
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
    it(`shouldn't satisfy first condition and second condition's inside if, but should satisfy other conditions and the if inside them `, () => {
        const value = '12';
        const rules = { required: true, isName: true, minLength: 6 };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([false, ['please insert a valid Name', 'your password must be at least 6 characters long']]);
    });
    it(`should reach the third condition and satisfy third and forth condition without satisfying 'if' inside them`, () => {
        const value = 'abcdef';
        const rules = { required: true, isName: true, minLength: 6 };
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
        //password field should be changed 
        expect(wrapper.state().fields.password).toMatchObject({
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
        });
        //username field should remain the same
        expect(wrapper.state().fields.username).toMatchObject({
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
        });
        //form shouldn't be valid (cause username value is still null)
        expect(wrapper.state().formIsValid).toBe(false)
    });
});

describe('submitHandler', () => {
    it(`should test submit event handler when post operation succeed`, () => {
        const event = {
            preventDefault() { }
        };
        //mock the api call
        axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: { token: 'test' } }))
        const returnedPromise = wrapper.instance().submitHandler(event);
        returnedPromise.then(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('token','test')
            expect(wrapper.state().loading).toBe(false);
        }, () => { })
    });
    it(`should test submit event handler when post operation fails`, () => {
        const event = {
            preventDefault() { }
        };
        //mock the api call
        axios.post.mockImplementation(() => Promise.reject({ status: 400}))
        const returnedPromise = wrapper.instance().submitHandler(event);
        returnedPromise.then(() => { },
            () => {
                expect(wrapper.state().loading).toBe(true);
            }
        )
    });
});

describe('render', () => {
    it(`should contain two Input element when this.state.loading is false`, () => {
        wrapper.setState({ loading: false });
        expect(wrapper.find(Input)).toHaveLength(2);
        wrapper.find(Input).findWhere(n => n.prop('elementType')==='password').prop('changed')({
            target: { value: '123456' }
        })
    });
    it(`should contain one Spinner component when this.state.loading is true`, () => {
        wrapper.setState({ loading: true });
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});


