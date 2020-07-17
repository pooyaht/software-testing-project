import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Role,clicked} from './Role'

configure({adapter: new Adapter()});

describe('clicked', () => {
    it('should modify title and push it into history', () => {
        let props = {history :[], title :'test roleClicked func'}
        clicked(props);
        expect(props.history[props.history.length-1]).toBe(props.title.split(' ').join('').toLowerCase());
    });
});

describe('Role', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Role />);
    });
    it('should contain a section tag and a header tag inside it', () => {
        wrapper.setProps({title : 'test role',history :[]})
        expect(wrapper.find('section').findWhere(n => n.prop('className')==='Role')).toHaveLength(1);
        expect(wrapper.contains(<h1>test role</h1>)).toBe(true);
        const section = wrapper.find('section').findWhere(n => n.prop('className')==='Role')
        section.prop('onClick')()
    });
});