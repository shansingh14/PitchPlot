import { LitElement, html, css } from "lit";
import { define } from "@calpoly/mustang";

export class ModalElement extends LitElement {
  static properties = {
    modalId: { type: String },
  };

  render() {
    return html`
      <div id=${this.modalId} class="modal">
        <slot></slot>
      </div>
    `;
  }

  openModal() {
    const modal = this.shadowRoot.querySelector(`#${this.modalId}`);
    modal.style.display = "flex";
  }

  closeModal() {
    const modal = this.shadowRoot.querySelector(`#${this.modalId}`);
    modal.style.display = "none";
  }

  static styles = css`
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.4);
    }
  `;
}

define({ "modal-element": ModalElement });
