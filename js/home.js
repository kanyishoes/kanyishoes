import { db } from "./firebase.js";

import {

collection,

getDocs,

query,

limit

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const featured = document.getElementById("featuredProducts");

async function loadProducts(){

const q = query(

collection(db,"products"),

limit(8)

);

const snapshot = await getDocs(q);

featured.innerHTML="";

snapshot.forEach(doc=>{

const product=doc.data();

featured.innerHTML+=`

<div class="bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden">

<img
src="${product.images[0]}"
class="w-full h-52 object-cover">

<div class="p-4">

<h3 class="font-bold">

${product.name}

</h3>

<p class="text-blue-900 font-bold mt-2">

UGX ${product.price}

</p>

<a
href="product.html?id=${doc.id}"
class="mt-4 block bg-blue-900 text-center text-white py-2 rounded-lg">

View Product

</a>

</div>

</div>

`;

});

}

loadProducts();