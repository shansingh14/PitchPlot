document.addEventListener("DOMContentLoaded", () => {
  const createPostForm = document.getElementById("create-post-form");
  const feedContainer = document.querySelector(".feed");

  // Handle new post creation
  createPostForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const postContent = document.getElementById("modal-post-content").value.trim();
    const postLink = document.getElementById("modal-post-link").value.trim();
    const postImageInput = document.getElementById("modal-post-image");
    const postImage = postImageInput.files[0];

    if (postContent) {
      const newPost = document.createElement("div");
      newPost.classList.add("post");

      let postHTML = `
        <div class="post-header">
          <span>New User | ${new Date().toLocaleDateString()}</span>
          <span>❤️ 0 | 💬 0</span>
        </div>
        <div class="post-content">
          <p>${postContent}</p>
      `;

      if (postImage) {
        const imageURL = URL.createObjectURL(postImage);
        postHTML += `<img src="${imageURL}" alt="Post Image" class="post-image">`;
      }

      if (postLink) {
        postHTML += `<a href="${postLink}" target="_blank">${postLink}</a>`;
      }

      postHTML += `
        </div>
        <div class="comment-input-container">
          <textarea class="comment-input" placeholder="Write a comment..." required></textarea>
          <button class="comment-submit-button">Comment</button>
        </div>
        <div class="post-comments"></div>
      `;

      newPost.innerHTML = postHTML;
      feedContainer.insertBefore(newPost, feedContainer.firstChild);

      // Add event listener for the new post's comment button
      addCommentFunctionality(newPost);

      // Reset form and close modal
      createPostForm.reset();
      closeModal("create-post-modal");
    }
  });

  // Function to add comment functionality to a post
  function addCommentFunctionality(postElement) {
    const commentButton = postElement.querySelector(".comment-submit-button");
    const commentInput = postElement.querySelector(".comment-input");
    const postComments = postElement.querySelector(".post-comments");

    commentButton.addEventListener("click", () => {
      const commentText = commentInput.value.trim();
      if (commentText) {
        const commentElement = document.createElement("p");
        commentElement.innerHTML = `<strong>New User:</strong> ${commentText}`;
        postComments.appendChild(commentElement);
        commentInput.value = "";
      }
    });
  }
});
