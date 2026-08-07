import { db } from "../../js/firebase.js";
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const container = document.getElementById("productsContainer");

async function loadProducts() {
  container.innerHTML = "<div class='p-6'>Loading...</div>";
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    container.innerHTML = "";
    snap.forEach(doc => {
      const p = doc.data();
      const el = document.createElement("div");
      el.className = "bg-white rounded-2xl shadow p-4";
      el.innerHTML = `
        <img src="${(p.images && p.images[0]) || 'https://via.placeholder.com/400x300'}" class="w-full h-40 object-cover rounded" alt="${p.name || ''}">
        <h3 class="font-semibold text-lg mt-3">${p.name || '—'}</h3>
        <p class="text-sm text-gray-500">${p.category || ''}</p>
        <div class="flex items-center justify-between mt-3">
          <div class="text-blue-900 font-bold">UGX ${p.price ?? '0'}</div>
          <a href="../product.html?id=${doc.id}" class="text-sm text-blue-700 hover:underline">View</a>
        </div>
      `;
      container.appendChild(el);
    });
    if (snap.empty) container.innerHTML = "<div class='p-6 text-gray-600'>No products found.</div>";
  } catch (err) {
    container.innerHTML = `<div class='p-6 text-red-600'>Error loading products: ${err.message}</div>`;
    console.error(err);
  }
}

loadProducts();
