import { Component, h, State, Listen } from '@stencil/core';

import {FormInputChangeEvent} from '../../events';

// @TODO When submitted, invoke callback or trigger an event???
@Component({
  tag: 'rbo-form',
  styleUrl: 'rbo-form.css',
  shadow: true
})
export class RboForm {
  @State() values: object = {};
  @State() errors: object = {};
  @State() isValid: boolean = false;

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
    if (this.validateSelf()) {
      // @TODO handle success
    }
    // @TODO: what to do if form is invalid?
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <slot />
        <div class="action-wrap">
          <button disabled={!this.isValid}>Submit</button>
        </div>
      </form>
    );
  }
}

