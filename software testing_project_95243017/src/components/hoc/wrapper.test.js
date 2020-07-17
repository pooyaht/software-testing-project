import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Wrapper from './Wrapper'

configure({adapter: new Adapter()});

describe('Wrapper', () => {
    it('should return props.children when props does have children', () => {
        let wrapper = shallow(<Wrapper><div><div><h1>hi</h1></div></div></Wrapper>)
        expect(wrapper.contains(<div><div><h1>hi</h1></div></div>)).toBe(true);
    });
});