/* js/main.js */
document.addEventListener("DOMContentLoaded", () => {
  // Volunteer Form Submission via mailto
  const volunteerForm = document.getElementById("volunteerForm");
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent traditional form submission

      const name = document.getElementById("vName").value.trim();
      const phone = document.getElementById("vPhone").value.trim();
      const location = document.getElementById("vLocation").value.trim();
      const availability = document.getElementById("vAvailability").value.trim();
      const experience = document.getElementById("vExperience").value.trim();

      // Construct the subject & body of the email
      const subject = encodeURIComponent("Volunteer Form Submission");
      let body = "Volunteer Form Submission:\n\n";
      body += `Name: ${name}\n`;
      body += `Phone: ${phone}\n`;
      body += `City/State: ${location}\n`;
      body += `Availability: ${availability}\n`;
      body += `Relevant Experience: ${experience}\n`;

      const mailtoLink = `mailto:debbie@theunstoppableranch.org?subject=${subject}&body=${encodeURIComponent(body)}`;

      // Open the user's email client with pre-filled subject and body
      window.location.href = mailtoLink;
    });
  }
});

//header stop above footer
document.addEventListener("DOMContentLoaded", function () {
  const floatingButtons = document.querySelector(".social-links-floating");
  const footer = document.getElementById("footer");

  function adjustFloatingButtons() {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop <= windowHeight) {
      // If the footer is in view, make the buttons "stop" above the footer
      const footerOffset = footer.getBoundingClientRect().top + window.scrollY;
      floatingButtons.style.bottom = `200px`;
      floatingButtons.style.opacity = "1";
    } else {
      // Otherwise, keep them fixed
      floatingButtons.style.position = "fixed";
      floatingButtons.style.bottom = "20px";
      floatingButtons.style.top = "auto";
      floatingButtons.style.opacity = "0.6";
    }
  }

  // Run on scroll and resize
  window.addEventListener("scroll", adjustFloatingButtons);
  window.addEventListener("resize", adjustFloatingButtons);

  // Initial check
  adjustFloatingButtons();
});

document.addEventListener('DOMContentLoaded', () => {
  // Select all <object> elements with data-lazy-svg attribute
  const lazySVGs = document.querySelectorAll('object[data-lazy-svg]');

  // Create a single Intersection Observer
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const obj = entry.target; // The <object> that became visible

        // Grab the actual path from 'data-lazy-svg'
        const svgPath = obj.getAttribute('data-lazy-svg');
        if (svgPath) {
          // Assign it to the real 'data' attribute to start loading
          obj.data = svgPath;

          // Stop observing once it's loaded
          obs.unobserve(obj);
        }
      }
    });
  }, { 
    threshold: 0.1 // Adjust as needed
  });

  // Observe each lazy SVG
  lazySVGs.forEach(svgObj => {
    observer.observe(svgObj);
  });
});