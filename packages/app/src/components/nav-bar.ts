import { LitElement, html, css } from "lit";
import { define } from "@calpoly/mustang";

export class NavBarElement extends LitElement {
  render() {
    return html`
      <nav>
        <!-- Your nav content here -->
      </nav>
    `;
  }

  static styles = css`
    nav {
      background-color: #333;
      color: white;
      display: flex;
      padding: 10px;
    }
  `;
}

define({ "nav-bar": NavBarElement });
