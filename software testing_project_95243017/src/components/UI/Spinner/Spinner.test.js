import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Spinner from './Spinner'

configure({adapter: new Adapter()});

describe('Spinner', () => {
    let wrapper;
    beforeEach(() => {wrapper = shallow(<Spinner/>)})
    it('should render the spinner', () => {
        expect(wrapper.contains(<div className='Loader'>Loading...</div>)).toBe(true);
    });
});
