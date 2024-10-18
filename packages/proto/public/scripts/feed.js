document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("postModal");
  const btn = document.getElementById("createPostBtn");
  const span = document.getElementsByClassName("close")[0];
  const submitBtn = document.querySelector(".submit-button");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  submitBtn.onclick = function () {
    const content = document.getElementById("postContent").value;
    const imageFile = document.getElementById("postImage").files[0];
    const link = document.getElementById("postLink").value;

    if (content || imageFile) {
      createPost(content, imageFile, link);
      modal.style.display = "none";
      clearForm();
    } else {
      alert("Please enter some content or choose an image for your post.");
    }
  };

  function createPost(content, imageFile, link) {
    const post = document.createElement("div");
    post.className = "post";

    const userInfo = document.createElement("div");
    userInfo.className = "userInfo";
    userInfo.innerHTML = `
            <img src="path_to_user_icon.jpg" alt="User Icon" class="userIcon">
            <div>
                <span class="userName">Current User</span>
                <p>${content}</p>
            </div>
        `;

    post.appendChild(userInfo);

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageContainer = document.createElement("div");
        imageContainer.className = "postImageContainer";

        const imageLink = document.createElement("a");
        imageLink.href = link || "#";
        imageLink.target = "_blank";

        const image = document.createElement("img");
        image.src = e.target.result;
        image.className = "postImage";
        image.alt = "Posted Image";

        imageLink.appendChild(image);
        imageContainer.appendChild(imageLink);
        post.appendChild(imageContainer);
      };
      reader.readAsDataURL(imageFile);
    }

    const commentsSection = document.createElement("div");
    commentsSection.className = "commentsSection";
    commentsSection.innerHTML = `
            <h4>Comments</h4>
            <div class="commentsList"></div>
            <textarea class="commentInput" placeholder="Add a comment..."></textarea>
            <button class="commentSubmit">Comment</button>
        `;

    post.appendChild(commentsSection);

    document
      .querySelector(".feedContent")
      .insertBefore(post, document.querySelector(".post"));
  }

  function clearForm() {
    document.getElementById("postContent").value = "";
    document.getElementById("postImage").value = "";
    document.getElementById("postLink").value = "";
  }
});
