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