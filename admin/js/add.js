import { db } from "./firebase.js";

import {

collection,

addDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const imageInput = document.getElementById("productImages");

let uploadedImageUrls = [];

imageInput.addEventListener("change", async function () {

    uploadedImageUrls = [];

    const files = Array.from(this.files);

    for (const file of files) {

        const formData = new FormData();

        formData.append("file", file);

        formData.append("upload_preset", "kanye_products"); // Replace with your preset

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/fjlfvpsp/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        uploadedImageUrls.push(data.secure_url);

        console.log(data.secure_url);
    }

    console.log(uploadedImageUrls);

});

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    await addDoc(collection(db, "products"), {

        name: form.productName.value,

        category: form.category.value,

        brand: form.brand.value,

        price: Number(form.price.value),

        discount: Number(form.discount.value),

        stock: Number(form.stock.value),

        description: form.description.value,

        featured: form.featured.checked,

        inStock: form.inStock.checked,

        images: uploadedImageUrls,

        createdAt: serverTimestamp()

    });

    alert("Product Uploaded Successfully!");

    form.reset();

});
