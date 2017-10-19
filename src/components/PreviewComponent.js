var React = require('react');
var ReactDOM = require('react-dom');

class PreviewComponent extends React.Component {


  render() {
    const customerInfo = this.props.customerInfo;
    const date = this.props.dueDate;
    const lineItems = this.props.lineItems;

    return (
             <div>
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
                    </tbody>
                  </table>
                  <table>
                    <tbody>
                      <tr>
                          <th>Line#</th>
                          <th>Description</th>
                          <th>Amount</th>
                      </tr>
                      {
                        lineItems &&
                        lineItems.map(lineItem => (
                          <tr key={lineItem.lineDescription}>
                            <td>{lineItem.lineDescription}</td>
                            <td>{lineItem.lineDescription}</td>
                            <td>{lineItem.lineAmount}</td>
                          </tr>
                      ))
                      }
                    </tbody>
                  </table>
             </div>
       )
  }
}

export default PreviewComponent;
