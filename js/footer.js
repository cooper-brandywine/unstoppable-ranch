/* js/footer.js */
document.addEventListener("DOMContentLoaded", function () {
    const footer = document.getElementById("footer");
    if (!footer) return;
    footer.innerHTML = `
    <p>&copy; ${new Date().getFullYear()} Unstoppable Ranch</p>
    <p>Web Design by <a target="_blank" href="https://www.functionalwebsites.com">Functional Websites</a></p>
     `;
});