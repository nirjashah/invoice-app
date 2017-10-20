import React, {Component} from 'react';

import CustomerInfoComponent from './CustomerInfoComponent';
import DateComponent from './DateComponent';
import LineItemsComponent from './LineItemsComponent';
import TotalAmountComponent from './TotalAmountComponent';
import PreviewComponent from './PreviewComponent';
import { Link, Route } from 'react-router-dom';
import {getDateInRequiredFormat} from '../util/DateUtil';
import {validCustomerName, validCustomerEmail,
    validAmount} from '../util/BaseUtil';
import '../style/InvoiceContainer.css';

/**
 * InvoiceContainer is a parent container component, responsible for holding the application state
 * and rendering the child components- CustomerInfoComponent, DateComponent and LinesItemsComponents
 * and PreviewComponent
 * State is passed down to the child components via props
 */
class InvoiceContainer extends Component {

    /*
    * dueDate in state adds 30 days to current date to represent new due date
    * {data} represents data for typeAheadData for line item description
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
          invoiceSent: false,
          data: ["Hours", "Service", "Oil change",
          "Brakes", "Tires", "Filter", "Batteries", "Steering" ]
      };

      //Handler methods
      this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
      this.handleCustomerEmailChange = this.handleCustomerEmailChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleLineItemDescriptionChange = this.handleLineItemDescriptionChange.bind(this);
      this.handleLineItemAmountChange = this.handleLineItemAmountChange.bind(this);
      this.handleInvoiceButtonClick = this.handleInvoiceButtonClick.bind(this);
      this.handleSendInvoice = this.handleSendInvoice.bind(this);
      this.handlePreviewInvoice = this.handlePreviewInvoice.bind(this);
      }

    /**
     * Method to handle customer name changes from name input field
     * @param event Event object.
     */
    handleCustomerNameChange(event) {
        //Error message should disappear once corrected
        this.setState({
            errorMessage: '',
            showErrorMessage: false,
            invoiceSent:false
        })
        //Validate customer name
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
        //Validate email address
        if(!validCustomerEmail(event.target.value)){
            this.setState({
                errorMessage: 'Enter valid email adress',
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
        this.state.customerInfo.customerEmail === ''){
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

        //Store the invoice in MySQL database using express
        const invoiceToBeStored = {
            customerInfo: this.state.customerInfo,
            dueDate: this.state.dueDate,
            lineItems: this.state.lineItems
        }
        fetch('http://localhost:3001/invoices', {
          	method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
          	body: JSON.stringify({
            		invoiceToBeStored: invoiceToBeStored
          	})
        }).then(function (data) {
          console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
          console.log('Request to save invocie failed', error);
        });

        this.setState({
            invoiceSent: true,
            errorMessage: '',
            showErrorMessage: false,
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
    * Method to preview invoice
    */
    handlePreviewInvoice() {
      this.setState({
          invoiceSent: false
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
                  data={this.state.data}
                  onLineItemDescriptionChange={this.handleLineItemDescriptionChange}
                  onLineItemAmountChange={this.handleLineItemAmountChange}
                  onAddInvoiceButtonClick={this.handleInvoiceButtonClick}
          />
        );
    }

    /**
    * Method to render totalAmount
    */
    renderTotalAmountComponent(){
        return(
          <TotalAmountComponent
                  lineItems={this.state.lineItems}
          />
        );
    }


    /**
    * Method to render CustomerInfoComponent, DateComponent
    * and LineItemsComponent child components.
    */
    render(){
        let errorMessage, invocieSentMessage;
        if(this.state.showErrorMessage){
            errorMessage = (
              <div>
                <span className='error-message'>
                  {this.state.errorMessage}
                </span>
              </div>
            );
        }
        if(this.state.invoiceSent){
            invocieSentMessage = (
              <div>
                <span className='invoice-sent-message'>
                    Invoice sent to database
                </span>
              </div>
            );
        }

        let app = (
            //Key will initialize the state of child componets when invoice is sent
            <div key={this.state.invoiceSent}>
                <div>{errorMessage}</div>
                <div>{invocieSentMessage}</div>
                <div>
                    <div>
                        {this.renderCustomerInfoComponent()}
                        {this.renderDateComponent()}
                        {this.renderLineItemsComponent()}
                        {this.renderTotalAmountComponent()}
                    </div>
                    <div>
                      <button className='send-invoice'
                          type='button'
                          onClick={this.handleSendInvoice}>
                            SEND
                      </button>
                      <Link to={{pathname:`/preview`}}
                            onClick={this.handlePreviewInvoice}>
                          Preview
                      </Link>
                    </div>
                </div>
            </div>
        );
        return (
          <div>
              <Route exact path="/"
                     render={(props) =>
                       <div>
                          {app}
                       </div>
                     }
              />
              <Route path="/preview"
                     render={(props) =>
                            <PreviewComponent {...props}
                            customerInfo={this.state.customerInfo}
                            dueDate={this.state.dueDate}
                            lineItems={this.state.lineItems}
                            />}
              />
            </div>
        );

    }

  }

export default InvoiceContainer;
