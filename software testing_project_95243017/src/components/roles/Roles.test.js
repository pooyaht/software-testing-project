import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Roles from './Roles'
import Role from './../role/Role'

configure({adapter: new Adapter()});

describe('Roles', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Roles />);
    });
    it('should have two elements of type Role', () => {
        expect(wrapper.find(Role)).toHaveLength(2);
    });
});