const categorySwiper = new Swiper(".categorySwiper",{

    slidesPerView:"auto",

    spaceBetween:12,

    freeMode:true,

});

const categories=document.querySelectorAll(".category-btn");

categories.forEach(button=>{

button.addEventListener("click",()=>{

categories.forEach(btn=>{

btn.classList.remove("active-category");

});

button.classList.add("active-category");

});

});

AOS.init({
    duration:800,
    once:true
});