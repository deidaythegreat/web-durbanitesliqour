// Product data
const products = [
    {
        id: 1,
        name: "Macallan 18 Year",
        category: "whiskey",
        price: 599.99,
        description: "Single malt Scotch whiskey aged 18 years",
        image: "macallan-18.jpg"
    },
    {
        id: 2,
        name: "Dom Pérignon 2013",
        category: "wine",
        price: 299.99,
        description: "Vintage champagne from France",
        image: "dom Pérignon 2013.jpg"
    },
    {
        id: 3,
        name: "Grey Goose Vodka",
        category: "vodka",
        price: 49.99,
        description: "Premium French vodka",
        image: "grey goose vodka.jpg"
    },
    {
        id: 4,
        name: "Hennessy XO",
        category: "whiskey",
        price: 249.99,
        description: "Premium cognac blend",
        image: "hennessy-xo.jpg"
    },
    {
        id: 5,
        name: "Opus One 2019",
        category: "wine",
        price: 449.99,
        description: "Napa Valley red wine blend",
        image: "🍷"
    },
    {
        id: 6,
        name: "Beluga Gold Line",
        category: "vodka",
        price: 89.99,
        description: "Russian premium vodka",
        image: "🍸"
    },
    {
        id: 7,
        name: "Craft IPA Selection",
        category: "beer",
        price: 24.99,
        description: "6-pack of artisan IPAs",
        image: "🍺"
    },
    {
        id: 8,
        name: "Bombay Sapphire",
        category: "gin",
        price: 34.99,
        description: "London dry gin with botanicals",
        image: "🍸"
    },
    {
        id: 9,
        name: "Mount Gay XO",
        category: "rum",
        price: 79.99,
        description: "Barbados aged rum",
        image: "🥃"
    },
    {
        id: 10,
        name: "Johnnie Walker Blue",
        category: "whiskey",
        price: 199.99,
        description: "Blended Scotch whiskey",
        image: "🥃"
    },
    {
        id: 11,
        name: "Caymus Cabernet",
        category: "wine",
        price: 89.99,
        description: "Napa Valley Cabernet Sauvignon",
        image: "🍷"
    },
    {
        id: 12,
        name: "Stella Artois",
        category: "beer",
        price: 18.99,
        description: "Belgian lager 12-pack",
        image: "🍺"
    }
];

// Shopping cart
let cart = [];
let isAgeVerified = false;

// DOM elements
const ageModal = document.getElementById('age-modal');
const cartSidebar = document.getElementById('cart-sidebar');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const productGrid = document.getElementById('product-grid');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show age verification modal on first visit
    if (!localStorage.getItem('ageVerified')) {
        showAgeVerification();
    } else {
        isAgeVerified = true;
    }
    
    // Load products
    displayProducts(products);
    
    // Load cart from localStorage
    loadCart();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            // If clicking Products link, show all products
            if (href === '#products') {
                filterProducts('all');
            } else if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    
    // Auto-scroll to products section when search box is clicked (same as Products nav button)
    searchInput.addEventListener('click', function(e) {
        // Clear search and restore all sections
        this.value = '';
        displayProducts(products);
        showAllSections();
        hideNotAvailableMessage();
        
        // Scroll to products section
        const target = document.querySelector('#products');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all products and restore page sections
            displayProducts(products);
            showAllSections();
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        // Hide all sections except products
        hideAllSections();
        
        if (filteredProducts.length === 0) {
            // Show "Not Available" message
            showNotAvailableMessage();
        } else {
            // Show filtered products
            displayProducts(filteredProducts);
            hideNotAvailableMessage();
        }
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
    });
});

// Age verification functions
function showAgeVerification() {
    ageModal.style.display = 'block';
}

function verifyAge(isOfAge) {
    if (isOfAge) {
        isAgeVerified = true;
        localStorage.setItem('ageVerified', 'true');
        ageModal.style.display = 'none';
    } else {
        alert('You must be 21 or older to access this site.');
        window.location.href = 'https://www.google.com';
    }
}

// Product display functions
function displayProducts(productsToShow) {
    productGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            ${product.image.includes('.jpg') || product.image.includes('.png') ? 
                `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: contain;" onerror="console.log('Image failed to load: ${product.image}'); this.style.display='none'; this.nextElementSibling.style.display='block';" onload="console.log('Image loaded: ${product.image}');">
                 <span style="font-size: 4rem; display: none;">🥃</span>` : 
                `<span style="font-size: 4rem;">${product.image}</span>`}
        </div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Filter functions
function filterProducts(category) {
    // Clear search box and restore all sections
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) searchInput.value = '';
    showAllSections();
    hideNotAvailableMessage();
    
    // Navigate to products section
    const productsSection = document.querySelector('#products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the correct filter button
    const targetButton = Array.from(document.querySelectorAll('.filter-btn')).find(btn => 
        btn.textContent.toLowerCase() === category || 
        (category === 'all' && btn.textContent.toLowerCase() === 'all')
    );
    if (targetButton) {
        targetButton.classList.add('active');
    }
    
    // Filter products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// Cart functions
function addToCart(productId) {
    if (!isAgeVerified) {
        showAgeVerification();
        return;
    }
    
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCart();
    
    // Show success message
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCart();
}

function updateQuantity(productId, newQuantity, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
            saveCart();
        }
    }
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    ${item.image.includes('.jpg') || item.image.includes('.png') ? 
                        `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 4px;">` : 
                        `<span style="font-size: 1.5rem;">${item.image}</span>`}
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1}, event)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1}, event)">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id}, event)" class="remove-item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nThis is a demo - no actual payment processed.`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    saveCart();
    toggleCart();
}

// Local storage functions
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Search helper functions
function hideAllSections() {
    const sections = ['#categories', '#about', '#contact'];
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) section.style.display = 'none';
    });
}

function showAllSections() {
    const sections = ['#categories', '#about', '#contact'];
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) section.style.display = 'block';
    });
}

function showNotAvailableMessage() {
    let notAvailableDiv = document.getElementById('not-available-message');
    if (!notAvailableDiv) {
        notAvailableDiv = document.createElement('div');
        notAvailableDiv.id = 'not-available-message';
        notAvailableDiv.innerHTML = '<h2 style="color: black; font-weight: bold; text-align: center; margin-top: 50px; font-size: 2rem;">Not Available</h2>';
        document.querySelector('#products .container').appendChild(notAvailableDiv);
    }
    notAvailableDiv.style.display = 'block';
    document.getElementById('product-grid').style.display = 'none';
}

function hideNotAvailableMessage() {
    const notAvailableDiv = document.getElementById('not-available-message');
    if (notAvailableDiv) {
        notAvailableDiv.style.display = 'none';
    }
    document.getElementById('product-grid').style.display = 'grid';
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #d4af37;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .quantity-controls button {
        background: #d4af37;
        color: white;
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .remove-item {
        background: #dc3545;
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .cart-item {
        position: relative;
    }
    
    .remove-item {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior for navigation
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(44, 24, 16, 0.95) 0%, rgba(74, 44, 26, 0.95) 100%)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    if (!cartSidebar.contains(e.target) && !e.target.closest('.cart')) {
        cartSidebar.classList.remove('open');
    }
});

// Close age modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === ageModal) {
        // Don't allow closing without verification
        if (!isAgeVerified) {
            showAgeVerification();
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});
