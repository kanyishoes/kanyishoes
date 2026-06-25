AOS.init({
    duration:800,
    once:true
});

const searchBtn =
document.getElementById("searchBtn");

const searchContainer =
document.getElementById("searchContainer");

searchBtn.addEventListener("click", () => {

    searchContainer.classList.toggle("hidden");

});

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

    effect: "fade",

    speed: 1200,

});