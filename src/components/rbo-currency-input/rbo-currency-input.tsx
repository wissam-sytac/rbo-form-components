import { Component, ComponentInterface, Host, h, State, Prop, Event, EventEmitter } from '@stencil/core';
import {FormInputChangeEvent} from '../../events';

// @TODO Add support for required
// @TODO Add support for disabled
// @TODO Handle user enters invalid input
@Component({
  tag: 'rbo-currency-input',
  styleUrl: 'rbo-currency-input.css',
  shadow: true,
})
export class RboCurrencyInput implements ComponentInterface {
  @Prop() isRequired: string;
  @Prop() isDisabled: boolean = false;
  @Prop() name!: string;
  @Prop() label: string;
  @Prop() currency: string = 'EUR';

  @State() whole: string = '';
  @State() decimal: string = '';
  @State() errors: string[] = [];

  @Event({
    eventName: 'formInputChangeEvent',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) formInputChangeEventEmitter: EventEmitter<FormInputChangeEvent>;

  wholeInputEl!: HTMLInputElement;
  decimalInputEl!: HTMLInputElement;

  // @TODO Refactor
  handleChangeWhole = (evt) => {
    console.log('===>');
    this.whole = evt.target.value;
    this.wholeInputEl.value = evt.target.value;
    this.formInputChangeEventEmitter.emit({
      name: this.name,
      value: `${this.whole}.${this.decimal}`,
      errors: this.errors,
    });
  }

  // @TODO Refactor
  handleChangeDecimal = (evt) => {
    this.decimal = evt.target.value;
    this.decimalInputEl.value = evt.target.value;
    this.formInputChangeEventEmitter.emit({
      name: this.name,
      value: `${this.whole}.${this.decimal}`,
      errors: this.errors,
    });
  }

  render() {
    return (
      <Host>
        <span>{this.currency}</span>
        <div class="input">
          <input
            type="text"
            onInput={(evt) => this.handleChangeWhole(evt)}
            placeholder="0"
            value={this.whole}
            ref={(el) => this.wholeInputEl = el as HTMLInputElement}
          />
        </div>
        <span>.</span>
        <div class="input">
          <input
            type="text"
            onInput={(evt) => this.handleChangeDecimal(evt)}
            placeholder="00"
            value={this.decimal}
            maxlength={2}
            ref={(el) => this.decimalInputEl = el as HTMLInputElement}
          />
        </div>
      </Host>
    );
  }
}
