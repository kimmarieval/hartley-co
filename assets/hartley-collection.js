(() => {
  function initHartleyCollections(root = document) {
    const sections = [];

    if (root.matches?.(".hartley-collection")) {
      sections.push(root);
    }

    sections.push(...root.querySelectorAll(".hartley-collection"));

    sections.forEach((section) => {
      if (section.dataset.hartleyInitialized === "true") return;

      section.dataset.hartleyInitialized = "true";

      if (
        !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.Shopify?.designMode
      ) {
        return;
      }

      const elements = section.querySelectorAll(
        "[data-hartley-reveal]"
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.05,
          rootMargin: "0px 0px -30px 0px"
        }
      );

      elements.forEach((element) => {
        observer.observe(element);
      });

      section.classList.add("hartley-reveal-ready");
    });
  }

  const start = () => initHartleyCollections();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  document.addEventListener("shopify:section:load", (event) => {
    initHartleyCollections(event.target);
  });
})();