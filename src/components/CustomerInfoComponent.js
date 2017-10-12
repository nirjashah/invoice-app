import React, {Component} from 'react';
import '../style/CustomerInfoComponent.css';

/**
 * CustomerInfoComponent renders Customer details like name and email
 */
class CustomerInfoComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
        this.handleCustomerEmailChange = this.handleCustomerEmailChange.bind(this);
    }

    /**
     * Handler method to handle change on CustomerName field.
     * @param event Event object.
     */
    handleCustomerNameChange(event) {
        this.props.onCustomerNameChange(event);
    }

    /**
     * Handler method to handle change on CustomerEmail field.
     * @param event Event object.
     */
    handleCustomerEmailChange(event) {
        this.props.onCustomerEmailChange(event);
    }

    /**
     * Sub-render method to render customer name field.
     */
    renderCustomerNameField() {
        return (
            <input
                className='customer-name-input'
                type='text'
                name='customerName'
                defaultValue={this.props.customerName}
                onBlur={this.handleCustomerNameChange}
            />
        );
    }

    /**
     * Sub-render method to render customere email input field.
     */
    renderCustomerEmailField() {
        return (
            <input
                className='customer-email-input'
                type='text'
                name='customerEmail'
                defaultValue={this.props.customerEmail}
                onBlur={this.handleCustomerEmailChange}
            />
        );
    }

    /**
     * Render method to render CustomerInfoComponent.
     */
    render() {
        return (
            <div className='customer-information'>
                <div>
                    <label className='customer-name-label'>{`Name`}</label>
                    {this.renderCustomerNameField()}
                </div>
                <div>
                    <label className='customer-email-label'>{`Email`}</label>
                    {this.renderCustomerEmailField()}
                </div>

            </div>
        );
    }
}

export default CustomerInfoComponent;
