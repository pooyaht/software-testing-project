import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BackDrop from './BackDrop'

configure({adapter: new Adapter()});

describe('BackDrop', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BackDrop />);
    });
    it('should return null when props.show is false', () => {
        wrapper.setProps({show : false})
        expect(wrapper.html()).toBe(null)
    });
    it('should return a div when props.show is true', () => {
        wrapper.setProps({show : true})
        expect(wrapper.find('div').findWhere(n=> n.prop('className')==='Backdrop')).toHaveLength(1)
    });
    
});