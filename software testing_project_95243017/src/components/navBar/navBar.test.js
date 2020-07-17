import React from 'react'
import {Link} from 'react-router-dom'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from './navBar'

configure({adapter: new Adapter()});

let wrapper;
beforeAll(() => {
    wrapper = shallow(<NavBar />);
});
describe('clicked', () => {
    it('should test the clicked function', () => {
        wrapper.instance().clicked()
        expect(localStorage.clear).toHaveBeenCalled()
    });
});
describe('navBar', () => {
    it(`should render two 'li' elements if authenticated`, () => {
        wrapper.setProps({cond:true})
        expect(wrapper.contains(<li><Link to="/">home</Link></li>)).toBe(true);
        expect(wrapper.contains(<li style={{float : "right"}} onClick={wrapper.instance().clicked}><Link to="/">Logout</Link></li>)).toBe(true);
    });
    it(`should render three 'li' elements if not authenticated`, () => {
        wrapper.setProps({cond:false})
        expect(wrapper.contains(<li><Link to="/">home</Link></li>)).toBe(true);
        expect(wrapper.contains(<li style={{float : "right"}}><Link to="/Login">Login</Link></li>)).toBe(true);
        expect(wrapper.contains(<li style={{float : "right"}}><Link to="/Signup">Sign up</Link></li>)).toBe(true);
    });
});


