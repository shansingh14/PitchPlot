import renderPage from "./renderPage";
import { html } from "@calpoly/mustang/server";

export class FeedPage {
  static render() {
    return renderPage({
      body: html`
        <nav-bar></nav-bar>
        <create-post></create-post>
        <feed-list src="/api/posts"></feed-list>
      `,
      stylesheets: [
        "/styles/feedpage.css",
        "/styles/navbar.css",
        "/styles/token.css",
      ],
    });
  }
}
