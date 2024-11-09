// src/pages/userProfilePage.ts
import { css, html } from "@calpoly/mustang/server";
import { User } from "../models/user";
import { Post } from "../models/post";
import renderPage from "./renderPage"; // Importing renderPage for consistent structure

interface UserProfileData {
  user: User;
  posts: Post[];
}

export class UserProfilePage {
  static render(data: UserProfileData) {
    return renderPage({
      body: this.renderBody(data),
      stylesheets: ["/styles/profile.css"],
      scripts: ["/scripts/user-post.js"],
    });
  }

  private static renderBody({ user, posts }: UserProfileData) {
    return html`
      <main class="profile-page">
        <section class="user-info">
          <h1>${user.username}</h1>
          <p>${user.bio}</p>
          <p>Joined: ${user.createdAt.toDateString()}</p>
        </section>

        <section class="user-posts">
          <h2>${user.username}'s Posts</h2>
          ${posts.length > 0
            ? posts.map((post) => this.renderPost(post))
            : html`<p>No posts yet.</p>`}
        </section>
      </main>
    `;
  }

  private static renderPost(post: Post) {
    return html`
      <article class="post">
        <h3>${post.id}</h3>
        <p>${post.content}</p>
        <p>Posted on: ${post.createdAt.toDateString()}</p>
        <p>${post.likesCount} Likes, ${post.comments.length} Comments</p>
      </article>
    `;
  }
}
