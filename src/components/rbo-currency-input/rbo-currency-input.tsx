import { Component, ComponentInterface, Host, h, State, Prop, Event, EventEmitter } from '@stencil/core';
import {FormInputChangeEvent} from '../../events';

// @TODO move this elsewhere
function stripNonNumericChars(str: string) {
  return str === '' ? str : str.replace(/\D/g,'');
}

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

  // @TODO Think about localization/i18n for error messages
  componentWillLoad() {
    this.errors = (this.isRequired && this.isEmpty) ? ['This field is required'] : [];
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

  emitStateUpstream() {
    this.formInputChangeEventEmitter.emit({
      name: this.name,
      value: Number(`${this.whole || 0}.${this.decimal || 0}`),
      errors: this.errors,
    });
  }

  handleChangeWhole = (evt) => {
    // @TODO: improve the check -> case where the input is empty
    const modifiedValue = evt.target.value === '' ? evt.target.value : Number(stripNonNumericChars(evt.target.value)).toFixed(0);
    this.whole = modifiedValue;
    this.wholeInputEl.value = modifiedValue;
    this.errors = (this.isRequired && this.isEmpty) ? ['This field is required'] : [];
    this.emitStateUpstream();
  }

  handleChangeDecimal = (evt) => {
    const modifiedValue = stripNonNumericChars(evt.target.value);
    this.decimal = modifiedValue;
    this.decimalInputEl.value = modifiedValue;
    this.errors = (this.isRequired && this.isEmpty) ? ['This field is required'] : [];
    this.emitStateUpstream();
  }

  render() {
    return (
      <Host
        aria-disabled={this.isDisabled ? 'true' : null}
      >
        <span>{this.currency}</span>
        <div class="input">
          <input
            type="text"
            onInput={this.handleChangeWhole}
            placeholder="0"
            value={this.whole}
            ref={(el) => this.wholeInputEl = el as HTMLInputElement}
            disabled={this.isDisabled}
          />
        </div>
        <span>.</span>
        <div class="input">
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
