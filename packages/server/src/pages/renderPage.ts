import { PageParts, renderWithDefaults } from "@calpoly/mustang/server";

const defaults = {
  stylesheets: [
    "/styles/token.css",
    "/styles/navbar.css",
    "/styles/feedpage.css",
    "/styles/modal.css",
  ],
  scripts: [
    `import { define } from "@calpoly/mustang";
import { UserProfile } from "/scripts/user-profile.js";
import { FeedList } from "/scripts/feed-list.js";
import { NavBar } from "/scripts/nav-bar.js";
import { CreatePostButton } from "/scripts/create-post.js";
import { ModalComponent } from "/scripts/modal-component.js";
import { UserPost } from "/scripts/user-post.js";

define({
  "user-profile": UserProfile,
  "feed-list": FeedList,
  "nav-bar": NavBar,
  "create-post": CreatePostButton,
  "modal-component": ModalComponent,
  "user-post" : UserPost,
});
    `,
  ],
  googleFontURL:
    "https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap",
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang",
  },
};

export default function renderPage(page: PageParts) {
  return renderWithDefaults(page, defaults);
}
