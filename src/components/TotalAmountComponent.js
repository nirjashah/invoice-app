import React, {Component} from 'react';
import '../style/TotalAmountComponent.css';

/**
 * TotalAmountComponent renders tatal amount
 * ParentComponent: InvoiceContainer
 */
class TotalAmountComponent extends Component {

    constructor(props) {
        super(props);}

    /**
     * Method to render total amount.
     */
    render() {
        const currentLineItems = this.props.lineItems;
        let totalAmount = 0.00;
        currentLineItems.forEach(function(lineItem){
            totalAmount = totalAmount + parseFloat(lineItem.lineAmount);
        });
        return (
              <label className='total-label'>
                  TOTAL $: {totalAmount.toFixed(2)}
              </label>
        );
    }
}

export default TotalAmountComponent;
