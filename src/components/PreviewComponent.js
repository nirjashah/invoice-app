import React, {Component} from 'react';
import '../style/PreviewComponent.css';
import { browserHistory } from 'react-router';

/**
 * PreviewComponent renders tatal amount
 * ParentComponent: InvoiceContainer
 */
class PreviewComponent extends Component {


  render() {
    const customerInfo = this.props.customerInfo;
    const date = this.props.dueDate;
    const lineItems = this.props.lineItems;
    let totalAmount = 0.00;
    lineItems.forEach(function(lineItem){
        totalAmount = totalAmount + parseFloat(lineItem.lineAmount);
    });

    return (
             <div>
                 <div>
                     <button className='back-button'
                             onClick={browserHistory.goBack}>Back</button>
                 </div>
                 <div className='invoice-box'>
                      <h3>Your Invoice</h3>
                      <table>
                        <tbody>
                          <tr className='customerName'>
                              <th>Customer Name: {customerInfo.customerName}</th>
                          </tr>
                          <tr className='customerEmail'>
                              <th>Customer Email: {customerInfo.customerEmail}</th>
                          </tr>
                          <tr className='invoiceDate'>
                              <th>Date: {date}</th>
                          </tr>
                          <tr>
                              <th>Line#</th>
                              <th>Description</th>
                              <th>Amount</th>
                          </tr>
                          {
                            lineItems &&
                            lineItems.map(lineItem => (
                              <tr key={lineItem.lineItemID} className='lineItem'>
                                <td>{lineItem.lineItemID}</td>
                                <td>{lineItem.lineDescription}</td>
                                <td>{lineItem.lineAmount}</td>
                              </tr>
                          ))
                          }
                          <tr className='total'>
                              <th>Total: {totalAmount}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
               </div>
       )
  }
}

export default PreviewComponent;
