const searchBtn =
document.getElementById("searchBtn");

const searchContainer =
document.getElementById("searchContainer");

searchBtn.addEventListener("click", () => {

    searchContainer.classList.toggle("hidden");

});

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

const hearts=document.querySelectorAll(".wishlist-btn");

hearts.forEach(btn=>{

btn.addEventListener("click",()=>{

const icon=btn.querySelector("i");

icon.classList.toggle("far");
icon.classList.toggle("fas");

icon.classList.toggle("text-red-500");

});

});

AOS.init({
    duration:800,
    once:true
});