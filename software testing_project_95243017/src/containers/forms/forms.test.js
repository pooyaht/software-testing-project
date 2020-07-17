import React from 'react'
import { Link } from 'react-router-dom';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Forms from './forms'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as axios from "axios";
jest.mock('axios')

configure({ adapter: new Adapter() });

let wrapper
beforeAll(() => {
    wrapper = shallow(<Forms history={[]} match={{ path: '/controlcenteragent' }} />, { disableLifecycleMethods: true })
    wrapper.setState({ isLoading: true })
})

const data = {
    data:
        [
            {
                "fields": [
                    {
                        "_id": "5f0aca54b36b864f2470525f",
                        "name": "location",
                        "value": "",
                        "type": "location",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca54b36b864f24705260",
                        "name": "date",
                        "value": "",
                        "type": "date",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca55b36b864f24705261",
                        "name": "water",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca55b36b864f24705262",
                        "name": "blanket",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca55b36b864f24705263",
                        "name": "food",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca55b36b864f24705264",
                        "name": "first aid supply",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca55b36b864f24705265",
                        "name": "tent",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca56b36b864f24705266",
                        "name": "heater",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    }
                ],
                "location": [],
                "_id": "5f0aca56b36b864f24705267",
                "title": "Essentials",
                "is_base_form": true,
                "__v": 0
            },
            {
                "fields": [
                    {
                        "_id": "5f0aca83b36b864f24705268",
                        "name": "location",
                        "value": "",
                        "type": "location",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca83b36b864f24705269",
                        "name": "date",
                        "value": "",
                        "type": "date",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca84b36b864f2470526a",
                        "name": "dead",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca84b36b864f2470526b",
                        "name": "injured",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca84b36b864f2470526c",
                        "name": "critically injured",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca84b36b864f2470526d",
                        "name": "ambulance needed",
                        "value": "",
                        "type": "number",
                        "__v": 0
                    }
                ],
                "location": [],
                "_id": "5f0aca84b36b864f2470526e",
                "title": "Casualties",
                "is_base_form": true,
                "__v": 0
            },
            {
                "fields": [
                    {
                        "_id": "5f0aca91b36b864f2470526f",
                        "name": "location",
                        "value": "",
                        "type": "location",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca91b36b864f24705270",
                        "name": "date",
                        "value": "",
                        "type": "date",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca91b36b864f24705271",
                        "name": "email",
                        "value": "",
                        "type": "email",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca92b36b864f24705272",
                        "name": "name",
                        "value": "",
                        "type": "name",
                        "__v": 0
                    },
                    {
                        "_id": "5f0aca92b36b864f24705273",
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
                    }
                ],
                "location": [],
                "_id": "5f0aca92b36b864f24705274",
                "title": "Blood donation",
                "is_base_form": true,
                "__v": 0
            }
        ]
}

describe('componentDidMount', () => {
    it(`should test componentDidMount lifecycle when get() fails`, () => {
        //mock the api call
        const spyDidMount = jest.spyOn(Forms.prototype, "componentDidMount");
        axios.get.mockImplementation(() => Promise.reject("Error 404"))
        const returnedPromise = wrapper.instance().componentDidMount();
        expect(spyDidMount).toHaveBeenCalled();
        returnedPromise.then(() => { }, () => {
            expect(wrapper.state().isLoading).toBe(true);
            expect(wrapper.state().forms).toBeFalsy()
        })
        spyDidMount.mockRestore()
    });
    it(`should test componentDidMount lifecycle when get() succeed`, () => {
        //mock the api call
        const spyDidMount = jest.spyOn(Forms.prototype, "componentDidMount");
        axios.get.mockImplementation(() => Promise.resolve(data))
        const returnedPromise = wrapper.instance().componentDidMount();
        expect(spyDidMount).toHaveBeenCalled();
        returnedPromise.then(() => {
            expect(wrapper.state().isLoading).toBe(false);
            expect(wrapper.state().forms).toMatchObject(data.data)
        }, () => { })
        spyDidMount.mockClear()
        axios.mockReset();
    });
});


describe(`Forms component 'render' method`, () => {
    it(`should test the render method when 'isLoading' is true`, () => {
        wrapper.setState({ isLoading: true })
        expect(wrapper.contains(<div><Spinner /></div>)).toBe(true)
    });
    it(`should test the render method when 'isLoading' is false and prop.math.path = 'controlcenteragent'`, () => {
        wrapper.setState({ isLoading: false })
        expect(wrapper.find('li')).toHaveLength(3)
        expect(wrapper.find(Link).at(0).prop('to')).toContain('/controlcenteragent')
        expect(wrapper.find(Link).at(1).prop('to')).toContain('/controlcenteragent')
        expect(wrapper.find(Link).at(2).prop('to')).toContain('/controlcenteragent')
    });
    it(`should test the render method when 'isLoading' is false and prop.math.path = 'fieldagent'`, () => {
        wrapper.setState({ isLoading: false })
        wrapper.setProps({match:{ path: '/fieldagent' }})
        expect(wrapper.find('li')).toHaveLength(3)
        expect(wrapper.find(Link).at(0).prop('to').pathname).toContain('/forms')
        expect(wrapper.find(Link).at(1).prop('to').pathname).toContain('/forms')
        expect(wrapper.find(Link).at(2).prop('to').pathname).toContain('/forms')
    });
});

