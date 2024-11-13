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
