import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'rbo-input-control',
  styleUrl: 'rbo-input-control.css',
  shadow: true,
})
export class RboInputControl implements ComponentInterface {
  render() {
    return (
      <Host>
        <div class="input-control">
          <slot/>
        </div>
      </Host>
    );
  }
}
