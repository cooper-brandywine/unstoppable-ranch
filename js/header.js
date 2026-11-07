/* js/header.js */
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  if (!header) return;

  header.innerHTML = `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="top-banner"> The Unstoppable Ranch is a 501(c)(3) Organization</div>
    <div class="navbar">
      <div class="menu-icon" id="menuIcon" role="button" tabindex="0" aria-label="Open Menu" aria-controls="mainNav" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <a class="pop-button header-action" id="shop" href="/merch">Shop</a>

      <div class="logo">
        <a href="index.html">
          <img src="images/TheUnstoppableRanchLogo.jpg" id="logoImg" alt="Unstoppable Ranch Logo"/>
        </a>
      </div>

      <a class="pop-button header-action" id="donate" href="https://www.paypal.com/donate/?hosted_button_id=F46DZZ5KCQD72" target="_blank">Donate</a>
    </div>

    <nav aria-label="Main navigation" class="main-nav" id="mainNav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="dogs.html">The Dogs</a></li>
        <li><a href="ranch.html">The Ranch</a></li>
        <li><a href="book.html">The Book</a></li>
        <li><a href="support.html">Support</a></li>
        <li><a href="volunteer.html">Volunteer &amp; Visit</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="come-sit-heal.html">Events</a></li>
        <li><a href="merch.html">Merch</a></li>
      </ul>
    </nav>

    <!-- Floating Social Links (bottom fixed) -->
    <div class="social-links-floating">
      <a id="facebook" href="https://www.facebook.com/theunstoppabledogs" target="_blank"><img src="images/icons/facebook.png" alt="facebook icon"></a>
      <a id="instagram" href="https://www.instagram.com/theunstoppabledogs/" target="_blank"><img src="images/icons/instagram.png" alt="instagram icon"></a>
    </div>
  `;

  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    mainContent.tabIndex = -1;
    header.querySelector(".skip-link").addEventListener("click", () => {
      // Move keyboard focus as well as following the anchor to the content.
      mainContent.focus({ preventScroll: true });
    });
  }

  // Toggle menu in mobile view
  const menuIcon = document.getElementById("menuIcon");
  const mainNav = document.getElementById("mainNav");

  const desktopNav = window.matchMedia("(min-width: 1050px)");
  function syncMenu() {
    const expanded = mainNav.classList.contains("nav-open");
    menuIcon.setAttribute("aria-expanded", String(expanded));
    menuIcon.setAttribute("aria-label", expanded ? "Close Menu" : "Open Menu");
    // Collapsed links must not remain in the keyboard or screen-reader order.
    mainNav.inert = !desktopNav.matches && !expanded;
  }
  menuIcon.addEventListener("click", () => {
    mainNav.classList.toggle("nav-open");
    menuIcon.classList.toggle("active");
    syncMenu();
  });
  menuIcon.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      menuIcon.click();
    }
  });
  mainNav.addEventListener("keydown", event => {
    if (event.key === "Escape" && !desktopNav.matches) {
      mainNav.classList.remove("nav-open");
      menuIcon.classList.remove("active");
      menuIcon.focus();
      syncMenu();
    }
  });
  desktopNav.addEventListener("change", syncMenu);
  syncMenu();

// Highlight the current page link
const navLinks = document.querySelectorAll("nav a");
const currentPath = window.location.pathname.split("/").pop() || "index.html"; // Default to "index.html" if empty ("/")

navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
        link.classList.add("current");
        link.setAttribute("aria-current", "page");
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
