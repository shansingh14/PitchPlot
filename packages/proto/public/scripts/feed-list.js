import { css, html, shadow } from "https://unpkg.com/@calpoly/mustang";

export class FeedList extends HTMLElement {
  static template = html`
    <template>
      <div class="feed-list">
      </div>
    </template>
  `;

  static styles = css`
    .feed-list .post {
      border-bottom: 1px solid #ccc;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .post-author {
      font-weight: bold;
    }
    .post-content {
      margin-top: 0.5rem;
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
    try {
      const response = await fetch(url);
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
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <div class="post-author">${post.userId}</div>
        <div class="post-content">${post.content}</div>
        <div class="post-date">${new Date(
          post.createdAt
        ).toLocaleDateString()}</div>
        <div class="post-likes">${post.likesCount} likes</div>
      `;
      fragment.appendChild(postElement);
    });
    this.shadowRoot.querySelector(".feed-list").appendChild(fragment);
  }
}

customElements.define("feed-list", FeedList);
