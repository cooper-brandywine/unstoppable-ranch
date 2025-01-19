/* js/header.js */
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  if (!header) return;

  header.innerHTML = `
    <div class="navbar">
      <div class="menu-icon" id="menuIcon" aria-label="Open Menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <!-- Logo in the center (could also place it left or right) -->
      <div class="logo">
        <a href="index.html">
          <img src="images/TheUnstoppableRanchLogo.jpg" alt="Unstoppable Ranch Logo" />
        </a>
      </div>
      
      <div class="donate-now">
        <a href="https://www.paypal.com/donate/?hosted_button_id=F46DZZ5KCQD72" target="_blank">Donate</a>
      </div>
    </div>

    <nav class="main-nav" id="mainNav">
      <ul>
        <li><a href="index.html">Home</a></li> | 
        <li><a href="dogs.html">The Dogs</a></li> |
        <li><a href="ranch.html">The Ranch</a></li> |
        <li><a href="support.html">Support</a></li> |
        <li><a href="contact.html">Contact</a></li> 
      </ul>
    </nav>

    <!-- Floating Social Links (bottom fixed) -->
    <div class="social-links-floating">
      <a href="#" target="_blank"><img width="25" src="images/icons/facebook.png" alt="facebook icon"></a>
      <a href="#" target="_blank"><img width="25" src="images/icons/instagram.png" alt="instagram icon"></a>
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
});