import React from 'react';

import { configure, shallow,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SpecificForm, {renderMarkers} from './specificForm';
import Input from './../UI/Input/Input'

configure({adapter: new Adapter()});


describe('renderMarkers', () => {
    it('should return a Marker Object', () => {
        const maps = {Marker:jest.fn(x=>x)}
        expect(renderMarkers(null,maps,[35,52])).toMatchObject({map : null , position:  {lat :35 ,lng:52},title: "your location"});
    });
});


describe('<SpicificForm />', () => {
    let wrapper;
    const props = {state:
                    {form:
                        {location : [35,51],
                            fields:[{name: 'location',type: 'location',value: 'tehran'}
                                    ,{name:"date",type:'date',value:'2020-07-030'}
                                    ,{name:"water",type:'number',value:'32'}
                                    ,{name:"blanket",type:'number',value:'12'}
                                    ]
                                }
                            }
                        };
    it(`should contain three Input element with type = 'text' and one location element` , () => {
        wrapper = shallow(<SpecificForm location = {props}></SpecificForm>);
        expect(wrapper.find(Input).findWhere(n =>n.prop('elementType') === 'text')).toHaveLength(3);
        expect(wrapper.find('div').findWhere(n => n.prop('className')=== 'Input').find('div').last()).toBeDefined()
        wrapper.find('div').findWhere(n => n.prop('className')=== 'Input').find('div').last().childAt(0).prop('onGoogleApiLoaded')({map: null,maps:{Marker:jest.fn(x=>x)}})
    });
});
