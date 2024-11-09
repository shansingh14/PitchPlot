// src/pages/userProfilePage.ts
import { css, html } from "@calpoly/mustang/server";
import { User} from "../models/user";
import { Post } from "models/post";
import renderPage from "./renderPage";
import { getUserPosts } from "../services/post-svc";

export class UserProfilePage {
  user: User;
  posts: Post[];

  constructor(user: User) {
    this.user = user;
    this.posts = getUserPosts(user.id);
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: ["/styles/profile.css"],
    });
  }

  renderBody() {
    const { username, profilePic, followers, following } = this.user;
    const postsList = this.posts.map((post) => this.renderPost(post));
    const postCount = this.posts.length;

    return html`
      <body>
        <main class="user-profile">
          <section class="user-info">
            <img
              src="${profilePic}"
              alt="${username}'s profile picture"
              class="profile-pic"
            />
            <h2>${username}</h2>
            <p>
              Followers: ${followers.length} | Following: ${following.length}
            </p>
            <p>Posts: ${postCount}</p>
            <!-- Display post count -->
          </section>
          <section class="user-posts">
            <h3>${username}'s Posts</h3>
            ${postsList}
          </section>
        </main>
      </body>
    `;
  }

  renderPost(post: Post) {
    const createdAtFormatted = post.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return html`
      <div class="post">
        <h4>${post.content}</h4>
        <p>${createdAtFormatted}</p>
        <p>Likes: ${post.likesCount}</p>
      </div>
    `;
  }
}
