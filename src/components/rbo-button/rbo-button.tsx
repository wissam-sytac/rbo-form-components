import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'rbo-button',
  styleUrl: 'rbo-button.css',
  shadow: true,
})
export class RboButton implements ComponentInterface {
  @Prop() text: string;
  @Prop() disabled: boolean;
  @Prop() onClick: (event: MouseEvent) => void;

  render() {
    return (
      <Host class={this.disabled ? 'disabled' : 'primary'}>
        <button disabled={this.disabled} onClick={this.onClick}>
          {this.text}
        </button>
      </Host>
    );
  }
}
