var React = require('react');
var ReactDOM = require('react-dom');

class PreviewComponent extends React.Component {

  render() {
    var customerInfo = this.props.customerInfo;
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
                    </tbody>
                  </table>
             </div>
       )
  }
}

export default PreviewComponent;
