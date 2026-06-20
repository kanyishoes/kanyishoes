// HERO SLIDER

const swiper = new Swiper(".heroSwiper", {

    loop: true,

    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },

    speed: 1000,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }

});


// TOP BAR BUTTONS

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", () => {

        console.log("Button clicked");

    });

});
