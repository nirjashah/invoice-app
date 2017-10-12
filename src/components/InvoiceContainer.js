import React, {Component} from 'react';

import CustomerInfoComponent from './CustomerInfoComponent';
import DateComponent from './DateComponent';
//import LineItemsComponent from './LineItemsComponent';


//import '../style/AddInvoiceContainer.css';

/**
 * InvoiceContainer is a parent container component, responsible for holding the application state
 * and rendering the child components- CustomerInfoComponent, DateComponent and LinesItemsComponents
 * State is passed down to the child components via props
 */
class InvoiceContainer extends Component {

    constructor(props) {
      super(props);
      //Handle app state
      this.state = {
          customerInfo: {
              customerName: '',
              customerEmail: '',
              startDate: ''
          }
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
    handleDateChange(date) {
        this.setState({
          startDate: date
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
    *
    */
    renderDateComponent(){
        return(
          <DateComponent
                  onDateChange={this.handleDateChange}
                  startDate={this.state.startDate}
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
