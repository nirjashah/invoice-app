import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';

import CustomerInfoComponent from '../components/CustomerInfoComponent';

it('Test CustomerInfoComponent rendering', () => {
    var customerInfo = {
        customerName: 'James',
        customerEmail: 'james@gmail.com'
    };
    const wrapper = shallow(<CustomerInfoComponent customerInfo={customerInfo} />);
    expect(wrapper.find('.customer-information')).to.have.length(1);
    expect(wrapper.find('.customer-name-label')).to.have.length(1);
    expect(wrapper.find('.customer-email-label')).to.have.length(1);
    expect(wrapper.find('.customer-email-input')).to.have.length(1);
    expect(wrapper.find('.customer-name-input')).to.have.length(1);

});

it('Simulates customer name change event', () => {
   var customerInfo = {
       customerName: 'James',
       customerEmail: 'james@gmail.com'
   };
   const onNameChange = sinon.spy();
   const wrapper = shallow(<CustomerInfoComponent customerInfo={customerInfo}
                                                  onCustomerNameChange={onNameChange} />);
   wrapper.find('.customer-name-input').simulate('blur');
   expect(onNameChange).to.have.property('callCount', 1);
 });

 it('Simulates customer email change event', () => {
     var customerInfo = {
         customerName: 'James',
         customerEmail: 'james@gmail.com'
     };
    const onEmailChange = sinon.spy();
    const wrapper = shallow(<CustomerInfoComponent customerInfo={customerInfo}
                                                   onCustomerEmailChange={onEmailChange} />);
    wrapper.find('.customer-email-input').simulate('blur');
    expect(onEmailChange).to.have.property('callCount', 1);
  });
