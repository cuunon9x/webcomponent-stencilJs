import { Component, Method, Prop, State, h } from "@stencil/core";

@Component({
  tag: "uc-side-drawer",
  styleUrl: "./side-drawer.css",
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo = false;
  @Prop() first: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  @Method()
  async oncloseDrawer() {
    this.open = false;
  }
  @Method()
  async onContentChange(content: string) {
    this.showContactInfo = content === "contact";
  }
  @Method()
  async openMainMenu() {
    this.open = true;
  }
  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-info">
          <h2>Contact Information</h2>
          <p>You can reach us via email or phone.</p>
          <ul>
            <li>Phone: 0333333</li>
            <li>
              E-Mail:
              <a href="mailto:contact@contact.com">contact@contact.com</a>
            </li>
          </ul>
        </div>
      );
    }
    return [
      <div class="backdrop" onClick={this.oncloseDrawer.bind(this)}></div>,
      <aside>
        <header>
          <h1>{this.first}</h1>
          <button onClick={this.oncloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button
            class={!this.showContactInfo ? "active" : ""}
            onClick={this.onContentChange.bind(this, "nav")}
          >
            Navigation
          </button>
          <button
            class={this.showContactInfo ? "active" : ""}
            onClick={this.onContentChange.bind(this, "contact")}
          >
            Contact
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>,
    ];
  }
}
