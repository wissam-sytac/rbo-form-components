import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'rbo-form',
  styleUrl: 'rbo-form.css',
  shadow: true
})
export class RboForm {
  @State() values: object = {};
  @State() errors: object = {};

  @Prop() onSubmit: Function = (x => x);

  // @TODO: implement
  validateSelf() {
    return false;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.validateSelf()) {
      return this.onSubmit(this.values);
    }
    // @TODO: what to do if form is invalid?
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <slot />
        </div>
        <button>Submit</button>
      </form>
    );
  }
}

