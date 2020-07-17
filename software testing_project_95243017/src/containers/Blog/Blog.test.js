import React from 'react'

import { Route, Switch } from 'react-router-dom';
import Blog, { NavRoute } from './Blog'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from '../../components/navBar/navBar'

configure({ adapter: new Adapter() });

describe('NavRoute', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavRoute path = 'test path' component = {Blog}/>);
    });
    it('should test the NavRoute Component', () => {
        const Func = wrapper.prop('render');
        let renderFuncWrapper = shallow(<Func/>)
        expect(renderFuncWrapper.contains(<div><NavBar/><Blog /></div>)).toBe(true)
        expect(wrapper.find(Route).findWhere(n => n.prop('path')==='test path')).toHaveLength(1)
    });
});

describe('Blog', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Blog />);
    });
    it('should check routes of app', () => {
        expect(wrapper.find(Switch)).toHaveLength(1);
        expect(wrapper.find(NavRoute)).toHaveLength(6);
        expect(wrapper.find(Route)).toHaveLength(2);
        const Login = wrapper.find(Route).findWhere(n => n.prop('path')==='/Login').prop('render');
        const Signup = wrapper.find(Route).findWhere(n => n.prop('path')==='/Signup').prop('render');
        const loginComponent = shallow(<Login/>);
        const signUpComponent = shallow(<Signup/>);
        expect(loginComponent).toHaveLength(1)
        expect(signUpComponent).toHaveLength(1)
    });
});