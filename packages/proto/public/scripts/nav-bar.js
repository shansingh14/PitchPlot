export class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar">
        <div class="navbar-container">
          <div class="logo"><h1>PitchPlot</h1></div>
          <div class="nav-links">
            <a href="/feed" class="nav-link">Feed</a>
            <a href="/profile/user1" class="nav-link">Profile</a>
          </div>
          <div class="dark-mode-toggle">
            <input type="checkbox" id="darkModeSwitch" />
            <label for="darkModeSwitch">Dark Mode</label>
          </div>
        </div>
      </nav>
    `;

    const darkModeSwitch = this.querySelector("#darkModeSwitch");
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
      darkModeSwitch.checked = true;
    }

    darkModeSwitch.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode", darkModeSwitch.checked);
      localStorage.setItem(
        "darkMode",
        darkModeSwitch.checked ? "enabled" : "disabled"
      );
    });
  }
}

customElements.define("nav-bar", NavBar);
