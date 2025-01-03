// Slideshow functionality
let slideIndex = 0;
function showSlides() {
    const slides = document.getElementsByClassName("slide");
    
    // Hide all slides
    for(let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
    }
    
    // Move to next slide
    slideIndex++;
    if(slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Show current slide
    slides[slideIndex-1].style.opacity = "1";
    
    // Change slide every 5 seconds
    setTimeout(showSlides, 5000);
}

// Cookie management
function acceptCookies() {
    try {
        localStorage.setItem("cookiesAccepted", "true");
        document.getElementById("cookie-banner").style.display = "none";
    } catch(e) {
        console.warn("localStorage non disponibile:", e);
        document.cookie = "cookiesAccepted=true;max-age=31536000;path=/";
    }
}

function rejectCookies() {
    try {
        localStorage.setItem("cookiesAccepted", "false");
        document.getElementById("cookie-banner").style.display = "none";
    } catch(e) {
        console.warn("localStorage non disponibile:", e);
        document.cookie = "cookiesAccepted=false;max-age=31536000;path=/";
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Start slideshow
    showSlides();
    
    // Check cookie consent
    try {
        const cookiesAccepted = localStorage.getItem("cookiesAccepted");
        if(cookiesAccepted === null) {
            document.getElementById("cookie-banner").style.display = "block";
        }
    } catch(e) {
        console.warn("localStorage non disponibile:", e);
        if(!document.cookie.includes("cookiesAccepted")) {
            document.getElementById("cookie-banner").style.display = "block";
        }
    }
}); 