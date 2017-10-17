import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';

import InvoiceContainer from '../components/InvoiceContainer';
import {getDateInRequiredFormat} from '../util/DateUtil';

it('Test InvoiceContainer child components rendering', () => {
    const invoiceContainerWrapper = shallow(<InvoiceContainer />);
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

it('Test that InvoiceContainer renders total amount', () => {
    const invoiceContainerWrapper = shallow(<InvoiceContainer />);
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
              },
              {
                  lineItemID: 1,
                  lineDescription: 'Trowser',
                  lineAmount: '25.00'
              }
        ],
        invoiceSent: false,
        showErrorMessage: false
    });
    expect(invoiceContainerWrapper.find('label.total-label')).to.have.length(1);
    expect(invoiceContainerWrapper.find('label.total-label').text()).to.equal('TOTAL $: 37.50');
});

it('Test that error message is rendered when customer details are blank', () => {
    const invoiceContainerWrapper = shallow(<InvoiceContainer />);
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
    expect(
        invoiceContainerWrapper.find('span.error-message').text()).to.equal('Make sure that customer details are entered');
    });

it('Test that success message and button to create a new invoice is displayed after invoice is sent', () => {
    const invoiceContainerWrapper = shallow(<InvoiceContainer />);
    invoiceContainerWrapper.setState({
        customerInfo: {
            customerName: 'James',
            customerEmail: 'james@gmail.com'
        },
        dueDate: getDateInRequiredFormat(new Date(), 30),
        lineItems: [
            {
                id: 0,
                invoiceDescription: 'TShirt',
                invoiceAshallow: '12.0'
            }
        ],
        invoiceSent: true,
        showErrorMessage: false
    });
    expect(invoiceContainerWrapper.find('button.new-invoice')).to.have.length(1);
    expect(invoiceContainerWrapper.find('button.new-invoice').text()).to.equal('CREATE NEW INVOICE');
});

it('Test that invoice form is created again when clicked on creat new invoice button', () => {
    const invoiceContainerWrapper = shallow(<InvoiceContainer />);
    invoiceContainerWrapper.setState({
        customerInfo: {
            customerName: 'James',
            customerEmail: 'james@gmail.com'
        },
        dueDate: getDateInRequiredFormat(new Date(), 30),
        lineItems: [
            {
                id: 0,
                invoiceDescription: 'TShirt',
                invoiceAshallow: '12.0'
            }
        ],
        invoiceSent: true,
        showErrorMessage: false
    });
    expect(invoiceContainerWrapper.find('button.new-invoice')).to.have.length(1);
    invoiceContainerWrapper.find('button.new-invoice').simulate('click');
    expect(invoiceContainerWrapper.find('CustomerInfoComponent')).to.have.length(1);
    expect(invoiceContainerWrapper.find('DateComponent')).to.have.length(1);
    expect(invoiceContainerWrapper.find('LineItemsComponent')).to.have.length(1);
    expect(invoiceContainerWrapper.find('button.send-invoice')).to.have.length(1);
});
