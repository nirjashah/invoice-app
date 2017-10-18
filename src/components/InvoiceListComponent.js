import React, {Component} from 'react';
import '../style/InvoiceListComponent.css';

/**
 * InvoiceListComponent renders list of invoices
 */
class InvoiceListComponent extends Component {

    constructor(props) {
        super(props);
        this.handleInvoiceDateChange = this.handleInvoiceDateChange.bind(this);
    }

    /**
     * Handler method to handle change on Invoice date field
     * @param {event} Event object
     */
    handleInvoiceDateChange(event) {
        this.props.onDateChange(event);
    }

    /**
     * Sub-render method to render date field.
     */
    renderDateField() {
        return (
           <input
              className='invoice-date-input'
              type='date'
              value={this.props.dueDate}
              onChange={this.handleInvoiceDateChange}
          />
        );
    }

    /**
     * Method to render InvoiceListComponent.
     */
    render() {
        return (
                <div className='date-information'>
                    <label className='invoice-date-label'>{`Due Date`}</label>
                    {this.renderDateField()}
                </div>
        );
    }
}

export default InvoiceListComponent;
