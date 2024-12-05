import renderPage from "./renderPage";
import { html } from "@calpoly/mustang/server";

export class UserProfilePage {
  static render({ userId }: { userId: string }) {
    return renderPage({
      body: html`
        <nav-bar></nav-bar>
        <user-profile src="/api/users/${userId}"></user-profile>
        <feed-list src="/api/posts"></feed-list>
      `,
      scripts: [
        `
        import { define } from "@calpoly/mustang";
        import { UserPost } from "/scripts/user-post.js";

        define({
          "user-post": UserPost,
        });
        `,
      ],
      stylesheets: [
        "/styles/profile.css",
        "/styles/navbar.css",
        "/styles/token.css",
      ],
    });
  }
}
