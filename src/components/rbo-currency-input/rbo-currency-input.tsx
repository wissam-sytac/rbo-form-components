import { Component, ComponentInterface, Host, h, State, Prop, Event, EventEmitter, Listen } from '@stencil/core';
import {FormInputChangeEvent} from '../../events';
import stripNonNumericChars from '../../utils/stripNonNumericChars';
import currencySymbols from '../../utils/currencySymbols';

// @TODO: Figure out a better way of injecting these error values rather than hardcoding here
const messages = {
  'error.required': 'This field is required',
};

@Component({
  tag: 'rbo-currency-input',
  styleUrl: 'rbo-currency-input.css',
  shadow: true,
})
export class RboCurrencyInput implements ComponentInterface {
  @Prop() required: string = 'false';
  @Prop() disabled: string = 'false';
  @Prop() name!: string;
  @Prop() label: string;
  @Prop() unit: string = 'EUR';
  @Prop() maxWholeLength: number = 6;

  @State() touched: boolean = false;
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

  componentWillLoad() {
    this.errors = (this.isRequired && this.isEmpty) ? [messages['error.required']] : [];
    if (!this.isDisabled) {
      this.emitStateUpstream();
    }
  }

  get isDisabled() {
    return this.disabled === 'true';
  }

  get isRequired() {
    return this.required === 'true';
  }

  get isEmpty() {
    return this.whole === '' && this.decimal === '';
  }

  get value() {
    return Number(`${this.whole || 0}.${this.decimal || 0}`);
  }

  get hasErrors() {
    return !!this.errors.length;
  }

  emitStateUpstream() {
    this.formInputChangeEventEmitter.emit({
      name: this.name,
      value: this.value,
      errors: this.errors,
    });
  }

  handleChangeWhole = (evt) => {
    const modifiedValue = (evt.target.value === '') ? evt.target.value : Number(stripNonNumericChars(evt.target.value)).toFixed(0);
    this.whole = modifiedValue;
    this.wholeInputEl.value = modifiedValue;
    this.errors = (this.isRequired && this.isEmpty) ? [messages['error.required']] : [];
    this.emitStateUpstream();
  }

  handleChangeDecimal = (evt) => {
    const modifiedValue = stripNonNumericChars(evt.target.value);
    this.decimal = modifiedValue;
    this.decimalInputEl.value = modifiedValue;
    this.errors = (this.isRequired && this.isEmpty) ? [messages['error.required']] : [];
    this.emitStateUpstream();
  }

  @Listen('blur')
  handleBlur(evt) {
    this.touched = true;
    if (this.isRequired && this.isEmpty) {
      console.log('er');
      return this.errors = ['This field is required'];
    }
    if (this.decimal === '') {
      return this.decimal = '00';
    }
    if (this.decimal.length === 1) {
      return this.decimal = (Number(this.decimal) * 10).toFixed(0);
    }
  }

  render() {
    // @TODO: improve class-name combination
    const combinedClasses = [
      this.isDisabled ? 'disabled' : '',
      (this.hasErrors && this.touched) ? 'has-errors' : '',
    ];

    return (
      <Host aria-disabled={this.isDisabled ? 'true' : null} class={combinedClasses.join(' ')}>
        {this.unit && <span class="unit">{currencySymbols(this.unit)}</span>}
        <div class="input-wrap input-whole">
          <input
            type="text"
            onInput={this.handleChangeWhole}
            placeholder="0"
            value={this.whole}
            maxlength={this.maxWholeLength}
            ref={(el) => this.wholeInputEl = el as HTMLInputElement}
            disabled={this.isDisabled}
          />
        </div>
        <span class="decimal-dot">,</span>
        <div class="input-wrap input-decimals">
          <input
            type="text"
            onInput={this.handleChangeDecimal}
            placeholder="00"
            value={this.decimal}
            maxlength={2}
            ref={(el) => this.decimalInputEl = el as HTMLInputElement}
            disabled={this.isDisabled}
          />
        </div>
      </Host>
    );
  }
}
