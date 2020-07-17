import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WithClassWrapper from './withClassWrapper'

configure({adapter: new Adapter()});

describe('WithClassWrapper', () => {
    it('should return props.children when props does have children', () => {
        let wrapper = shallow(<WithClassWrapper classes = 'tempCSS'><div><div><h1>hi</h1></div></div></WithClassWrapper>)
        expect(wrapper.at(0).hasClass('tempCSS')).toBe(true)
        expect(wrapper.contains(<div><div><h1>hi</h1></div></div>)).toBe(true);
    });
});