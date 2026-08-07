import { db } from "../../js/firebase.js";
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const ordersBody = document.getElementById("ordersBody");

async function loadOrders() {
  ordersBody.innerHTML = "<tr><td class='p-4' colspan='6'>Loading...</td></tr>";
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    ordersBody.innerHTML = "";
    snap.forEach(doc => {
      const o = doc.data();
      const itemsCount = (o.items && o.items.length) || 0;
      const total = o.total ?? (o.amount ?? 0);
      const created = o.createdAt ? new Date(o.createdAt.seconds * 1000).toLocaleString() : "";
      const tr = document.createElement("tr");
      tr.className = "border-b";
      tr.innerHTML = `
        <td class="p-3">${doc.id}</td>
        <td class="p-3">${(o.customer && (o.customer.name || o.customer.email)) || (o.email || '—')}</td>
        <td class="p-3">${itemsCount}</td>
        <td class="p-3">UGX ${total}</td>
        <td class="p-3">${o.status || 'pending'}</td>
        <td class="p-3">${created}</td>
      `;
      ordersBody.appendChild(tr);
    });
    if (snap.empty) ordersBody.innerHTML = "<tr><td class='p-4' colspan='6'>No orders found.</td></tr>";
  } catch (err) {
    ordersBody.innerHTML = `<tr><td class='p-4 text-red-600' colspan='6'>Error: ${err.message}</td></tr>`;
    console.error(err);
  }
}

loadOrders();
