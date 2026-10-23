// ==========================================
// Style Loop - DRESS RENTAL WEBSITE
// Complete Dress Collection JavaScript
// ==========================================


// ==========================================
// 1. DRESS DATA
// ==========================================

const dresses = [
    {
        id: 1,
        name: "Elegant Wedding Gown",
        category: "Wedding",
        price: 1500,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        description: "An elegant gown for weddings and special occasions.",
        available: true
    },

    {
        id: 2,
        name: "Luxury Party Dress",
        category: "Party",
        price: 900,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
        description: "A stylish party dress for unforgettable celebrations.",
        available: true
    },

    {
        id: 3,
        name: "Traditional Ethnic Outfit",
        category: "Traditional",
        price: 1200,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        description: "A beautiful traditional outfit for festive occasions.",
        available: true
    },

    {
        id: 4,
        name: "Floral Summer Dress",
        category: "Casual",
        price: 500,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
        description: "A comfortable and fashionable outfit for everyday wear.",
        available: true
    },

    {
        id: 5,
        name: "Classic Evening Gown",
        category: "Party",
        price: 1100,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
        description: "An elegant evening gown for parties and celebrations.",
        available: true
    },

    {
        id: 6,
        name: "Designer Wedding Dress",
        category: "Wedding",
        price: 2000,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        description: "A premium style for memorable wedding occasions.",
        available: true
    },

    {
        id: 7,
        name: "Traditional Festive Wear",
        category: "Traditional",
        price: 1000,
       image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
        description: "Traditional fashion for festivals and family functions.",
        available: true
    },

    {
        id: 8,
        name: "Casual Chic Outfit",
        category: "Casual",
        price: 650,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
        description: "A chic and versatile outfit for casual occasions.",
        available: true
    }
];


// ==========================================
// 2. IMAGE FALLBACK
// ==========================================

function handleImageError(img) {
    img.onerror = null;

    img.src =
        "https://placehold.co/600x800/f5f0eb/333333?text=Dress+Image";
}


// ==========================================
// 3. DRESS CARD
// ==========================================

function dressCard(dress) {
    return `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm dress-card">

                <img
                    src="${dress.image}"
                    class="card-img-top"
                    alt="${dress.name}"
                    loading="lazy"
                    onerror="handleImageError(this)"
                    style="height: 320px; object-fit: cover;"
                >

                <div class="card-body d-flex flex-column">

                    <span class="text-muted small mb-2">
                        ${dress.category}
                    </span>

                    <h5 class="card-title">
                        ${dress.name}
                    </h5>

                    <p class="card-text text-muted">
                        ${dress.description}
                    </p>

                    <h5 class="mb-3">
                        ₹${dress.price}
                        <small class="text-muted fs-6">
                            / rental
                        </small>
                    </h5>

                    <div class="mt-auto d-grid gap-2">

                        <a
                            href="dress%20details.html?id=${dress.id}"
                            class="btn btn-outline-dark"
                        >
                            View Details
                        </a>

                        <button
                            type="button"
                            class="btn btn-dark"
                            onclick="addToCart(${dress.id})"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>
            </div>
        </div>
    `;
}


// ==========================================
// 4. HOME PAGE - FEATURED DRESSES
// ==========================================

function renderFeaturedDresses() {
    const container =
        document.getElementById("featuredDresses");

    if (!container) return;

    container.innerHTML = dresses
        .slice(0, 4)
        .map(dress => dressCard(dress))
        .join("");
}


// ==========================================
// 5. COLLECTION PAGE
// SEARCH + CATEGORY FILTER
// ==========================================

function renderCollection() {
    const container =
        document.getElementById("dressCollection");

    if (!container) return;

    const search =
        document.getElementById("dressSearch");

    const category =
        document.getElementById("categoryFilter");

    const noResults =
        document.getElementById("noResults");


    function filterDresses() {

        const term = search
            ? search.value.trim().toLowerCase()
            : "";

        const selected = category
            ? category.value
            : "All";


        const results = dresses.filter(dress => {

            const matchesSearch =
                dress.name.toLowerCase().includes(term) ||
                dress.category.toLowerCase().includes(term) ||
                dress.description.toLowerCase().includes(term);

            const matchesCategory =
                selected === "All" ||
                dress.category.toLowerCase() ===
                    selected.toLowerCase();

            return matchesSearch && matchesCategory;
        });


        container.innerHTML = results
            .map(dress => dressCard(dress))
            .join("");


        if (noResults) {
            noResults.classList.toggle(
                "d-none",
                results.length > 0
            );
        }
    }


    // Prevent duplicate event listeners if called again.

    if (search && !search.dataset.listenerAdded) {
        search.addEventListener("input", filterDresses);
        search.dataset.listenerAdded = "true";
    }

    if (category && !category.dataset.listenerAdded) {
        category.addEventListener("change", filterDresses);
        category.dataset.listenerAdded = "true";
    }


    // Display all dresses when the page opens.

    filterDresses();
}


// ==========================================
// 6. GET CART FROM LOCAL STORAGE
// ==========================================

function getCart() {
    try {
        const cart = JSON.parse(
            localStorage.getItem("velvetClosetCart") || "[]"
        );

        return Array.isArray(cart) ? cart : [];

    } catch (error) {
        console.error("Unable to read cart:", error);
        return [];
    }
}


