import {Component, h, State, Listen, Event, EventEmitter, Host} from '@stencil/core';
import {FormInputChangeEvent, FormSubmittedEvent} from '../../events';

@Component({
  tag: 'rbo-form',
  styleUrl: 'rbo-form.css',
  shadow: true
})
export class RboForm {
  @State() values: object = {};
  @State() errors: object = {};
  @State() isValid: boolean = false;

  @Event({
    eventName: 'formSubmittedEvent',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) formSubmittedEventEmitter: EventEmitter<FormSubmittedEvent>;

  @Listen('formInputChangeEvent')
  formInputChangeHandler(event: CustomEvent<FormInputChangeEvent>) {
    const { name, value, errors } = event.detail;
    this.values[name] = value;
    this.errors[name] = errors;
    this.isValid = this.validateSelf();

    console.log('=======');
    console.log('Values: ', this.values);
    console.log('Errors: ', this.errors);
    console.log('isValid: ', this.isValid);
  }

  validateSelf() {
    // Check total number of errors is 0
    const totalNumberOfErrors = Object.values(this.errors).reduce((acc, errors) => acc + errors.length, 0);
    return totalNumberOfErrors === 0;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.isValid) {
      this.formSubmittedEventEmitter.emit({
        // @TODO: Add font id
        formId: '__only_one__',
        values: this.values,
      });
    }
    // @TODO: what to do if form is invalid?
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.handleSubmit}>
          <slot/>
          <div class="action-wrap">
            <rbo-button disabled={!this.isValid} text="Submit"/>
          </div>
        </form>
      </Host>
    );
  }
}

