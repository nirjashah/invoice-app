import React, {Component} from 'react';
import LineItemComponent from './LineItemComponent.js';

/**
 * LineItemsComponent renders line items
 */
class LineItemsComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.handleLineDescriptionChange = this.handleLineDescriptionChange.bind(this);
        this.handleLineAmountChange = this.handleLineAmountChange.bind(this);
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
     * Method to render DateComponent.
     */
    render() {
        return (
            <div>
                <div className='line-items-container'>
                    <label className='description-label'>{`Description`}</label>
                    <label className='amount-label'>{`Amount`}</label>
                </div>
                <div>
                    {this.renderLineItems()}
                </div>
            </div>

        );
    }
}

export default LineItemsComponent;
