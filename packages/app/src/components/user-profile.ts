import { LitElement, html, css, property, query } from 'lit';
import { state } from 'lit/decorators.js';

export class UserProfile extends LitElement {
  @property({ type: String }) userId: string = '';
  @property({ type: String }) name: string = 'Default Name';
  @property({ type: String }) bio: string = 'Default Bio';
  @property({ type: String }) location: string = 'Unknown Location';

  @state() private isModalOpen: boolean = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadUserProfile();
  }

  async loadUserProfile(): Promise<void> {
    try {
      const response = await fetch(`/api/users/${this.userId}`);
      if (!response.ok) throw new Error(`Failed to load user profile for userId: ${this.userId}`);
      const data = await response.json();
      this.name = data.name ?? 'Default Name';
      this.bio = data.bio ?? 'Default Bio';
      this.location = data.location ?? 'Unknown Location';
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  openEditModal(): void {
    this.isModalOpen = true;
  }

  closeEditModal(): void {
    this.isModalOpen = false;
  }

  async saveProfileUpdates(event: Event): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const updatedData = Object.fromEntries(formData);

    try {
      const response = await fetch(`/api/users/${this.userId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to update profile');
      const updatedProfile = await response.json();

      this.name = updatedProfile.name ?? this.name;
      this.bio = updatedProfile.bio ?? this.bio;
      this.location = updatedProfile.location ?? this.location;
      this.closeEditModal();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  render() {
    return html`
      <div class="user-profile">
        <h2>${this.name}</h2>
        <p><strong>Bio:</strong> ${this.bio}</p>
        <p><strong>Location:</strong> ${this.location}</p>
        <button @click=${this.openEditModal}>Edit Profile</button>
        
        ${this.isModalOpen ? html`
          <div class="modal">
            <div class="modal-content">
              <h2>Edit Profile</h2>
              <form @submit=${this.saveProfileUpdates}>
                <label>
                  Name: 
                  <input type="text" name="name" .value=${this.name} required>
                </label>
                <label>
                  Bio: 
                  <input type="text" name="bio" .value=${this.bio} required>
                </label>
                <label>
                  Location: 
                  <input type="text" name="location" .value=${this.location} required>
                </label>
                <button type="submit">Save</button>
                <button type="button" @click=${this.closeEditModal}>Cancel</button>
              </form>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .user-profile {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 8px;
    }

    button {
      margin-top: 8px;
      padding: 8px 16px;
      font-size: 16px;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background-color: #fff;
      padding: 24px;
      border-radius: 8px;
      max-width: 400px;
      width: 100%;
    }

    form label {
      display: block;
      margin-bottom: 12px;
    }

    form input[type="text"] {
      width: 100%;
      padding: 8px;
      margin-top: 4px;
    }
  `;
}

customElements.define('user-profile', UserProfile);
