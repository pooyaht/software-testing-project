import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchInput from './SearchInput'

configure({adapter: new Adapter()});

describe('<SearchInput />', () => {
    let wrapper;
    let props;
    const mockFn = jest.fn();
    afterEach(()=>{
        expect(wrapper.find('div').first().hasClass('Input')).toBe(true)
    })
    it(`should test the 'date' case` , () => {
        props = {elementType:'date',elementTitle: 'date',value :null,value2 : null,changed : mockFn,changed2 : mockFn,clicked : mockFn}
        wrapper = shallow(<SearchInput {...props} />)
        expect(wrapper.find('input').findWhere(n => n.prop('type')===props.elementType)).toHaveLength(2);
    });
    it(`should test the 'num' case` , () => {
        props = {elementType:'num',elementTitle : 'input',value :null,value2 : null,changed : mockFn,changed2:mockFn,clicked:mockFn}
        wrapper = shallow(<SearchInput {...props} />)
        expect(wrapper.find('input').findWhere(n => n.prop('type')===props.elementTitle)).toHaveLength(2);
    });
    it(`should test the 'text' case` , () => {
        props = {elementType:'text',elementTitle : 'text',value :null,changed : mockFn ,clicked : mockFn}
        wrapper = shallow(<SearchInput {...props} />)
        expect(wrapper.find('input').findWhere(n => n.prop('placeholder')===props.elementTitle)).toHaveLength(1);
    });
});
