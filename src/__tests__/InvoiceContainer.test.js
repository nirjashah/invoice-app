import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import InvoiceContainer from '../components/InvoiceContainer';
import {MemoryRouter, withRouter} from 'react-router-dom';
import {getDateInRequiredFormat} from '../util/DateUtil';

it('Test InvoiceContainer child components rendering', () => {
    const invoiceContainerWrapper = mount(<MemoryRouter><InvoiceContainer /></MemoryRouter>);
    invoiceContainerWrapper.setState({
        customerInfo: {
            customerName: 'James',
            customerEmail: 'james@gmail.com'
        },
        dueDate: getDateInRequiredFormat(new Date(), 30),
        lineItems: [
              {
                  lineItemID: 0,
                  lineDescription: 'TShirt',
                  lineAmount: '12.50'
              }
        ],
        invoiceSent: false,
        showErrorMessage: false
    });
    expect(invoiceContainerWrapper.find('CustomerInfoComponent')).to.have.length(1);
    expect(invoiceContainerWrapper.find('DateComponent')).to.have.length(1);
    expect(invoiceContainerWrapper.find('LineItemsComponent')).to.have.length(1);
    expect(invoiceContainerWrapper.find('button.send-invoice')).to.have.length(1);
});


it('Test that error message is rendered when customer details are blank', () => {
    const invoiceContainerWrapper = mount(<MemoryRouter><InvoiceContainer /></MemoryRouter>);
    //Customer details are not set
    invoiceContainerWrapper.setState({
        customerInfo: {
            customerName: '',
            customerEmail: ''
        },
        dueDate: getDateInRequiredFormat(new Date(), 30),
        lineItems: [
              {
                  lineItemID: 0,
                  lineDescription: 'TShirt',
                  lineAmount: '12.50'
              }
        ],
        invoiceSent: false,
        showErrorMessage: false
    });
    //Click on send invoice button
    invoiceContainerWrapper.find('button.send-invoice').simulate('click');
    expect(invoiceContainerWrapper.find('span.error-message').text()).to.equal('Make sure that customer details are entered');
});
