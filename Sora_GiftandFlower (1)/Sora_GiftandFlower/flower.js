

let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the cart from localStorage or initialize as an empty array.

const products = [
    { id: 1, name: "Luminara Blossoms", price: 19.99, image: "Flowers/LuminaraBlossoms_border.png", description: "+5 Love", status: "Symbolizes joy" },
    { id: 2, name: "Dreamscape Petals", price: 24.99, image: "Flowers/DreamscapePetal_border.png", description: "+10 Romance", status: "Represents dreams" },
    { id: 3, name: "Pixel Bloom", price: 39.99, image: "Flowers/PixelBlossoms_border.png", description: "+7 Affection", status: "Conveys love" },
    { id: 4, name: "Ethereal Flora", price: 59.99, image: "Flowers/EtherealFlora_border.png", description: "+15 Adoration", status: "Represents purity" },
    { id: 5, name: "Techno Blossoms", price: 29.99, image: "Flowers/TechnoBlossoms_border.png", description: "+10 Charm", status: "Embodies creativity" },
    { id: 6, name: "Cyberpetal Garden", price: 79.99, image: "Flowers/Cyberpetal_border.png", description: "+20 Wonder", status: "Symbolizes innovation" },
    { id: 7, name: "Neon Flora", price: 0.99, image: "Flowers/NeonFlora.png", description: "+1 Joy", status: "Represents happiness" },
    { id: 8, name: "Digital Daisies", price: 49.99, image: "Flowers/DigitalDaisies_border.png", description: "+10 Peace", status: "Embodies harmony" },
    { id: 9, name: "BotanicalBytes", price: 34.99, image: "Flowers/BotanicalBytes.png", description: "+12 Magic", status: "Represents dreams" },
];

// Render products in the product list
function renderFlowers() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear the product list on each render
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card product-card mb-4">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.status}</p>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <div class="quantity-container">
                        <input type="number" id="quantity-${product.id}" value="1" min="1" class="quantity-input" />
                        <button class="quantity-button decrease" id="decrease-${product.id}">-</button>
                        <button class="quantity-button increase" id="increase-${product.id}">+</button>
                    </div>
                    <button class="btn btn-primary btn-buy" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(card);

        // Attach event listeners to the quantity buttons
        document.getElementById(`increase-${product.id}`).addEventListener('click', () => {
            const quantityInput = document.getElementById(`quantity-${product.id}`);
            quantityInput.value = parseInt(quantityInput.value) + 1; // Increase quantity by 1
        });

        document.getElementById(`decrease-${product.id}`).addEventListener('click', () => {
            const quantityInput = document.getElementById(`quantity-${product.id}`);
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1; // Decrease quantity by 1
            }
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`quantity-${product.id}`);
    const quantity = parseInt(quantityInput.value);

    // Check if the product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    if (existingItemIndex >= 0) {
        // Update quantity if product already exists in the cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Create a new object to add to the cart
        const cartItem = { ...product, quantity: quantity };
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    updateCartCount(); // Update cart item count
}

// Open cart modal
function openCart() {
    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = ''; // Clear previous cart items
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)} 
                        <button class="btn btn-danger btn-sm float-right" onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsList.appendChild(li);
        total += item.price * item.quantity;
    });

    document.getElementById('totalPrice').innerText = total.toFixed(2);
    $('#cartModal').modal('show');
}

// Remove product from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartCount(); // Update cart count
    openCart(); // Reopen cart to reflect changes
}

// Checkout function with confirmation
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (confirm("Proceed to checkout?")) {
        alert("Purchase successful!");
        cart = []; // Clear the cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Clear localStorage
        updateCartCount(); // Update cart count
        window.location.reload(); // Reload the page
    }
}

// Event listener for cart button
document.getElementById('cartBtn').addEventListener('click', openCart); // Open cart when button is clicked

// Update cart item count
function updateCartCount() {
    document.getElementById('cartCount').innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Function to play music when the page loads
function playBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    audio.volume = 1;
    audio.play().catch(function(error) {
        console.log('Audio play failed:', error);
    });
}

// Update the cart count and render products on page load
window.onload = function() {
    renderFlowers();
    updateCartCount();
    playBackgroundMusic();
};