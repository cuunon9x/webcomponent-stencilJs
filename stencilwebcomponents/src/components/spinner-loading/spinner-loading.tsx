import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "uc-spinner-loading",
  styleUrl: "spinner-loading.css",
  shadow: true,
})
export class SpinnerLoading {
  render() {
    return (
      <Host>
        <slot>
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </slot>
      </Host>
    );
  }
}
