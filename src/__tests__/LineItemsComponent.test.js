import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';

import LineItemsComponent from '../components/LineItemsComponent';

it('Test Line items component rendering', () => {
    const lineItems = [
        {
            lineItemID: 0,
            lineDescription: 'TShirt',
            lineAmount: '10.5'
        }
    ];
    const wrapper = shallow(<LineItemsComponent lineItems={lineItems}/>);
    expect(wrapper.find('.line-items-label-container')).to.have.length(1);
    expect(wrapper.find('.description-label')).to.have.length(1);
    expect(wrapper.find('.amount-label')).to.have.length(1);
    expect(wrapper.find('.invoice-add-button')).to.have.length(1);
    expect(wrapper.find('LineItemComponent')).to.have.length(1);
});

it('Test Line items component rendering with two line items', () => {
    const lineItems = [
        {
            lineItemID: 0,
            lineDescription: 'TShirt',
            lineAmount: '10.5'
        },
        {
            lineItemID: 1,
            lineDescription: 'Trowser',
            lineAmount: '30.25'
        }

    ];
    const wrapper = shallow(<LineItemsComponent lineItems={lineItems}/>);
    expect(wrapper.find('.line-items-label-container')).to.have.length(1);
    expect(wrapper.find('.description-label')).to.have.length(1);
    expect(wrapper.find('.amount-label')).to.have.length(1);
    expect(wrapper.find('.invoice-add-button')).to.have.length(1);
    expect(wrapper.find('LineItemComponent')).to.have.length(2);
});

it('Simulates line description change event', () => {
   const lineItems = [
       {
           lineItemID: 0,
           lineDescription: 'TShirt',
           lineAmount: '10.5'
        }
   ];
   const onBtnClick = sinon.spy();
   const wrapper = shallow(<LineItemsComponent lineItems={lineItems} onAddInvoiceButtonClick={onBtnClick}/>);
   wrapper.find('button').simulate('click');
   expect(onBtnClick).to.have.property('callCount', 1);
 });
