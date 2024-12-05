import { css, html, shadow } from "https://unpkg.com/@calpoly/mustang";

export class UserProfile extends HTMLElement {
  static template = html`
    <template>
      <div class="profile">
        <img
          class="profile-pic"
          src="https://picsum.photos/200"
          alt="Profile Picture"
        />
        <div class="profile-info">
          <h2 class="username"><slot name="name">User Name</slot></h2>
          <p class="bio"><slot name="bio">User Bio</slot></p>
          <p>
            <strong>Location:</strong> <slot name="location">Location</slot>
          </p>
          <p>
            <strong>Member Since:</strong>
            <slot name="member-since">Date</slot>
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
      background-color: var(--color-card-background);
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
      border: 3px solid var(--color-accent);
    }

    .profile-info {
      align-items: center;
    }

    .profile-info h2 {
      margin: 0;
      font-size: 20px;
      color: var(--color-text-primary);
    }
    .profile-info p {
      margin: 5px 0;
      color: var(--color-text-primary);
      font-size: 14px;
    }
    .profile-info p strong {
      color: var(--color-text-primary);
    }
  `;

  constructor() {
    super();
    shadow(this).template(UserProfile.template).styles(UserProfile.styles);
  }

  get src() {
    return this.getAttribute("src");
  }

  connectedCallback() {
    if (this.src) this.hydrate(this.src);
  }

  hydrate(url) {
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("mu:auth:jwt")}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch user data: ${res.status}`);
        return res.json();
      })
      .then((data) => this.updateProfile(data))
      .catch((error) => console.error(error));
  }

  updateProfile(userData) {
    const mappings = {
      name: userData.userId || "User Name",
      bio: userData.bio || "No bio available.",
      location: userData.location || "Location unknown",
      "member-since": "07/13/2024",
      friends: userData.friendCount || "0",
    };

    Object.entries(mappings).forEach(([slotName, content]) => {
      // Find or create the slot element
      let slotElement = this.querySelector(`[slot="${slotName}"]`);
      if (!slotElement) {
        // Create a new span element if one doesn't exist
        slotElement = document.createElement("span");
        slotElement.setAttribute("slot", slotName);
        this.appendChild(slotElement);
      }
      slotElement.textContent = content;
    });
  }
}

customElements.define("user-profile", UserProfile);
