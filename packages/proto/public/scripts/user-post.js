import { css, html, shadow } from "https://unpkg.com/@calpoly/mustang";

export class UserPost extends HTMLElement {
  static template = html`
    <template>
      <div class="post">
        <div class="post-header">
          <img class="user-pic" src="" alt="User Picture" />
          <div class="user-info">
            <h3><slot name="username">User Name</slot></h3>
            <p><slot name="date">Date</slot></p>
          </div>
        </div>
        <div class="post-content">
          <p><slot name="content">Post content goes here...</slot></p>
          <a class="post-link" href="#" target="_blank"
            ><slot name="link"></slot
          ></a>
          <img
            class="post-image"
            src=""
            alt="Post Image"
            style="display: none;"
          />
        </div>
        <div class="post-actions">
          <button class="like-button">Like</button>
          <button class="comment-button">Comment</button>
        </div>
        <div class="post-comments">
          <slot name="comments">No comments yet...</slot>
        </div>
        <div class="comment-input-container">
          <textarea
            class="comment-input"
            placeholder="Write a comment..."
          ></textarea>
          <button class="comment-submit-button">Submit</button>
        </div>
      </div>
    </template>
  `;

  static styles = css`
    .post {
      background-color: var(--color-card-background);
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      color: var(--color-text-primary); /* Apply primary text color */
    }
    .post-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .user-pic {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    .user-info h3 {
      margin: 0;
      font-size: 16px;
      color: var(--color-text-primary);
    }
    .user-info p {
      margin: 0;
      font-size: 12px;
      color: var(--color-text-secondary);
    }
    .post-content {
      margin-top: 10px;
      color: var(--color-text-primary);
    }
    .post-image {
      width: 100%;
      max-height: 300px;
      object-fit: cover;
      border-radius: 8px;
      margin-top: 10px;
    }
    .post-actions {
      margin-top: 10px;
      display: flex;
      gap: 10px;
    }
    .post-actions button {
      background-color: var(--color-accent);
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .post-actions button:hover {
      background-color: var(--color-accent-hover);
    }
    .post-comments {
      margin-top: 10px;
      color: var(--color-text-primary);
    }
    .comment-input-container {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 10px;
    }
    .comment-input {
      flex: 1;
      padding: 5px;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      color: var(
        --color-text-primary
      ); /* Ensure comment input uses primary text color */
      background-color: var(
        --color-card-background
      ); /* Match card background */
    }
    .comment-submit-button {
      background-color: var(--color-accent);
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .comment-submit-button:hover {
      background-color: var(--color-accent-hover);
    }
  `;

  constructor() {
    super();
    shadow(this).template(UserPost.template).styles(UserPost.styles);
  }

  connectedCallback() {
    const userPic = this.getAttribute("user-pic");
    const postImage = this.getAttribute("post-image");

    if (userPic) this.shadowRoot.querySelector(".user-pic").src = userPic;

    const postImageElement = this.shadowRoot.querySelector(".post-image");
    if (postImage) {
      postImageElement.src = postImage;
      postImageElement.style.display = "block";
    } else {
      postImageElement.style.display = "none";
    }

    const commentButton = this.shadowRoot.querySelector(".comment-button");
    const commentSubmitButton = this.shadowRoot.querySelector(
      ".comment-submit-button"
    );
    const commentInput = this.shadowRoot.querySelector(".comment-input");
    const commentsSection = this.shadowRoot.querySelector(".post-comments");

    commentButton.addEventListener("click", () => {
      const inputContainer = this.shadowRoot.querySelector(
        ".comment-input-container"
      );
      inputContainer.style.display =
        inputContainer.style.display === "none" ? "block" : "none";
    });

    commentSubmitButton.addEventListener("click", () => {
      const commentText = commentInput.value.trim();
      if (commentText) {
        const comment = document.createElement("p");
        comment.innerHTML = `<strong>You:</strong> ${commentText}`;
        commentsSection.appendChild(comment);
        commentInput.value = "";
      }
    });
  }
}
