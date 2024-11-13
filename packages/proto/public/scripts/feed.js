document.addEventListener("DOMContentLoaded", () => {
  const createPostBtn = document.getElementById("createPostBtn");
  const postModal = document.getElementById("postModal");
  const createPostForm = document.getElementById("createPostForm");

  
  createPostBtn.addEventListener("click", () => {
    postModal.style.display = "flex";
  });

  
  createPostForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const postContent = document.getElementById("postContent").value.trim();
    const postLink = document.getElementById("postLink").value.trim();
    const postImageInput = document.getElementById("postImage");
    const postImageFile = postImageInput.files[0];
    const postImageURL = postImageFile
      ? URL.createObjectURL(postImageFile)
      : null;

    if (postContent || postImageURL || postLink) {
      const postElement = document.createElement("user-post");

      postElement.setAttribute("user-pic", "images/user.jpg");
      if (postImageURL) postElement.setAttribute("post-image", postImageURL);

      postElement.innerHTML = `
        <span slot="username">Jane Doe</span>
        <span slot="date">${new Date().toLocaleDateString()}</span>
        <span slot="content">${postContent}</span>
        ${
          postLink
            ? `<a slot="link" href="${postLink}" target="_blank">${postLink}</a>`
            : ""
        }
        <div slot="comments">
          <p><strong>John:</strong> Great post!</p>
        </div>
      `;


      const postsContainer = document.getElementById("postsContainer");
      postsContainer.prepend(postElement);

      postModal.style.display = "none";
      createPostForm.reset();
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("postsContainer");

  if (postsContainer) {
    try {
      const response = await fetch("/api/posts");
      const posts = await response.json();

      posts.forEach((post) => {
        const postElement = document.createElement("user-post");
        postElement.setAttribute("user-pic", "images/user.jpg");
        postElement.innerHTML = `
          <span slot="username">${post.userId}</span>
          <span slot="date">${new Date(post.createdAt).toDateString()}</span>
          <span slot="content">${post.content}</span>
          <span slot="likes">${post.likesCount}</span>
          <div slot="comments">${post.comments.length} Comments</div>
        `;
        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }
});

document
  .getElementById("createPostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const content = document.getElementById("postContent").value;
    const imageFile = document.getElementById("postImage").files[0];

    const formData = new FormData();
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const newPost = await response.json();
      const feedList = document.querySelector("feed-list");
      feedList.addPost(newPost);
      closeModal("postModal");
    } else {
      console.error("Failed to create post");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const createPostBtn = document.getElementById("createPostBtn");
    createPostBtn.addEventListener("click", () => {
      openModal("postModal");
    });
  });