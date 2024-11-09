document.addEventListener("DOMContentLoaded", () => {
  const darkModeSwitch = document.getElementById("darkModeSwitch");

  
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeSwitch.checked = true;
  }

  
  darkModeSwitch.addEventListener("change", (event) => {
    if (event.target.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  });
});
