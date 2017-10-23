import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import {getDateInRequiredFormat} from '../util/DateUtil';

import PreviewComponent from '../components/PreviewComponent';

it('Test PreviewComponent rendering', () => {
    const customerInfo = {
        customerName: 'James',
        customerEmail: 'james@gmail.com'
    };
    const lineItems = [
          {
              lineItemID: 0,
              lineDescription: 'TShirt',
              lineAmount: '10.5'
          }
      ];
    const dueDate = getDateInRequiredFormat(new Date(), 30);
    const wrapper = shallow(<PreviewComponent  lineItems={lineItems}
                                               customerInfo={customerInfo}
                                                dueDate= {dueDate}/>);
    expect(wrapper.find('.invoice-box')).to.have.length(1);
    expect(wrapper.find('.customerName')).to.have.length(1);
    expect(wrapper.find('.customerName').text()).to.equal('Customer Name: James');
    expect(wrapper.find('.customerEmail')).to.have.length(1);
    expect(wrapper.find('.customerEmail').text()).to.equal('Customer Email: james@gmail.com');
    expect(wrapper.find('.invoiceDate')).to.have.length(1);
    expect(wrapper.find('.total')).to.have.length(1);
    expect(wrapper.find('.total').text()).to.equal('Total: 10.5');
});
