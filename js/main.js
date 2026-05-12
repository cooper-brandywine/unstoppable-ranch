/* js/main.js */
document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------
   * 1) Mailto forms (Volunteer + ComeSitHeal)
   * ------------------------------------- */
  function attachMailto(formId, fieldIds, { to, subject, intro }) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Read and trim fields
      const values = {};
      Object.entries(fieldIds).forEach(([labelKey, inputId]) => {
        const el = document.getElementById(inputId);
        values[labelKey] = (el?.value || "").trim();
      });

      // Build email body
      let body = `${intro}\n\n`;
      Object.entries(values).forEach(([labelKey, val]) => {
        // Pretty label: vName -> Name, cLocation -> Location, etc.
        const pretty = labelKey
          .replace(/^v|^c/, "")        // strip leading v/c
          .replace(/([A-Z])/g, " $1")  // space before caps
          .replace(/^./, (c) => c.toUpperCase())
          .trim();
        body += `${pretty}: ${val}\n`;
      });

      const mailtoLink =
        `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;
    });
  }

  // Volunteer form (existing)
  attachMailto(
    "volunteerForm",
    {
      vName: "vName",
      vPhone: "vPhone",
      vLocation: "vLocation",
      vAvailability: "vAvailability",
      vExperience: "vExperience",
    },
    {
      to: "debbie@theunstoppableranch.org",
      subject: "Volunteer Form Submission",
      intro: "Volunteer Form Submission:",
    }
  );

  // New Come • Sit • Heal form (name, phone, location)
  // HTML: id="comeSitHealForm" with inputs cName, cPhone, cLocation
  attachMailto(
    "comeSitHealForm",
    {
      cName: "cName",
      cPhone: "cPhone",
      cLocation: "cLocation",
    },
    {
      to: "debbie@theunstoppableranch.org",
      subject: "Come • Sit • Heal — Booking Request",
      intro: "Come • Sit • Heal Program Request:",
    }
  );

  /* ---------------------------------------
   * 2) Floating social buttons stop at footer
   * ------------------------------------- */
  const floatingButtons = document.querySelector(".social-links-floating");
  const footer = document.getElementById("footer");

  function adjustFloatingButtons() {
    if (!floatingButtons || !footer) return;

    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop <= windowHeight) {
      // Footer in view: stop above footer
      floatingButtons.style.position = "fixed";
      floatingButtons.style.bottom = `200px`;
      floatingButtons.style.top = "auto";
      floatingButtons.style.opacity = "1";
    } else {
      // Otherwise keep fixed at bottom
      floatingButtons.style.position = "fixed";
      floatingButtons.style.bottom = "20px";
      floatingButtons.style.top = "auto";
      floatingButtons.style.opacity = "0.6";
    }
  }

  window.addEventListener("scroll", adjustFloatingButtons, { passive: true });
  window.addEventListener("resize", adjustFloatingButtons);
  adjustFloatingButtons();

  /* ---------------------------------------
   * 3) Lazy-load <object> SVGs via IntersectionObserver
   * ------------------------------------- */
  const lazySVGs = document.querySelectorAll('object[data-lazy-svg]');

  if ("IntersectionObserver" in window && lazySVGs.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const obj = entry.target;
            const svgPath = obj.getAttribute("data-lazy-svg");
            if (svgPath) {
              obj.data = svgPath; // start loading the SVG
              obs.unobserve(obj);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    lazySVGs.forEach((svgObj) => observer.observe(svgObj));
  } else {
    // Fallback: load immediately if IO isn't supported
    lazySVGs.forEach((obj) => {
      const svgPath = obj.getAttribute("data-lazy-svg");
      if (svgPath) obj.data = svgPath;
    });
  }

  /* ---------------------------------------
   * 4) Ranch page gallery
   * ------------------------------------- */
  const ranchGalleryImage = document.getElementById("ranchGalleryImage");
  const ranchGalleryThumbs = Array.from(document.querySelectorAll("[data-ranch-gallery-thumb]"));
  const ranchGalleryPrev = document.querySelector("[data-ranch-gallery-prev]");
  const ranchGalleryNext = document.querySelector("[data-ranch-gallery-next]");

  if (ranchGalleryImage && ranchGalleryThumbs.length > 0) {
    let activeRanchGalleryIndex = 0;

    function showRanchGalleryImage(index) {
      activeRanchGalleryIndex = (index + ranchGalleryThumbs.length) % ranchGalleryThumbs.length;
      const activeThumb = ranchGalleryThumbs[activeRanchGalleryIndex];
      const nextSrc = activeThumb.getAttribute("data-src");
      const nextAlt = activeThumb.getAttribute("data-alt");

      ranchGalleryImage.src = nextSrc;
      ranchGalleryImage.alt = nextAlt || "";

      ranchGalleryThumbs.forEach((thumb, thumbIndex) => {
        thumb.classList.toggle("active", thumbIndex === activeRanchGalleryIndex);
        thumb.setAttribute("aria-pressed", String(thumbIndex === activeRanchGalleryIndex));
      });
    }

    ranchGalleryThumbs.forEach((thumb, index) => {
      thumb.setAttribute("aria-pressed", String(index === activeRanchGalleryIndex));
      thumb.addEventListener("click", () => showRanchGalleryImage(index));
    });

    ranchGalleryPrev?.addEventListener("click", () => {
      showRanchGalleryImage(activeRanchGalleryIndex - 1);
    });

    ranchGalleryNext?.addEventListener("click", () => {
      showRanchGalleryImage(activeRanchGalleryIndex + 1);
    });
  }
});
