import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Input ,{MyMarker} from './Input'
import MyImage from './../../../assets/map-marker-icon.png'

configure({adapter: new Adapter()});

describe('<MyMarker>',() =>{
    it(`should test MyMarker function`,() =>{
        let wrapper = shallow(<MyMarker/>)
        expect(wrapper.contains( <div className='Marker'><img src={MyImage} alt ="marker" width ="50px" height="50px"></img></div>)).toBe(true)
    });
})
describe('<Input />', () => {
    let wrapper;
    let props;
    const mockFn = jest.fn();
    
    afterEach(()=>{
        expect(wrapper.find('div').first().hasClass('Input')).toBe(true)
        expect(wrapper.contains(<label className='Label'>{props.elementName}</label>)).toBe(true)
    })
    it(`should test the 'password' case` , () => {
        props = {elementType:'password',elementName : 'password',value :null,changed : mockFn ,invalid :false,shouldValidate:true,touched:false}
        wrapper = shallow(<Input {...props} />)
        expect(wrapper.find('input').findWhere(n => n.prop('type')===props.elementType)).toHaveLength(1);
    });
    it(`should test the 'date' case` , () => {
        props = {elementType:'date',value :null,changed : mockFn ,invalid :false,shouldValidate:true,touched:false}
        wrapper = shallow(<Input {...props} />)
        expect(wrapper.find('input').findWhere(n => n.prop('type')===props.elementType)).toHaveLength(1);
    });
    it(`should test the 'input' case` , () => {
        props = {elementType:'input',elementName : 'input',value :null,changed : mockFn ,invalid :false,shouldValidate:true,touched:false}
        wrapper = shallow(<Input {...props} />)
        expect(wrapper.find('input').findWhere(n => n.prop('placeholder')===props.elementName)).toHaveLength(1);
    });
    it(`should test the 'location' case` , () => {
        props = {elementType:'location',elementName : 'location',value :[35,52],changed : mockFn ,invalid :false,shouldValidate:false,touched:false}
        wrapper = shallow(<Input {...props} />)
        const googleMap = wrapper.find('div').last().childAt(0)
        googleMap.prop('onClick')()
        expect(wrapper.find('div').last()).toBeDefined();
    });
    it(`should test the 'text' case` , () => {
        props = {elementType:'text',elementName : 'text',value :null,disabled : true,invalid :false,shouldValidate:false,touched:false}
        wrapper = shallow(<Input {...props} />)
        expect(wrapper.find('textarea')).toHaveLength(1);
    });
    it(`should test the 'dropdown' case` , () => {
        props = {elementType:'dropdown',elementName : 'dropdown',value :null,changed : mockFn ,elementOptions:[{label:'test1',value:'test2'}],invalid :false,shouldValidate:false,touched:false}
        wrapper = shallow(<Input {...props} />)
        expect(wrapper.find('select')).toHaveLength(1);
    });
    it(`should test the 'defult' case and the validation error` , () => {
        props = {elementType:'test',elementName : 'default',value :null,changed : mockFn,messages:['value of this field can\'t be empty'] ,invalid :true,shouldValidate:true,touched:true}
        wrapper = shallow(<Input {...props} />)
        expect(wrapper.find('input').findWhere(n => n.prop('placeholder')===props.elementName)).toHaveLength(1);
        expect(wrapper.contains(<p key={0} className='ValidationError'>value of this field can't be empty</p>)).toBe(true);
    });
});
