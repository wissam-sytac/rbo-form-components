import {Component, h, State, Listen, Event, EventEmitter, Host, Prop} from '@stencil/core';
import {FormInputChangeEvent, FormSubmittedEvent} from '../../events';

@Component({
  tag: 'rbo-form',
  styleUrl: 'rbo-form.css',
  shadow: true
})
export class RboForm {
  @Prop() id: string;
  @Prop() apiErrors: string[] = []; // @TODO: implement support for api errors

  @State() values: object = {};
  @State() fieldErrors: object = {};
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
    this.fieldErrors[name] = errors;
    this.isValid = this.validateSelf();
  }

  validateSelf() {
    // Check total number of errors is 0
    const totalNumberOfErrors = Object.values(this.fieldErrors).reduce((acc, errors) => acc + errors.length, 0);
    return totalNumberOfErrors === 0;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.isValid) {
      this.formSubmittedEventEmitter.emit({
        formId: this.id,
        values: this.values,
      });
    }
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.handleSubmit}>
          <slot/>
          <div class="action-wrap">
            <rbo-button disabled={!this.isValid} text="Submit" onClick={this.handleSubmit} />
          </div>
        </form>
      </Host>
    );
  }
}

