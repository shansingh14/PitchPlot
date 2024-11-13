export class CreatePostButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button class="open-modal-btn" id="createPostButton">Create Post</button>`;

    const button = this.querySelector("#createPostButton");
    button.addEventListener("click", () => {
      if (!document.querySelector("modal-component")) {
        const modal = document.createElement("modal-component");
        document.body.appendChild(modal);
      }
    });
  }
}

customElements.define("create-post", CreatePostButton);
