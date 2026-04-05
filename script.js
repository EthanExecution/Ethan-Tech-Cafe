// ============================================
// SHARED UTILITY FUNCTIONS FOR ALL PAGES
// ============================================

// Escape HTML to prevent XSS attacks
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Add product to shopping cart
function addToCart(productId) {
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Increase quantity if already in cart
        existingItem.quantity++;
    } else {
        // Add new item with quantity 1
        cart.push({ id: productId, quantity: 1 });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count display
    updateCartCount();
    
    // Show feedback
    alert('Item added to cart!');
}

// Update cart count badge on all pages
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update all cart count spans on the page
    const cartCountSpans = document.querySelectorAll('#cartCount');
    cartCountSpans.forEach(span => {
        if (span) span.textContent = totalItems;
    });
}

// Initialize sample data if localStorage is empty (for first-time use)
function initializeSampleData() {
    // Sample products
    if (!localStorage.getItem('products')) {
        const sampleProducts = [
            { id: 3, title: "Wireless Pods", picture: "pods.jpg", price: 400.00, quantity: 5 }
        ];
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
    
    // Sample services
    if (!localStorage.getItem('services')) {
        const sampleServices = [
            { id: 1, name: "PC Repair", description: "Hardware & software troubleshooting", price: "Negotiatable" },
        ];
        localStorage.setItem('services', JSON.stringify(sampleServices));
    }
    
    // Initialize empty cart if not exists
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Run initialization when any page loads
initializeSampleData();

// Update cart count on every page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});