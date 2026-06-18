const featuredProducts = [
    {
        name: "Nike Air Max",
        price: "UGX 350,000"
    },
    {
        name: "Samsung Earbuds",
        price: "UGX 180,000"
    }
];

const latestProducts = [
    {
        name: "Physics Textbook",
        price: "UGX 45,000"
    },
    {
        name: "HP Laptop",
        price: "UGX 2,300,000"
    }
];

function createProductCard(product) {
    return `
        <div class="product-card">

            <div class="product-image"></div>

            <div class="product-info">

                <h3 class="font-semibold">
                    ${product.name}
                </h3>

                <p class="product-price">
                    ${product.price}
                </p>

                <button
                    class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
                    Add To Cart
                </button>

            </div>

        </div>
    `;
}

document.getElementById("featuredProducts").innerHTML =
    featuredProducts.map(createProductCard).join("");

document.getElementById("latestProducts").innerHTML =
    latestProducts.map(createProductCard).join("");

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => console.log("Service Worker Registered"))
            .catch(err => console.log(err));
    });
}
