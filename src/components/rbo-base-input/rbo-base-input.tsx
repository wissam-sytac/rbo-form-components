import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'rbo-base-input',
  styleUrl: 'rbo-base-input.css',
  shadow: true
})
export class RboBaseInput {
  @State() val: string = '';
  @State() errors: string[] = [];

  @Prop() name!: string;
  @Prop() label: string = '';
  @Prop() type: 'text' | 'password' | 'number' = 'text';

  // @TODO: implement
  validateSelf() {
    return true;
  }

  handleChange = (evt) => {
    this.val = evt.target.value;
    this.validateSelf();
    // @TODO: Do something on change
  }

  render() {
    return (
      <div>
        <label>{this.label}</label>
        <div class="input">
          <input type={this.type} onInput={this.handleChange} value={this.val}/>
        </div>
      </div>
    );
  }
}
