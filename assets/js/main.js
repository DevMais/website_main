// Navigation logic: switch visible section & active button
const navButtons = document.querySelectorAll(".nav-button");
const sections = document.querySelectorAll(".section");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-section");

    // Update active nav button
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Show matching section
    sections.forEach((section) => {
      if (section.id === target) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  });
});

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

