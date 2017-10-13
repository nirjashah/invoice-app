import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';

import DateComponent from '../components/DateComponent';

it('Test DateComponent rendering', () => {
    const wrapper = shallow(<DateComponent />);
    expect(wrapper.find('.date-information')).to.have.length(1);
    expect(wrapper.find('.invoice-date-label')).to.have.length(1);
    expect(wrapper.find('.invoice-date-input')).to.have.length(1);
});

it('simulates date change events', () => {
   const onInputChange = sinon.spy();
   const wrapper = shallow(<DateComponent onDateChange={onInputChange}/>);
   wrapper.find('input').simulate('change');
   expect(onInputChange).to.have.property('callCount', 1);
 });
