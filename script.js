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
            { id: 1, title: "Secondhand Proline 8GB, 256GB SSD, Win 11 Home", picture: "P Proline Laptop.jpg", price: 2300.00, quantity: 2 }
            { id: 2, title: "HP Dual Core Laptop, Canon Printer, Headphones, Mouse & Bag ", picture: "P Hp Combo.jpg", price: 10000.00, quantity: 1 }
            { id: 3, title: "Wireless Pods", picture: "P pods.jfif", price: 400.00, quantity: 10 }
        ];
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
    
    // Sample services
    if (!localStorage.getItem('services')) {
        const sampleServices = [
            { id: 1, name: "PC Repair", description: "Hardware & software troubleshooting", price: "Negotiatable" },
            { id: 2, name: "Windows Activation", description: "Activation of Windows permanently", price: "Negotiatable" },
            { id: 3, name: "Office 365 Activation", description: "Activation of Office 365 permanently", price: "Negotiatable" },
            { id: 4, name: "Laptop Screen Repair", description: "New Laptop Screen Installation", price: "Negotiatable" },
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
