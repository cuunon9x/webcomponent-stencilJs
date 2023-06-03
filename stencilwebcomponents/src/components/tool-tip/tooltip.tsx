import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "uc-tooltip",
  styleUrl: "./tooltip.css",
  shadow: true,
})
export class Tooltip {
  @Prop() text: string;
  render() {
    return [
      <slot />,
      <span id="tooltip-icon">
        ?<div id="tooltip-text">{this.text}</div>
      </span>,
    ];
  }
}
