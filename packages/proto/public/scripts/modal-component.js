export class ModalComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Create a New Post</h2>
            <button class="close-button">&times;</button>
          </div>
          <div class="modal-body">
            <textarea placeholder="What's on your mind?" required></textarea>
            <input type="url" placeholder="Link URL (optional)" id="linkField" />
            <input type="file" id="imageUpload" accept="image/*" class="file-input" />
          </div>
          <div class="modal-footer">
            <button type="submit" class="post-button">Post</button>
          </div>
        </div>
      </div>
    `;

    this.querySelector(".modal-overlay").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.closeModal();
      }
    });
    this.querySelector(".close-button").addEventListener("click", () =>
      this.closeModal()
    );
    this.querySelector(".post-button").addEventListener("click", (event) =>
      this.handlePostSubmit(event)
    );
  }

  closeModal() {
    this.remove();
  }

  async handlePostSubmit(event) {
    event.preventDefault();
    const postContent = this.querySelector("textarea").value;
    const linkUrl = this.querySelector("#linkField").value;
    const imageFile = this.querySelector("#imageUpload").files[0];

    const token = localStorage.getItem("mu:auth:jwt");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    const userData = parseJwt(token);
    const userId = userData?.username;
    if (!userId) {
      console.error("Failed to extract user ID from token.");
      return;
    }

    const postData = {
      content: postContent,
      userId,
      link: linkUrl,
      image: undefined,
      id: "post" + Math.floor(Math.random() * 10000),
    };

    if (imageFile) {
      const reader = new FileReader();

      // This event is triggered once the FileReader reads the file
      reader.onload = () => {
        const base64Image = reader.result // Get the base64 part
        submitPost(base64Image, postData); // Pass the Base64 string to your backend
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error); // Handle errors
      };

      reader.readAsDataURL(imageFile); 
    } else {
      console.log("No file selected"); // Debug message for when no file is selected
      submitPost(null, postData); // No image provided
    }


    async function submitPost(base64Image, data) {
      if(base64Image){
        data.image = base64Image
      }

      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("mu:auth:jwt")}`,
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          console.log("Post created successfully!");
        } else {
          const errorText = await response.text();
          console.error("Failed to create post:", errorText);
        }
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    }

    this.closeModal();
  }
}

customElements.define("modal-component", ModalComponent);

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
