// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeSearch();
    initializeAnimations();
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
    
    // Update cart count in header
    const cartCount = document.querySelector('.relative span');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
    }
    
    showNotification(productName + ' added to cart!', 'success');
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} fixed top-4 right-4 bg-${type === 'success' ? 'green' : 'blue'}-500 text-white px-6 py-3 rounded-lg shadow-lg z-[999] animation-slide-in`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Save Profile Changes
function saveProfileChanges() {
    const fullName = document.querySelector('input[value="John Doe"]');
    const email = document.querySelector('input[value*="@example.com"]');
    const phone = document.querySelector('input[value*="+256"]');
    
    if (fullName && email && phone) {
        console.log('Saving profile:', {
            name: fullName.value,
            email: email.value,
            phone: phone.value
        });
        
        showNotification('Profile updated successfully!', 'success');
    }
}

// Update Address
function updateAddress() {
    const street = document.querySelector('input[value="123 Main Street"]');
    const city = document.querySelector('input[value="Kampala"]');
    const postal = document.querySelector('input[value="256000"]');
    
    if (street && city && postal) {
        console.log('Updating address:', {
            street: street.value,
            city: city.value,
            postal: postal.value
        });
        
        showNotification('Address updated successfully!', 'success');
    }
}

// Change Password
function changePassword() {
    console.log('Redirecting to password change page');
    // This would typically navigate to a separate page or show a modal
    alert('Password change page would open here');
}

// Toggle Two-Factor Authentication
function toggleTwoFA() {
    console.log('Toggling 2FA');
    alert('Two-Factor Authentication settings would open here');
}

// Handle Logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        console.log('User logging out');
        // In a real application, this would clear session and redirect
        localStorage.clear();
        window.location.href = './index.html';
    }
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    // Save buttons
    const saveButtons = document.querySelectorAll('button');
    saveButtons.forEach(button => {
        if (button.textContent.includes('Save Changes')) {
            button.addEventListener('click', saveProfileChanges);
        }
        if (button.textContent.includes('Update Address')) {
            button.addEventListener('click', updateAddress);
        }
        if (button.textContent.includes('Change Password')) {
            button.addEventListener('click', changePassword);
        }
        if (button.textContent.includes('Two-Factor')) {
            button.addEventListener('click', toggleTwoFA);
        }
        if (button.textContent.includes('Logout')) {
            button.addEventListener('click', handleLogout);
        }
    });

    // Remove from wishlist buttons
    const trashButtons = document.querySelectorAll('.fa-trash');
    trashButtons.forEach((button, index) => {
        button.closest('button').addEventListener('click', () => removeFromWishlist(index));
    });

    // Add to cart buttons from wishlist
    const addToCartButtons = document.querySelectorAll('.wishlist-card button.bg-blue-900');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.wishlist-card').querySelector('h3').textContent;
            const price = this.closest('.wishlist-card').querySelector('.font-bold').textContent;
            addToCart(productName, price);
        });
    });
});

// Fade out animation
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
