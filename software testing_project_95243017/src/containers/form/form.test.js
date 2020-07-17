import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from './form'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as axios from "axios";
import Input from '../../components/UI/Input/Input';
jest.mock('axios')

configure({ adapter: new Adapter() });

let wrapper
let props = {
    location: {
        state: {
            "fields": [
                {
                    "_id": "5f0edd6630661e36947ad6a4",
                    "name": "location",
                    "value": "",
                    "type": "location",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6730661e36947ad6a5",
                    "name": "date",
                    "value": "",
                    "type": "date",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6730661e36947ad6a6",
                    "name": "water",
                    "value": "",
                    "type": "number",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6730661e36947ad6a7",
                    "name": "blanket",
                    "value": "",
                    "type": "number",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6730661e36947ad6a8",
                    "name": "food",
                    "value": "",
                    "type": "number",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6730661e36947ad6a9",
                    "name": "first aid supply",
                    "value": "",
                    "type": "number",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6830661e36947ad6aa",
                    "name": "tent",
                    "value": "",
                    "type": "number",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6830661e36947ad6ab",
                    "name": "heater",
                    "value": "",
                    "type": "number",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6830661e36947ad6ac",
                    "name": "email",
                    "value": "",
                    "type": "email",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6830661e36947ad6ad",
                    "name": "name",
                    "value": "",
                    "type": "name",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6830661e36947ad6ae",
                    "name": "Blood Type",
                    "value": [
                        {
                            "label": "A+",
                            "value": "A+"
                        },
                        {
                            "label": "A-",
                            "value": "A-"
                        },
                        {
                            "label": "B+",
                            "value": "B+"
                        },
                        {
                            "label": "B-",
                            "value": "B-"
                        },
                        {
                            "label": "AB+",
                            "value": "AB+"
                        },
                        {
                            "label": "AB-",
                            "value": "AB-"
                        },
                        {
                            "label": "O+",
                            "value": "O+"
                        },
                        {
                            "label": "O-",
                            "value": "O-"
                        }
                    ],
                    "type": "dropdown",
                    "__v": 0
                },
                {
                    "_id": "5f0edd6830661e36947ad6ad",
                    "name": "default",
                    "value": "",
                    "type": "default",
                    "__v": 0
                },
            ],
            "location": [],
            "_id": "5f0edd6930661e36947ad6af",
            "title": "test",
            "is_base_form": true,
            "__v": 0
        }
    }
}
const stateAfterConstructorCall = {
    'form': {
        "fields": [
            {
                "_id": "5f0edd6630661e36947ad6a4",
                "name": "location",
                "value": "",
                "type": "location",
                "__v": 0,
                "valid": true,
                "touched": false
            },
            {
                "_id": "5f0edd6730661e36947ad6a5",
                "name": "date",
                "value": "",
                "type": "date",
                "__v": 0,
                "validation": {
                    "required": true
                },
                "valid": false,
                "touched": false
            },
            {
                "_id": "5f0edd6730661e36947ad6a6",
                "name": "water",
                "value": "",
                "type": "number",
                "__v": 0,
                "validation": {
                    "required": true,
                    "isNumber": true
                },
                "valid": false,
                "touched": false
            },
            {
                "_id": "5f0edd6730661e36947ad6a7",
                "name": "blanket",
                "value": "",
                "type": "number",
                "__v": 0,
                "validation": {
                    "required": true,
                    "isNumber": true
                },
                "valid": false,
                "touched": false
            },
            {
                "_id": "5f0edd6730661e36947ad6a8",
                "name": "food",
                "value": "",
                "type": "number",
                "__v": 0,
                "validation": {
                    "required": true,
                    "isNumber": true
                },
                "valid": false,
                "touched": false
            },
            {
                "_id": "5f0edd6730661e36947ad6a9",
                "name": "first aid supply",
                "value": "",
                "type": "number",
                "__v": 0,
                "validation": {
                    "required": true,
                    "isNumber": true
                },
                "valid": false,
                "touched": false
            },
            {
                "_id": "5f0edd6830661e36947ad6aa",
                "name": "tent",
                "value": "",
                "type": "number",
                "__v": 0,
                "validation": {
                    "required": true,
                    "isNumber": true
                },
                "valid": false,
                "touched": false
            },
            {
                "_id": "5f0edd6830661e36947ad6ab",
                "name": "heater",
                "value": "",
                "type": "number",
                "__v": 0,
                "validation": {
                    "required": true,
                    "isNumber": true
                },
                "valid": false,
                "touched": false
            },
            {
                "_id": "5f0edd6830661e36947ad6ac",
                "name": "email",
                "value": "",
                "type": "email",
                "__v": 0,
                "validation": {
                    "required": true,
                    "isEmail": true
                },
                "valid": false,
                "touched": false
            },
            {
                "_id": "5f0edd6830661e36947ad6ad",
                "name": "name",
                "value": "",
                "type": "name",
                "__v": 0,
                "validation": {
                    "required": true,
                    "isName": true
                },
                "valid": false,
                "touched": false
            },
            {
                "_id": "5f0edd6830661e36947ad6ae",
                "name": "Blood Type",
                "value": "A+",
                "type": "dropdown",
                "__v": 0,
                "options": [
                    {
                        "label": "A+",
                        "value": "A+"
                    },
                    {
                        "label": "A-",
                        "value": "A-"
                    },
                    {
                        "label": "B+",
                        "value": "B+"
                    },
                    {
                        "label": "B-",
                        "value": "B-"
                    },
                    {
                        "label": "AB+",
                        "value": "AB+"
                    },
                    {
                        "label": "AB-",
                        "value": "AB-"
                    },
                    {
                        "label": "O+",
                        "value": "O+"
                    },
                    {
                        "label": "O-",
                        "value": "O-"
                    }
                ],
                "valid": true,
                "touched": false
            },
            {
                "_id": "5f0edd6830661e36947ad6ad",
                "name": "default",
                "value": "",
                "type": "default",
                "__v": 0,
                "validation": {
                    "required": true
                }
            }
        ],
        "location": [],
        "_id": "5f0edd6930661e36947ad6af",
        "title": "test",
        "is_base_form": true,
        "__v": 0
    }, 'formIsValid': false,
    'loading': false
}


