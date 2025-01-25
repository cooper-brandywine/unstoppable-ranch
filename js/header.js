/* js/header.js */
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  if (!header) return;

  header.innerHTML = `
    <div class="navbar">
      <!-- Logo in the center (could also place it left or right) -->
      <div class="logo">
        <a href="index.html">
          <img src="images/TheUnstoppableRanchLogo.jpg" style="max-height: 25vh" id="logoImg" alt="Unstoppable Ranch Logo"/>
        </a>
      </div>

      <div class="menu-icon" id="menuIcon" aria-label="Open Menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div class="donate-now">
        <a class="pop-button" href="https://www.paypal.com/donate/?hosted_button_id=F46DZZ5KCQD72" target="_blank">Donate</a>
      </div>
    </div>

    <nav class="main-nav" id="mainNav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="dogs.html">The Dogs</a></li>
        <li><a href="ranch.html">The Ranch</a></li>
        <li><a href="book.html">The Book</a></li>
        <li><a href="support.html">Support</a></li>
        <li><a href="volunteer.html">Volunteer</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>

    <!-- Floating Social Links (bottom fixed) -->
    <div class="social-links-floating">
      <a id="facebook" href="https://www.facebook.com/theunstoppabledogs" target="_blank"><img src="images/icons/facebook.png" alt="facebook icon"></a>
      <a id="instagram" href="https://www.instagram.com/theunstoppabledogs/" target="_blank"><img src="images/icons/instagram.png" alt="instagram icon"></a>
    </div>
  `;

  // Toggle menu in mobile view
  const menuIcon = document.getElementById("menuIcon");
  const mainNav = document.getElementById("mainNav");

  menuIcon.addEventListener("click", function () {
    mainNav.classList.toggle("nav-open");
    menuIcon.classList.toggle("active");
  });

  // Highlight the current page link
  const navLinks = document.querySelectorAll("nav a");
  const currentPath = window.location.pathname.split("/").pop(); // Get current file name

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("current");
    }
  });
    // // Change the logo for mobile view
    // const logoImg = document.getElementById("logoImg");

    // function updateLogo() {
    //   if (window.innerWidth <= 768) {
    //     logoImg.src = "images/TheUnstoppableRanchLogo-mobile.jpg"; // Mobile logo
    //   } else {
    //     logoImg.src = "images/TheUnstoppableRanchLogo.jpg"; // Default desktop logo
    //   }
    // }
  
    // // Run the function on page load and on window resize
    // updateLogo();
    // window.addEventListener("resize", updateLogo);
});

