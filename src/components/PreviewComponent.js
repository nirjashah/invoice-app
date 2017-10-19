import React, {Component} from 'react';
import '../style/PreviewComponent.css';

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
             <div className="invoice-box">
                  <h3>Your Invoice</h3>
                  <table>
                    <tbody>
                      <tr>
                          <th>Customer Name: {customerInfo.customerName}</th>
                      </tr>
                      <tr>
                          <th>Customer Email: {customerInfo.customerEmail}</th>
                      </tr>
                      <tr>
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
                          <tr key={lineItem.lineItemID}>
                            <td>{lineItem.lineItemID}</td>
                            <td>{lineItem.lineDescription}</td>
                            <td>{lineItem.lineAmount}</td>
                          </tr>
                      ))
                      }
                      <tr class="total">
                          <th>Total: {totalAmount}</th>
                      </tr>
                    </tbody>
                  </table>

             </div>
       )
  }
}

export default PreviewComponent;
