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
