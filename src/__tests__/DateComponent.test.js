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
   const onButtonClick = sinon.spy();
   const wrapper = shallow(<DateComponent onChange={onButtonClick} onDateChange={onButtonClick}/>);
   wrapper.find('input').simulate('change');
   expect(onButtonClick).to.have.property('callCount', 1);
 });
