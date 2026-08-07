// js/profile.js
import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js';
import { doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js';

let currentUser = null;

// Profile Page JavaScript (keeps existing behaviors and adds Firebase integration)

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeSearch();
    initializeAnimations();
    hookProfileButtons();
});

// Initialize Tab Switching
function initializeTabs() {
    const tabs = document.querySelectorAll('.profile-tab');
    const contents = document.querySelectorAll('.profile-content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active-tab'));
            contents.forEach(c => c.classList.add('hidden'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active-tab');
            contents[index].classList.remove('hidden');
        });
    });
}

// Initialize Search Functionality
function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchContainer = document.getElementById('searchContainer');

    if (searchBtn && searchContainer) {
        searchBtn.addEventListener('click', function() {
            searchContainer.classList.toggle('hidden');
            
            // Focus on search input when opened
            if (!searchContainer.classList.contains('hidden')) {
                const input = searchContainer.querySelector('input');
                setTimeout(() => input.focus(), 100);
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchContainer.contains(event.target) && !searchBtn.contains(event.target)) {
                searchContainer.classList.add('hidden');
            }
        });
    }
}

// Initialize AOS Animations
function initializeAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-UG', {
        style: 'currency',
        currency: 'UGX',
        minimumFractionDigits: 0
    }).format(amount);
}

// Order Details Modal (can be expanded)
function viewOrderDetails(orderId) {
    console.log('View details for order:', orderId);
    // This can be expanded to show a modal or navigate to a details page
    alert('Order ' + orderId + ' details would be shown here');
}

// Remove from Wishlist
function removeFromWishlist(productId) {
    const wishlistCard = event.target.closest('.wishlist-card');
    
    if (wishlistCard) {
        // Add fade-out animation
        wishlistCard.style.animation = 'fadeOut 0.3s ease-out';
        
        setTimeout(() => {
            wishlistCard.remove();
            console.log('Removed product:', productId);
            
            // Show notification
            showNotification('Item removed from wishlist', 'success');
        }, 300);
    }
}

// Add to Cart from Wishlist
function addToCart(productName, price) {
    console.log('Added to cart:', productName, price);
    
    // Update cart count in header (best-effort)
    const cartCount = document.getElementById('cartCount') || document.querySelector('.relative span');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    }
    
    showNotification(productName + ' added to cart!', 'success');
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} fixed top-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-blue-500'} text-white px-6 py-3 rounded-lg shadow-lg z-[999]`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// --- FIREBASE INTEGRATION ---

// react to auth state: if not signed in redirect to signin, otherwise load profile
onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    if (!user) {
        // If not signed in, send visitor to signin page
        // Only redirect if this page requires auth (profile page does)
        if (location.pathname.endsWith('profile.html') || location.pathname.endsWith('/')) {
            window.location.href = 'signin.html';
        }
        return;
    }

    // load user profile from Firestore
    try {
        await loadProfile();
    } catch (err) {
        console.error('Failed loading profile:', err);
    }
});

async function loadProfile() {
    if (!currentUser) return;
    const uid = currentUser.uid;
    const userRef = doc(db, 'users', uid);

    try {
        const snap = await getDoc(userRef);
        const data = snap.exists() ? snap.data() : {};

        // populate UI fields (ids added in profile.html)
        const nameInput = document.getElementById('profileFullName');
        if (nameInput) nameInput.value = data.name || currentUser.displayName || '';

        const emailInput = document.getElementById('profileEmail');
        if (emailInput) emailInput.value = data.email || currentUser.email || '';

        const phoneInput = document.getElementById('profilePhone');
        if (phoneInput) phoneInput.value = data.phone || data.phoneNumber || '';

        const street = document.getElementById('profileStreet');
        if (street) street.value = (data.address && data.address.street) || '';

        const city = document.getElementById('profileCity');
        if (city) city.value = (data.address && data.address.city) || '';

        const postal = document.getElementById('profilePostal');
        if (postal) postal.value = (data.address && data.address.postal) || '';

        const profileName = document.getElementById('profileName');
        if (profileName) profileName.textContent = data.name || currentUser.displayName || '—';

        const memberSince = document.getElementById('memberSince');
        if (memberSince) {
            const created = data.createdAt || currentUser.metadata?.creationTime;
            if (created) memberSince.textContent = 'Member since ' + new Date(created).toLocaleDateString();
        }

        const profileLocation = document.getElementById('profileLocation');
        if (profileLocation && data.location) profileLocation.innerHTML = `<i class="fas fa-map-pin mr-1"></i> ${data.location}`;

        // If you track orders/wishlist/spent in Firestore, load them here. For now, best-effort placeholders remain.

    } catch (err) {
        console.error('Error reading user profile from Firestore', err);
    }
}

