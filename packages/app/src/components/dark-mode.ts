import { LitElement, html, css } from "lit";
import { define } from "@calpoly/mustang";

export class DarkModeToggle extends LitElement {
  render() {
    return html`
      <label>
        <input
          type="checkbox"
          @change=${this.toggleDarkMode}
          ?checked=${localStorage.getItem("darkMode") === "enabled"}
        />
        Dark Mode
      </label>
    `;
  }

  toggleDarkMode(event: any) {
    if (event.target.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }

  static styles = css`
    label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `;
}

define({ "dark-mode-toggle": DarkModeToggle });
