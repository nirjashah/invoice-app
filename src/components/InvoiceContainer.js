import React, {Component} from 'react';

import CustomerInfoComponent from './CustomerInfoComponent';
import DateComponent from './DateComponent';
import {getDateInRequiredFormat} from '../util/DateUtil'
//import LineItemsComponent from './LineItemsComponent';


//import '../style/AddInvoiceContainer.css';

/**
 * InvoiceContainer is a parent container component, responsible for holding the application state
 * and rendering the child components- CustomerInfoComponent, DateComponent and LinesItemsComponents
 * State is passed down to the child components via props
 */
class InvoiceContainer extends Component {

    /*
    * dueDate in state adds 30 days to current date to represent new due date
    *
    */
    constructor(props) {
      super(props);
      //Handle app state
      this.state = {
          customerInfo: {
              customerName: '',
              customerEmail: ''
          },
          dueDate: getDateInRequiredFormat(new Date(), 30)
      };

      this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
      this.handleCustomerEmailChange = this.handleCustomerEmailChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
    }

    /**
     * Method to handle customer name changes from name input field
     * @param event Event object.
     */
    handleCustomerNameChange(event) {
        let currentCustomerInfo = this.state.customerInfo;
        currentCustomerInfo.customerName = event.target.value;
        this.setState({
            customerInfo: currentCustomerInfo
        });
    }

    /**
     * Method to handle customer email changes from email input field
     * @param event Event object.
     */
    handleCustomerEmailChange(event) {
        let currentCustomerInfo = this.state.customerInfo;
        currentCustomerInfo.customerEmail = event.target.value;
        this.setState({
            customerInfo: currentCustomerInfo
        });
    }

    /**
     * Method to handle date changes
     * @param event Event object.
     */
    handleDateChange(event) {
        this.setState({
          dueDate: getDateInRequiredFormat(new Date(event.target.value), 1)
        });
    }

    /**
    * Method to render CustomerInfoComponent
    *
    */
    renderCustomerInfoComponent(){
        return(
            <CustomerInfoComponent
                  customerInfo={this.state.customerInfo}
                  onCustomerNameChange={this.handleCustomerNameChange}
                  onCustomerEmailChange={this.handleCustomerEmailChange}
            />
        );
    }

    /**
    * Method to render CustomerInfoComponent
    */
    renderDateComponent(){
        return(
          <DateComponent
                  onDateChange={this.handleDateChange}
                  dueDate={this.state.dueDate}
            />
        );
    }

    /**
    * Method to render CustomerInfoComponent, DateComponent
    * and LineItemsComponent child components.
    */
    render(){
        return (
          <div>
              {this.renderCustomerInfoComponent()}
              {this.renderDateComponent()}
          </div>
        );

    }

  }

export default InvoiceContainer;
