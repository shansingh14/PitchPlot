import { css, html, shadow } from "https://unpkg.com/@calpoly/mustang";

export class UserProfile extends HTMLElement {
  static template = html`
    <template>
      <div class="profile">
        <img class="profile-pic" src="" alt="Profile Picture" />
        <div class="profile-info">
          <h2><slot name="name">User Name</slot></h2>
          <p><slot name="bio">User Bio</slot></p>
          <p>
            <strong>Location:</strong> <slot name="location">Location</slot>
          </p>
          <p>
            <strong>Member Since:</strong> <slot name="member-since">Date</slot>
          </p>
          <p><strong>Friends:</strong> <slot name="friends">0</slot></p>
        </div>
      </div>
    </template>
  `;

  static styles = css`
    .profile {
      display: flex;
      align-items: center;
      padding: 15px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 20px auto;
    }
    .profile-pic {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 20px;
      border: 2px solid #1b2f4f;
    }
    .profile-info h2 {
      margin: 0;
      font-size: 20px;
      color: #1b2f4f;
    }
    .profile-info p {
      margin: 5px 0;
      color: #555;
      font-size: 14px;
    }
    .profile-info p strong {
      color: #333;
    }
  `;

  constructor() {
    super();
    shadow(this).template(UserProfile.template).styles(UserProfile.styles);
  }

  connectedCallback() {
    const profilePic = this.getAttribute("profile-pic");
    if (profilePic) {
      this.shadowRoot.querySelector(".profile-pic").src = profilePic;
    }
  }
}
