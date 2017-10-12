import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/DateComponent.css';


/**
 * CustomerInfoComponent renders Customer details like name and email
 */
class DateComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.handleInvoiceDateChange = this.handleInvoiceDateChange.bind(this);
    }

    /**
     * Handler method to handle change on Invoice date field.
     * @param event Event object.
     */
    handleInvoiceDateChange(event) {
        this.props.onDateChange(event);
    }

    /**
     * Sub-render method to render date field.
     */
    renderDateField() {
        return (
           <DatePicker
              className='invoice-date-input'
              selected={this.props.dueDate}
              onChange={this.handleInvoiceDateChange}
              defaultValue={this.props.dueDate}
          />
        );
    }

    /**
     * Render method to render DateComponent.
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

export default DateComponent;
