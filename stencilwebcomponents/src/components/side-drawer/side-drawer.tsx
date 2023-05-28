import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "uc-side-drawer",
  styleUrl: "./side-drawer.css",
  shadow: true,
})
export class SideDrawer {
  @Prop() first: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;
  oncloseDrawer() {
    this.open = false;
  }
  render() {
    return (
      <aside>
        <header>
          <h1>{this.first}</h1>
          <button onClick={this.oncloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button class="active">Navigation</button>
          <button >Contact</button>
        </section>
        <main>
          <slot></slot>
        </main>
      </aside>
    );
  }
}
