import React, {Component} from 'react';
import LineItemComponent from './LineItemComponent.js';
import '../style/LineItemsComponent.css';

/**
 * LineItemsComponent renders line items
 * ParentComponent: InvoiceContainer
 */
class LineItemsComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.handleLineDescriptionChange = this.handleLineDescriptionChange.bind(this);
        this.handleLineAmountChange = this.handleLineAmountChange.bind(this);
        this.handleAddLineItemBtnClick = this.handleAddLineItemBtnClick.bind(this);
    }

    /**
     * Handler method to handle change on line desrciption input field
     * @param {event} Event object
     */
    handleLineDescriptionChange(event) {
        this.props.onLineItemDescriptionChange(event);
    }

    /**
     * Handler method to handle change on line amount input field
     * @param {event} Event object
     */
    handleLineAmountChange(event) {
        this.props.onLineItemAmountChange(event);
    }

    /**
     * Handler method to add line item on button click
     * @param {event} Event object
     */
    handleAddLineItemBtnClick(event) {
        this.props.onInvoiceButtonClick(event);
    }

    /**
     * Sub-render method to render line items
     * This calls child LineItemComponent to render individual line item
     */
    renderLineItems() {
         let lineItemsEntries = this.props.lineItems;
        //  onLineDescriptionChange={handleLineDescriptionChange}
        //  onLineAmountChange={handleLineAmountChange}
          var lineItems = lineItemsEntries.map((lineItem) => {
             return (
                 <LineItemComponent
                     id={lineItem.lineItemID}
                     lineDescription={lineItem.lineDescription}
                     lineAmount={lineItem.lineAmount}
                     onLineItemDescriptionChange={this.handleLineDescriptionChange}
                     onLineItemAmountChange={this.handleLineAmountChange}
                 />
             );
         })

         return lineItems;

    }

    /**
     * Method to render Line item labels, line items and labels
     */
    render() {
        return (
          <div>
              <div>
                  <div className='line-items-label-container'>
                      <label className='description-label'>{`Description`}</label>
                      <label className='amount-label'>{`Amount`}</label>
                  </div>
                  <div>
                      {this.renderLineItems()}
                  </div>
              </div>
              <div>
                  <button className='invoice-add-button'
                      type='button'
                      onClick={this.handleAddLineItemBtnClick}>
                      <b>+</b>
                  </button>
              </div>
          </div>

        );
    }
}

export default LineItemsComponent;