beforeAll(() => {
    wrapper = shallow(<Form history={[]} {...props} />, { disableLifecycleMethods: true })
})

describe('constructor', () => {
    it(`should test the constructor function`, () => {
        expect(wrapper.state()).toMatchObject(stateAfterConstructorCall)
    });
});


describe('formHandler', () => {
    it(`should test form submit event handler when post operation succeed`, () => {
        const event = {
            preventDefault() { }
        };
        //mock the api call
        axios.post.mockImplementation(() => Promise.resolve({ status: 200 }))
        const returnedPromise = wrapper.instance().formHandler(event);
        returnedPromise.then(() => {
            expect(wrapper.state().loading).toBe(false);
        }, () => { })
    });
    it(`should test form submit event handler when post operation fails`, () => {
        const event = {
            preventDefault() { }
        };
        //mock the api call
        axios.post.mockImplementation(() => Promise.reject({ status: 400 }))
        const returnedPromise = wrapper.instance().formHandler(event);
        returnedPromise.then(() => { },
            () => {
                expect(wrapper.state().loading).toBe(true);
            }
        )
        axios.mockReset();
    });
});


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
        const value = '**';
        const rules = { required: true, isName: true, isNumber: true, isEmail: true };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([false, ['please insert a valid Name', 'please insert a valid Email address', 'please insert a valid Number']]);
    });
    it(`should reach the third condition and satisfy third condition without satisfying 'if' inside it`, () => {
        const value = 'abcdef';
        const rules = { isName: true };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([true, []]);
    });
    it(`should reach the forth condition and satisfy forth condition without satisfying 'if' inside it`, () => {
        const value = 'ali@gmail.com';
        const rules = { isEmail: true };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([true, []]);
    });
    it(`should reach the fifth condition and satisfy it without satisfying 'if' inside it`, () => {
        const value = '12';
        const rules = { isNumber: true };
        const result = wrapper.instance().checkValidity(value, rules);
        expect(result).toMatchObject([true, []]);
    });
});

