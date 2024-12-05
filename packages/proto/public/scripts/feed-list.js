import { css, html, shadow } from "https://unpkg.com/@calpoly/mustang";

export class FeedList extends HTMLElement {
  static template = html`
    <template>
      <div class="feed-container">
        <div class="feed-list"></div>
      </div>
    </template>
  `;

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }

    .feed-container {
      max-width: 900px;
      width: 100%;
    }

    .feed-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .post {
      background-color: var(--color-card-background);
      border: 1px solid var(--border-color, #ddd);
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .post-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: var(--color-text-primary);
      margin-bottom: 0.5rem;
    }

    .post-content {
      font-size: 1rem;
      color: var(--color-text-secondary);
      margin: 0.5rem 0;
    }

    .post-link {
      color: var(--link-color, #0077cc);
      text-decoration: underline;
      margin-top: 0.5rem;
      display: block;
    }

    .buttons {
      display: flex;
      justify-content: flex-start;
      margin-top: 0.5rem;
    }

    .like-button,
    .comment-button {
      padding: 0.4rem 1rem;
      font-size: 0.9rem;
      color: #fff;
      background-color: var(--color-accent);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 0.5rem;
      transition: background-color 0.3s ease;
    }

    .like-button:hover,
    .comment-button:hover {
      background-color: var(--color-accent-hover);
    }
  `;

  constructor() {
    super();
    shadow(this).template(FeedList.template).styles(FeedList.styles);
  }

  get src() {
    return this.getAttribute("src");
  }

  connectedCallback() {
    if (this.src) this.hydrate(this.src);
  }

  async hydrate(url) {
    console.log(url);
    try {
      const userToken = localStorage.getItem("mu:auth:jwt");
      const user = JSON.parse(atob(userToken.split(".")[1]));
      const userId = user.username;
      const response = await fetch(`${url}/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("mu:auth:jwt")}`,
        },
      });
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.status}`);
      const posts = await response.json();
      this.renderPosts(posts);
    } catch (error) {
      console.error("Error loading feed data:", error);
    }
  }

  renderPosts(posts) {
    const fragment = document.createDocumentFragment();
    posts.forEach((post) => {
      const postElement = document.createElement("user-post");
      postElement.setAttribute("post-id", post.id);
      postElement.setAttribute("user-pic", "https://picsum.photos/200/400");

      if (post.image) {
        postElement.setAttribute(
          "post-image",
          "https://picsum.photos/200/400"
        );
      } else {
        postElement.removeAttribute("post-image");
      }
      postElement.setAttribute("slot", "posts");

      postElement.innerHTML = `
        <span slot="username">${post.userId}</span>
        <span slot="date">${new Date(post.createdAt).toLocaleDateString()}</span>
        <p slot="content">${post.content}</p>
        ${post.link ? `<a slot="link">${post.link}</a>` : ""}
      `;

      fragment.appendChild(postElement);
    });
    this.shadowRoot.querySelector(".feed-list").appendChild(fragment);
  }
}

customElements.define("feed-list", FeedList);