/// ADD DRESS TO CART
function addToCart(dressId) {
    const dress = dresses.find(
        item => String(item.id) === String(dressId)
    );

    if (!dress) {
        alert("Dress not found!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
        item => String(item.id) === String(dressId)
    );

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            id: dress.id,
            name: dress.name,
            category: dress.category,
            price: Number(dress.price),
            image: dress.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Dress added to cart successfully!");
}


// UPDATE CART COUNT

function updateCartCount() {
    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!Array.isArray(cart)) {
            cart = [];
        }
    } catch (error) {
        cart = [];
    }

    const count = cart.reduce((total, item) => {
        return total + (Number(item.quantity) || 1);
    }, 0);

    document.querySelectorAll("#cartCount").forEach(element => {
        element.textContent = count;
    });
}

 


// ==========================================
// 9. DRESS DETAILS PAGE
// ==========================================

function renderDressDetails() {

    const container =
        document.getElementById("dressDetails");

    if (!container) return;


    const params = new URLSearchParams(
        window.location.search
    );

    const dressId = Number(params.get("id"));


    const dress = dresses.find(
        item => item.id === dressId
    );


    if (!dress) {

        container.innerHTML = `
            <div class="text-center py-5">
                <h2>Dress Not Found</h2>

                <p>
                    Please select a dress from our collection.
                </p>

                <a href="collection.html" class="btn btn-dark">
                    Back to Collection
                </a>
            </div>
        `;

        return;
    }


    container.innerHTML = `
        <div class="row g-5 align-items-center">

            <div class="col-md-6">

                <img
                    src="${dress.image}"
                    alt="${dress.name}"
                    class="img-fluid rounded shadow-sm w-100"
                    onerror="handleImageError(this)"
                    style="max-height: 650px; object-fit: cover;"
                >

            </div>

            <div class="col-md-6">

                <p class="text-muted text-uppercase">
                    ${dress.category}
                </p>

                <h1 class="mb-3">
                    ${dress.name}
                </h1>

                <h3 class="mb-4">
                    ₹${dress.price}
                    <small class="text-muted fs-6">
                        / rental
                    </small>
                </h3>

                <p class="mb-4">
                    ${dress.description}
                </p>

                <p>
                    <strong>Availability:</strong>
                    ${dress.available ? "Available" : "Unavailable"}
                </p>

                ${
                    dress.available
                        ? `
                            <button
                                type="button"
                                class="btn btn-dark btn-lg"
                                onclick="addToCart(${dress.id})"
                            >
                                Add to Cart
                            </button>
                          `
                        : `
                            <button
                                type="button"
                                class="btn btn-secondary btn-lg"
                                disabled
                            >
                                Currently Unavailable
                            </button>
                          `
                }

                <a
                    href="collection.html"
                    class="btn btn-outline-dark btn-lg ms-2"
                >
                    Back
                </a>

            </div>

        </div>
    `;
}


// ==========================================
// 10. INITIALIZE WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    renderFeaturedDresses();

    renderCollection();

    renderDressDetails();

    updateCartCount();

});
// CART DISPLAY

function renderCart() {
    const cartContainer = document.getElementById("cartItems");
    const totalElement = document.getElementById("cartTotal");

    if (!cartContainer || !totalElement) return;

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
        cart = [];
    }

    if (!Array.isArray(cart) || cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <h4>Your Cart is Empty</h4>
                <p class="text-muted">
                    You haven't added any dresses yet.
                </p>
                <a href="collection.html"
                   class="btn btn-dark">
                    Explore Collection
                </a>
            </div>
        `;

        totalElement.textContent = "₹0";
        updateCartCount();
        return;
    }

    let total = 0;

    cartContainer.innerHTML = cart.map((item, index) => {
        const price = Number(item.price) || 0;
        const quantity = Math.max(1, Number(item.quantity) || 1);

        total += price * quantity;

        return `
            <div class="card mb-3 p-3">
                <div class="row align-items-center g-3">

                    <div class="col-4 col-md-3">
                        <img
                            src="${item.image || ''}"
                            alt="${item.name || 'Dress'}"
                            class="img-fluid rounded"
                            style="width:100%;height:150px;object-fit:cover"
                            onerror="this.style.display='none'">
                    </div>

                    <div class="col-8 col-md-9">
                        <h5>${item.name || 'Dress'}</h5>

                        <p class="text-muted mb-2">
                            ${item.category || ''}
                        </p>

                        <p>
                            ₹${price} / rental
                        </p>

                        <p>Quantity: ${quantity}</p>

                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="removeCartItem(${index})">
                            Remove
                        </button>
                    </div>

                </div>
            </div>
        `;
    }).join("");

    totalElement.textContent = "₹" + total;
    updateCartCount();
}


// REMOVE ONE ITEM

function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}


// CLEAR CART

document.addEventListener("DOMContentLoaded", function () {
    const clearButton = document.getElementById("clearCart");

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            localStorage.removeItem("cart");
            renderCart();
        });
    }

    renderCart();
});function renderCart() {
    const container = document.getElementById("cartItems");
    const totalElement = document.getElementById("cartTotal");

    if (!container || !totalElement) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h4>Your Cart is Empty</h4>
                <p>Add your favourite dresses to continue.</p>
                <a href="collection.html" class="btn btn-dark">
                    Browse Collection
                </a>
            </div>
        `;

        totalElement.textContent = "₹0";
        return;
    }

    let total = 0;

    container.innerHTML = cart.map(item => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        total += price * quantity;

        return `
            <div class="card mb-3 p-3">
                <div class="row align-items-center">
                    <div class="col-4">
                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            class="img-fluid rounded"
                            style="height:140px;width:100%;object-fit:cover"
                        >
                    </div>

                    <div class="col-8">
                        <h5>${item.name}</h5>
                        <p>${item.category || ""}</p>
                        <p>₹${price} / rental</p>
                        <p>Quantity: ${quantity}</p>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    totalElement.textContent = "₹" + total;
}
document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    renderCart();

    renderDressDetails();

});