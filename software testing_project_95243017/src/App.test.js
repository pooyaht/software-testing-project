import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App'
import Blog from './containers/Blog/Blog'
import {BrowserRouter} from 'react-router-dom'

configure({ adapter: new Adapter() });

describe('App', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<App />);
    });
    it('should test the app component', () => {
        expect(wrapper.contains(
            <BrowserRouter>
                <Blog />
            </BrowserRouter>)).toBe(true)
    });
});