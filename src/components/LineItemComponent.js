import React, {Component} from 'react';
import '../style/LineItemComponent.css';

/**
 * LineItemComponent renders single line item
 * ParentComponent: LineItemsComponent
 */
class LineItemComponent extends Component {

    constructor(props) {
        super(props);
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
                    <input className='line-description-input'
                        id={this.props.id}
                        type='text'
                        defaultValue={this.props.lineDescription}
                        onBlur={this.handleLineDescriptionChange}
                        list='data'
                    />
                  <datalist id='data'
                        className='description-data-list'>
                        {this.props.data.map((item, index) =>
                            <option value={item}
                                    key={index}/>
                        )}
                    </datalist>
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
