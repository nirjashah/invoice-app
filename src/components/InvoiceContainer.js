import React, {Component} from 'react';

import CustomerInfoComponent from './CustomerInfoComponent';
import DateComponent from './DateComponent';
import LineItemsComponent from './LineItemsComponent';
import {getDateInRequiredFormat} from '../util/DateUtil';
import {validCustomerName, validCustomerEmail,
    validAmount, generateNewInvoiceID} from '../util/BaseUtil';
import '../style/InvoiceContainer.css';

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

      //Initially line item ID is 0
      this.lineItemID = 0;
      //Handle app state
      this.state = {
          customerInfo: {
              customerName: '',
              customerEmail: ''
          },
          dueDate: getDateInRequiredFormat(new Date(), 30),
          lineItems: [
                {
                    lineItemID: this.lineItemID,
                    lineDescription: '',
                    lineAmount: '0'
                }
          ],
          errorMessage: '',
          showErrorMessage: false,
          invoiceSent: false
      };

      this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
      this.handleCustomerEmailChange = this.handleCustomerEmailChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleLineItemDescriptionChange = this.handleLineItemDescriptionChange.bind(this);
      this.handleLineItemAmountChange = this.handleLineItemAmountChange.bind(this);
      this.handleInvoiceButtonClick = this.handleInvoiceButtonClick.bind(this);
      this.handleSendInvoice = this.handleSendInvoice.bind(this);
      this.handleCreateNewInvoice = this.handleCreateNewInvoice.bind(this);
    }

    /**
     * Method to handle customer name changes from name input field
     * @param event Event object.
     */
    handleCustomerNameChange(event) {
        //Error message should disappear once corrected
        this.setState({
            errorMessage: '',
            showErrorMessage: false
        })
        if(!validCustomerName(event.target.value)){
            this.setState({
                errorMessage: 'Customer name can only contain letters A-Z, a-z and spaces',
                showErrorMessage: true
            })
            return;
        }
        let currentCustomerInfo = this.state.customerInfo;
        currentCustomerInfo.customerName = event.target.value;
        this.setState({
            customerInfo: currentCustomerInfo
        });
    }

    /**
     * Method to handle customer email changes from email input field
     * @param {event} Event object.
     */
    handleCustomerEmailChange(event) {
        //Error message should disappear once corrected
        this.setState({
            errorMessage: '',
            showErrorMessage: false
        })
        if(!validCustomerEmail(event.target.value)){
            this.setState({
                errorMessage: 'Customer name can only contain letters A-Z, a-z and spaces',
                showErrorMessage: true
            })
            return;
        }
        let currentCustomerInfo = this.state.customerInfo;
        currentCustomerInfo.customerEmail = event.target.value;
        this.setState({
            customerInfo: currentCustomerInfo
        });
    }

    /**
     * Method to handle date changes
     * @param {event} Event object
     */
    handleDateChange(event) {
        this.setState({
          dueDate: getDateInRequiredFormat(new Date(event.target.value), 1)
        });
    }

    /**
     * Method to handle line item description change
     * @param {event} Event object.
     */
    handleLineItemDescriptionChange(event) {
        let currentLineItems = this.state.lineItems;
        currentLineItems.forEach(function(lineItem) {
            if (parseInt(event.target.id) === lineItem.lineItemID) {
                lineItem.lineDescription = event.target.value;
            }
        });
        this.setState({
            lineItems: currentLineItems
        });
    }

    /**
     * Method to handle line item amount change
     * @param {event} Event object.
     */
    handleLineItemAmountChange(event) {
        //Error message should disappear once corrected
        this.setState({
            errorMessage: '',
            showErrorMessage: false
        })
        //Validate amount for  line item
        if(!validAmount(event.target.value)){
          let index = parseInt(event.target.id) + 1;
          this.setState({
              errorMessage: 'Enter valid line amount for line:' + index,
              showErrorMessage: true
          })
          return;
        }
        let currentLineItems = this.state.lineItems;
        currentLineItems.forEach(function(lineItem) {
            if (parseInt(event.target.id) === lineItem.lineItemID) {
                lineItem.lineAmount = event.target.value;
            }
        });
        this.setState({
            lineItems: currentLineItems
        });
    }

    /**
     * Method to add invoice line item on button click
     * @param {event} Event object.
     */
    handleInvoiceButtonClick(event) {

        let currentLineItems = this.state.lineItems;
        let index = currentLineItems.length-1;
        let lineItemCount = parseInt(currentLineItems[index].lineItemID) + 1;
        let newLineItem = {
            lineItemID: lineItemCount,
            lineDescription: '',
            lineAmount: '0'
        }
        currentLineItems.push(newLineItem);
        this.setState({
            lineItems: currentLineItems
        });
    }

    /**
     * Method to add send invoice on button click
     * @param {event} Event object.
     */
    handleSendInvoice(event) {
        if(this.state.customerInfo.customerName === '' ||
        this.state.customerInfo.customerName === ''){
            this.setState({
                errorMessage: 'Make sure that customer details are entered',
                showErrorMessage: true
            })
            return;
        }
        if(this.state.showErrorMessage){
            this.setState({
                errorMessage: 'Please resolve issues before invoice can be sent'
            })
            return;
        }
        const invoiceID = generateNewInvoiceID()
        const invoiceToBeStored = {
            invoiceID: invoiceID,
            customerInfo: this.state.customerInfo,
            dueDate: this.state.dueDate,
            lineItems: this.state.lineItems
        }
        localStorage.setItem(invoiceID, JSON.stringify(invoiceToBeStored));
        this.setState({
            invoiceSent: true,
            errorMessage: '',
            showErrorMessage: false,
        })
    }

    /**
     * Method to create new invoice on button click
     * @param {event} Event object.
     */
    handleCreateNewInvoice(event) {

        this.setState({
            invoiceSent:false,
            customerInfo: {
                customerName: '',
                customerEmail: ''
            },
            dueDate: getDateInRequiredFormat(new Date(), 30),
            lineItems: [
                  {
                      lineItemID: this.lineItemID,
                      lineDescription: '',
                      lineAmount: '0'
                  }
            ]
        })

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
    * Method to render LineItemsComponent
    */
    renderLineItemsComponent(){
        return(
          <LineItemsComponent
                  lineItems={this.state.lineItems}
                  onLineItemDescriptionChange={this.handleLineItemDescriptionChange}
                  onLineItemAmountChange={this.handleLineItemAmountChange}
                  onInvoiceButtonClick={this.handleInvoiceButtonClick}
          />
        );
    }

    /**
    * Method to render CustomerInfoComponent, DateComponent
    * and LineItemsComponent child components.
    */
    render(){
        const currentLineItems = this.state.lineItems;
        let totalAmount = 0.00;
        currentLineItems.forEach(function(lineItem){
            totalAmount = totalAmount + parseFloat(lineItem.lineAmount);
        })
        let app = (
            <div>
                <div>
                    {this.renderCustomerInfoComponent()}
                    {this.renderDateComponent()}
                    {this.renderLineItemsComponent()}
                </div>
                <div>
                  <label className='total-label'>
                      TOTAL $: {totalAmount.toFixed(2)}
                  </label>
                </div>
                <div>
                  <button className='send-invoice'
                    type='button'
                    onClick={this.handleSendInvoice}>
                      SEND
                  </button>
                </div>
            </div>
        );
        if(this.state.showErrorMessage){
          return(
            <div>
              <span className='error-message'>
                {this.state.errorMessage}
              </span>
              {app}
            </div>
          );
        }
        if(this.state.invoiceSent){
          return(
            <div>
              <span >
                  Invoice sent to local storage
              </span>
              <button className='new-invoice'
                type='button'
                onClick={this.handleCreateNewInvoice}>
                  CREATE NEW INVOICE
              </button>
            </div>
          );
        }
        return (
            <div>
                {app}
            </div>
        );

    }

  }

export default InvoiceContainer;
