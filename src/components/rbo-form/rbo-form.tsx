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

  @Listen('formInputChangeEvent')
  formInputChangeHandler(event: CustomEvent<FormInputChangeEvent>) {
    console.log('=======');
    console.log('Values: ', this.values);
    console.log('Errors: ', this.errors);
    console.log('=======');
    const { name, value, errors } = event.detail;
    this.values[name] = value;
    this.errors[name] = errors;
  }

  // @TODO: implement
  validateSelf() {
    return false;
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
      <form>
        <slot />
        <div class="action-wrap">
          <button>Submit</button>
        </div>
      </form>
    );
  }
}