describe('inputChangeHandler', () => {
    it(`should test onChange event handler`, () => {
        const event = {
            target: { value: '123456' }
        };

        wrapper.instance().inputChangeHandler(event, 'heater');
        //number field should be changed 
        expect(wrapper.state().form.fields.find(element => element.name === 'heater')).toMatchObject({
            name: 'heater',
            type: 'number',
            value: '123456',
            validation: {
                required: true,
                isNumber: true
            },
            valid: true,
            touched: true,
            messages: []
        });
        expect(wrapper.state().formIsValid).toBe(false)
    });
    it(`should test onChange event handler when element type is location`, () => {
        const event = {
            lat: 35,
            lng: 52
        };
        wrapper.instance().inputChangeHandler(event, 'location');
        //location field should be changed 
        expect(wrapper.state().form.fields.find(element => element.name === 'location')).toMatchObject({
            name: 'location',
            type: 'location',
            value: [35, 52],
            valid: true,
            touched: true,
            messages: []
        });
        expect(wrapper.state().formIsValid).toBe(false)
    });
});

describe('getcurrentLocation', () => {
    it(`should test getcurrentLocation function when it finds current location correctly`, () => {
        let returnedPromise = wrapper.instance().getcurrentLocation()
        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled()
        returnedPromise.then((result) => {
            expect(result).toMatchObject([35, 52])
        }, () => {
            console.log('rejected')
        })
    })
    it(`should test getcurrentLocation function when it fails to find current location`, () => {
        navigator.geolocation.getCurrentPosition.mockImplementationOnce((successCallBack, rejectCallBack, options) => {
            rejectCallBack('operation failed')
        })
        let returnedPromise = wrapper.instance().getcurrentLocation()
        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled()
        returnedPromise.then(() => {
        }, (result) => {
            expect(result).toMatchObject([35.68627757389, 51.39068621881188])
        })
    })
})


describe('componentDidMount', () => {
    it(`should test componentDidMount lifecycle when getcurrentlocation succeed`, () => {
        const spyDidMount = jest.spyOn(Form.prototype, "componentDidMount");
        const returnedPromise = wrapper.instance().componentDidMount();
        expect(spyDidMount).toHaveBeenCalled();
        returnedPromise.then((data) => {
            expect(wrapper.state().form.fields.find(element => element.name === 'location').value).toMatchObject(data)
        }, () => { })
        spyDidMount.mockRestore()
    });

    it(`should test componentDidMount lifecycle when getcurrentlocation fails`, () => {
        const spyDidMount = jest.spyOn(Form.prototype, "componentDidMount");
        navigator.geolocation.getCurrentPosition.mockImplementationOnce((successCallBack, rejectCallBack, options) => {
            rejectCallBack('operation failed')
        })
        const returnedPromise = wrapper.instance().componentDidMount();
        expect(spyDidMount).toHaveBeenCalled();
        returnedPromise.then(() => { }, (data) => {
            expect(wrapper.state().form.fields.find(element => element.name === 'location').value).toMatchObject(data)
        })
        spyDidMount.mockRestore()
    });

    it(`should test componentDidMount lifecycle when state doesn't have a location field`, () => {
        let tempState = JSON.parse(JSON.stringify(stateAfterConstructorCall))
        const index = tempState.form.fields.findIndex(element => element.name === 'location')
        tempState.form.fields.splice(index, 1)
        wrapper.setState(tempState)
        const spyDidMount = jest.spyOn(Form.prototype, "componentDidMount");
        const returnedPromise = wrapper.instance().componentDidMount();
        expect(spyDidMount).toHaveBeenCalled();
        returnedPromise.then((data) => {
            expect(data).toBe(undefined)
        })
        spyDidMount.mockRestore()
        //revert the state
        wrapper.setState(stateAfterConstructorCall)
    });
});

describe(`Form component 'render' method`, () => {
    it(`should test the render method when 'loading' is true`, () => {
        wrapper.setState({ loading: true })
        expect(wrapper.contains(<div><h3>{wrapper.state().form.title}</h3><Spinner /></div>))
    });
    it(`should test the render method when 'loading' is false`, () => {
        wrapper.setState({ loading: false })
        wrapper.find(Input).findWhere(n => n.prop('elementName') === 'heater').prop('changed')({ target: { value: '1' } })
        expect(wrapper.find(Input)).toHaveLength(12)
        expect(wrapper.find('button')).toHaveLength(1)
    });
});

