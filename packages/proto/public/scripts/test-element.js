import { html, css, shadow } from "https://unpkg.com/@calpoly/mustang";

class TestElement extends HTMLElement {
  static template = html`
    <template>
      <div class="test">
        <slot name="test-name">Default Name</slot>
      </div>
    </template>
  `;

  static styles = css`
    .test {
      color: red;
      font-size: 20px;
    }
  `;

  constructor() {
    super();
    shadow(this).template(TestElement.template).styles(TestElement.styles);
  }
}

export { TestElement };
