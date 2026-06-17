// Hero Slider

const heroSwiper = new Swiper(".heroSwiper", {
    loop: true,

    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Demo Counts

let cartCount = 3;
let favoriteCount = 2;

// Future Firebase Integration
// These values will come from Firestore

console.log("KANYI Shoes Home Loaded");

// Install PWA Prompt Placeholder

window.addEventListener("load", ()
