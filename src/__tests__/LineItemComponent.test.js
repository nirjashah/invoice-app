import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';

import LineItemComponent from '../components/LineItemComponent';

it('Test LineItemComponent rendering', () => {
    const wrapper = shallow(<LineItemComponent />);
    expect(wrapper.find('.line-description-input')).to.have.length(1);
    expect(wrapper.find('.line-amount-input')).to.have.length(1);
});

it('Simulates line item description change event', () => {
  const onDescriptionChange = sinon.spy();
  const wrapper = shallow(<LineItemComponent onLineItemDescriptionChange={onDescriptionChange}/>);
  wrapper.find('.line-description-input').simulate('blur');
  expect(onDescriptionChange).to.have.property('callCount', 1);
 });

 it('Simulates line item amount change event', () => {
   const onAmountChange = sinon.spy();
   const wrapper = shallow(<LineItemComponent onLineItemAmountChange={onAmountChange}/>);
   wrapper.find('.line-amount-input').simulate('blur');
   expect(onAmountChange).to.have.property('callCount', 1);
  });
