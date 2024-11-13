export class ModalComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Create a New Post</h2>
            <button class="close-button">&times;</button>
          </div>
          <div class="modal-body">
            <textarea placeholder="What's on your mind?" required></textarea>
            <input type="url" placeholder="Link URL (optional)" id="linkField" />
            <input type="file" id="imageUpload" accept="image/*" class="file-input" />
          </div>
          <div class="modal-footer">
            <button type="submit" class="post-button">Post</button>
          </div>
        </div>
      </div>
    `;

    this.querySelector(".modal-overlay").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.closeModal();
      }
    });
    this.querySelector(".close-button").addEventListener("click", () =>
      this.closeModal()
    );
    this.querySelector(".post-button").addEventListener("click", (event) =>
      this.handlePostSubmit(event)
    );
  }

  closeModal() {
    this.remove();
  }

  async handlePostSubmit(event) {
    event.preventDefault();
    const postContent = this.querySelector("textarea").value;
    const linkUrl = this.querySelector("#linkField").value;
    const imageFile = this.querySelector("#imageUpload").files[0];

    const postData = {
      content: postContent,
      link: linkUrl,
      userId: "user1",
      id: "post" + Math.floor(Math.random() * 100),
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log("Post created successfully!");
        this.closeModal();
      } else {
        const errorText = await response.text();
        console.error("Failed to create post:", errorText);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  }
}

customElements.define("modal-component", ModalComponent);
