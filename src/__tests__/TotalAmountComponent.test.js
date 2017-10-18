import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';

import TotalAmountComponent from '../components/TotalAmountComponent';

it('Test that TotalAmountComponent renders total amount', () => {
    var lineItems = [
          {
              lineItemID: 0,
              lineDescription: 'TShirt',
              lineAmount: '12.50'
          },
          {
              lineItemID: 1,
              lineDescription: 'Trowser',
              lineAmount: '25.00'
          }
    ]
    const totalCompoentWrapper = shallow(<TotalAmountComponent lineItems={lineItems}/>);

    expect(totalCompoentWrapper.find('label.total-label')).to.have.length(1);
    expect(totalCompoentWrapper.find('label.total-label').text()).to.equal('TOTAL $: 37.50');
});
