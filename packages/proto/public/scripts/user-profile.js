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
          <button class="edit-button">Edit</button>
        </div>
      </div>
      <div class="modal" style="display: none;">
        <div class="modal-content">
          <h3>Edit Profile</h3>
          <label for="bio-input">Bio:</label>
          <textarea id="bio-input"></textarea>
          <label for="location-input">Location:</label>
          <input id="location-input" type="text" />
          <button id="save-button">Save</button>
          <button id="close-button">Close</button>
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
    .edit-button {
      margin-top: 10px;
      padding: 5px 10px;
      background-color: var(--color-accent);
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
      width: 300px;
    }
    #save-button,
    #close-button {
      margin-top: 10px;
      padding: 5px 10px;
      background-color: var(--color-accent);
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    shadow(this).template(UserProfile.template).styles(UserProfile.styles);
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".edit-button")
      .addEventListener("click", () => this.openModal());
    this.shadowRoot
      .querySelector("#save-button")
      .addEventListener("click", () => this.saveChanges());
    this.shadowRoot
      .querySelector("#close-button")
      .addEventListener("click", () => this.closeModal());
    if (this.src) this.hydrate(this.src);
  }

  openModal() {
    const modal = this.shadowRoot.querySelector(".modal");
    const bioInput = this.shadowRoot.querySelector("#bio-input");
    const locationInput = this.shadowRoot.querySelector("#location-input");

    modal.style.display = "flex";

    bioInput.value = this.shadowRoot.querySelector("[slot='bio']").textContent;
    locationInput.value =
      this.shadowRoot.querySelector("[slot='location']").textContent;
  }

  closeModal() {
    this.shadowRoot.querySelector(".modal").style.display = "none";
  }

  saveChanges() {
    const bioInput = this.shadowRoot.querySelector("#bio-input").value.trim();
    const locationInput = this.shadowRoot
      .querySelector("#location-input")
      .value.trim();
    const modal = this.shadowRoot.querySelector(".modal");

    fetch(
      `/api/users/${parseJwt(localStorage.getItem("mu:auth:jwt")).username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("mu:auth:jwt")}`,
        },
        body: JSON.stringify({
          bio: bioInput,
          location: locationInput,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      })
      .then(() => {
        this.shadowRoot.querySelector("[slot='bio']").textContent = bioInput;
        this.shadowRoot.querySelector("[slot='location']").textContent =
          locationInput;
        modal.style.display = "none";
      })
      .catch((error) => console.error("Error updating profile:", error));
  }
}

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Failed to parse JWT:", err);
    return null;
  }
}

customElements.define("user-profile", UserProfile);
