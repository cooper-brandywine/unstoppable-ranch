function openPopup() {
    const popup = document.getElementById("donatePopup");
    popup.style.display = "flex";
    popup.style.animation = "250ms popIn forwards";
}

function closePopup() {
    const popup = document.getElementById("donatePopup");
    popup.style.animation = "250ms popOut forwards";
    
    // Wait for the animation to complete before hiding the element
    popup.addEventListener("animationend", () => {
        popup.classList.add("hidden"); // Add the hidden class
        popup.style.display = "none";
    }, { once: true });
}

// Show popup on page load
window.onload = function() {
    openPopup();
};