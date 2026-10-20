const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// This is a static website: prepare a draft in the visitor's email app.
// Replace the example address in index.html with your real business email.
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`NextLevel enquiry: ${service}`);
    const body = encodeURIComponent(
      `Hi NextLevel,\n\nMy name is ${name}.\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}\n`
    );
    // Change this to the real inbox before publishing.
    window.location.href = `mailto:hello@nextlevel.example?subject=${subject}&body=${body}`;
  });
}
