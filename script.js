const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.55 }
);

sections.forEach(section => observer.observe(section));

const animatedNumbers = document.querySelectorAll(".animated-number");

const animateNumber = element => {
  const parent = element.closest(".stat");
  const minValue = Number(element.dataset.min ?? parent?.dataset.min ?? 0);
  const maxValue = Number(element.dataset.max ?? parent?.dataset.max ?? 100);
  const suffix = element.dataset.suffix ?? "";
  let startValue = minValue + Math.random() * (maxValue - minValue);
  let endValue = minValue + Math.random() * (maxValue - minValue);
  let startTime = performance.now();
  let duration = 1200 + Math.random() * 1200;

  const tick = now => {
    const progress = Math.min((now - startTime) / duration, 1);
    const current = Math.round(startValue + (endValue - startValue) * progress);
    element.textContent = `${current.toLocaleString()}${suffix}`;
    if (progress >= 1) {
      startValue = endValue;
      endValue = minValue + Math.random() * (maxValue - minValue);
      startTime = now;
      duration = 1000 + Math.random() * 1800;
    }
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

animatedNumbers.forEach(animateNumber);

const placeholderForms = document.querySelectorAll("form");
placeholderForms.forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    alert("Thanks for reaching out! Replace this form with your preferred workflow.");
  });
});