// Save profile changes (writes to Firestore users/{uid})
async function saveProfileChanges() {
    if (!currentUser) return alert('User not loaded yet. Please sign in.');

    const name = (document.getElementById('profileFullName') || {}).value;
    const phone = (document.getElementById('profilePhone') || {}).value;

    const userDocRef = doc(db, 'users', currentUser.uid);
    try {
        await updateDoc(userDocRef, {
            name: name || null,
            phone: phone || null,
            updatedAt: new Date().toISOString()
        });
        showNotification('Profile updated', 'success');
        // refresh header name
        const profileName = document.getElementById('profileName');
        if (profileName) profileName.textContent = name || profileName.textContent;
    } catch (err) {
        console.error('Error saving profile:', err);
        alert('Could not save profile: ' + err.message);
    }
}

// Update address
async function updateAddress() {
    if (!currentUser) return alert('User not loaded yet. Please sign in.');

    const street = (document.getElementById('profileStreet') || {}).value;
    const city = (document.getElementById('profileCity') || {}).value;
    const postal = (document.getElementById('profilePostal') || {}).value;

    const userDocRef = doc(db, 'users', currentUser.uid);
    try {
        await updateDoc(userDocRef, {
            address: {
                street: street || null,
                city: city || null,
                postal: postal || null
            },
            updatedAt: new Date().toISOString()
        });
        showNotification('Address updated successfully!', 'success');
    } catch (err) {
        console.error('Error updating address:', err);
        alert('Could not update address: ' + err.message);
    }
}

// Logout
async function handleLogout() {
    if (!confirm('Are you sure you want to logout?')) return;
    try {
        await signOut(auth);
        window.location.href = 'signin.html';
    } catch (err) {
        console.error('Sign-out error', err);
        alert('Logout failed: ' + err.message);
    }
}

// Hook profile UI buttons
function hookProfileButtons() {
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) saveBtn.addEventListener('click', (e) => { e.preventDefault(); saveProfileChanges(); });

    const updateAddressBtn = document.getElementById('updateAddressBtn');
    if (updateAddressBtn) updateAddressBtn.addEventListener('click', (e) => { e.preventDefault(); updateAddress(); });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', (e) => { e.preventDefault(); handleLogout(); });

    // wishlist and cart/tracking buttons in header already have anchors; we still guard clicks globally below
}

// Global nav guard: redirect to signin if trying to access protected pages while not signed in
document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    // ignore external links and anchors
    if (!href || href.startsWith('#') || href.startsWith('http')) return;

    // pages that require authentication
    const protectedPatterns = ['cart', 'order', 'orders', 'wishlist', 'profile'];
    const matches = protectedPatterns.some(p => href.toLowerCase().includes(p));
    if (!matches) return;

    if (!currentUser) {
        e.preventDefault();
        // navigate to signin; keep relative path same style as link
        const redirectTo = (href.startsWith('../')) ? '../signin.html' : 'signin.html';
        window.location.href = redirectTo;
    }
});

// Add event listeners that were present in original file
document.addEventListener('DOMContentLoaded', function() {
    // Remove from wishlist buttons
    const trashButtons = document.querySelectorAll('.fa-trash');
    trashButtons.forEach((button, index) => {
        const btnParent = button.closest('button');
        if (btnParent) btnParent.addEventListener('click', () => removeFromWishlist(index));
    });

    // Add to cart buttons from wishlist
    const addToCartButtons = document.querySelectorAll('.wishlist-card button.bg-blue-900');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productNameEl = this.closest('.wishlist-card')?.querySelector('h3');
            const priceEl = this.closest('.wishlist-card')?.querySelector('.font-bold');
            const productName = productNameEl ? productNameEl.textContent : 'Item';
            const price = priceEl ? priceEl.textContent : '';
            addToCart(productName, price);
        });
    });
});

// Fade out animation (unchanged)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }

    .animation-slide-in {
        animation: slideIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Export functions for external use
window.profileModule = {
    formatCurrency,
    viewOrderDetails,
    removeFromWishlist,
    addToCart,
    saveProfileChanges,
    updateAddress,
    changePassword,
    toggleTwoFA,
    handleLogout
};
