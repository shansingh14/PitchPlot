import renderPage from "./renderPage";
import { html } from "@calpoly/mustang/server";

export class UserProfilePage {
  static render({ userId }: { userId: string }) {
    return renderPage({
      body: html`
        <nav-bar></nav-bar>
        <user-profile src="/api/users/${userId}"></user-profile>
        <feed-list src="/api/posts?user=${userId}"></feed-list>
      `,
      stylesheets: [
        "/styles/profile.css",
        "/styles/navbar.css",
        "/styles/token.css",
      ],
    });
  }
}
