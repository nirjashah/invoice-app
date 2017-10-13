import React, {Component} from 'react';

/**
 * LineItemComponent renders single line item
 */
class LineItemComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.handleLineDescriptionChange = this.handleLineDescriptionChange.bind(this);
        this.handleLineAmountChange = this.handleLineAmountChange.bind(this);
    }

    /**
     * Handler method to handle line description change
     * @param {event} Event object.
     */
    handleLineDescriptionChange(event) {
        this.props.onLineItemDescriptionChange(event);
    }

    /**
     * Handler method to handle line amount change
     * @param {event} Event object.
     */
    handleLineAmountChange(event) {
        this.props.onLineItemAmountChange(event);
    }

    /**
     * Method to render individual line component.
     */
    render() {
        return (
                <div className='line-items-input'>
                    <input className='line-description'
                        id={this.props.id}
                        type="text"
                        defaultValue={this.props.lineDescription}
                        onBlur={this.handleLineDescriptionChange}
                    />
                    <input className='line-amount-input'
                        id={this.props.id}
                        type="text"
                        defaultValue={this.props.lineAmount}
                        onBlur={this.handleLineAmountChange}
                    />
                </div>
        );
    }
}

export default LineItemComponent;
