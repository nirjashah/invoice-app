import React, {Component} from 'react';
import '../style/InvoiceListComponent.css';

/**
 * InvoiceListComponent renders list of invoices
 */
class InvoiceListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoices: []
        };
    }

    componentDidMount(){
        fetch('http://localhost:3001/invoices')
        .then(function(response) {
          return response.json()
        })
        .then(responseJson=> {
          this.setState({
              invoices: responseJson["Data"]
          })

        })
    }

    /**
     * Method to render InvoiceListComponent.
     */
    render() {
        return (
                <div>
                    Hello
                </div>
        );
    }
}

export default InvoiceListComponent;
