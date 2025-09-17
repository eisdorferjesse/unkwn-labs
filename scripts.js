/*
 * Common JavaScript for UNKWN LABS website
 *
 * This script manages the shopping cart in localStorage and provides helper
 * functions for product pages and the cart page. It must be loaded after
 * products.js so that the `products` array is available.
 */

// Read the current cart from localStorage. If nothing has been stored yet,
// return an empty array.
function loadCart() {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Could not load cart:', err);
    return [];
  }
}

// Save the current cart back to localStorage.
function saveCart(cart) {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (err) {
    console.error('Could not save cart:', err);
  }
}

// Update the numeric cart count in the navigation. This should be called
// whenever the cart changes.
function updateCartCount() {
  const cart = loadCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = totalItems;
  }
}

// Add a product to the cart. If the product/size combination already exists,
// increase its quantity; otherwise, add a new entry. Quantity defaults to 1.
function addToCart(productId, size, quantity = 1) {
  const cart = loadCart();
  const existing = cart.find(
    (item) => item.productId === productId && item.size === size,
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, size, quantity });
  }
  saveCart(cart);
  updateCartCount();
  // Provide simple feedback to the user. In a production environment
  // you might use a toast notification instead of alert.
  alert('Added to cart!');
}

// Remove an item at a given index from the cart.
function removeFromCart(index) {
  const cart = loadCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
    updateCartCount();
  }
}

// Change the quantity of an item in the cart. If the new quantity is less
// than 1, the item is removed.
function changeQuantity(index, newQty) {
  const cart = loadCart();
  if (index >= 0 && index < cart.length) {
    if (newQty < 1) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = newQty;
    }
    saveCart(cart);
    updateCartCount();
  }
}

// Compute and display the resolution quality for a selected product and size.
// This function assumes the existence of a `.quality-indicator` element in
// the product detail page, which contains child elements representing
// individual dots and a label for descriptive text. It calculates the
// effective pixels-per-inch (PPI) of the print based on the product's
// stored pixel resolution and the chosen print size (in inches). The
// quality is expressed as a rating from 1–5 and descriptive text.
function initQualityIndicator(product) {
  const indicator = document.querySelector('.quality-indicator');
  if (!indicator || !product || !Array.isArray(product.resolution)) {
    return;
  }
  // Show the indicator now that the product details are present
  indicator.style.display = 'flex';
  const dots = indicator.querySelectorAll('.quality-dot');
  const labelEl = indicator.querySelector('.quality-label');
  // Helper to compute PPI and return rating + label
  function computeQuality(sizeStr) {
    if (!sizeStr || !sizeStr.includes('×')) {
      return { rating: 0, label: '' };
    }
    const parts = sizeStr.split('×');
    const widthIn = parseFloat(parts[0]);
    const heightIn = parseFloat(parts[1]);
    const [pxW, pxH] = product.resolution;
    const ppiW = pxW / widthIn;
    const ppiH = pxH / heightIn;
    const ppi = Math.min(ppiW, ppiH);
    let rating;
    let label;
    if (ppi >= 200) {
      rating = 5;
      label = 'Excellent';
    } else if (ppi >= 150) {
      rating = 4;
      label = 'Very good';
    } else if (ppi >= 100) {
      rating = 3;
      label = 'Good';
    } else if (ppi >= 75) {
      rating = 2;
      label = 'Fair';
    } else {
      rating = 1;
      label = 'Poor';
    }
    return { rating, label };
  }
  // Update the DOM based on current selection
  function update() {
    const sizeSelect = document.getElementById('size-select');
    if (!sizeSelect) return;
    const selected = sizeSelect.value;
    const { rating, label } = computeQuality(selected);
    dots.forEach((dot, index) => {
      if (index < rating) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    if (labelEl) {
      // Prefix the quality label with a descriptor for clarity
      labelEl.textContent = 'Resolution: ' + label;
    }
  }
  // Bind change event
  const sizeSelectEl = document.getElementById('size-select');
  if (sizeSelectEl) {
    sizeSelectEl.addEventListener('change', update);
  }
  // Run initial calculation
  update();
}

// Helper to parse query parameters from the current URL.
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Render the product detail page. Must be called on product.html after the DOM
// has loaded and products.js has been included. It reads the `id` query
// parameter and populates the page with the matching product.
function renderProductDetail() {
  const idParam = getQueryParam('id');
  if (!idParam) {
    return;
  }
  const productId = parseInt(idParam, 10);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return;
  }
  const container = document.getElementById('product-detail');
  if (!container) {
    return;
  }
  // Populate product details
  container.querySelector('.product-detail-image').src = product.image;
  container.querySelector('.product-detail-name').textContent = product.name;
  container.querySelector('.product-detail-description').textContent =
    product.description;
  // Populate size selector
  const sizeSelect = container.querySelector('.size-select');
  if (sizeSelect) {
    sizeSelect.innerHTML = '';
    product.sizes.forEach((size) => {
      const option = document.createElement('option');
      option.value = size;
      option.textContent = `${size} – $${product.prices[size]}`;
      sizeSelect.appendChild(option);
    });
  }

  // Populate resolution and selected size information
  const resInfoEl = container.querySelector('#resolution-info');
  if (resInfoEl) {
    // helper to update the info text
    const updateInfo = () => {
      const selectedSize = sizeSelect ? sizeSelect.value : '';
      const [pxW, pxH] = product.resolution || [];
      const originalText = pxW && pxH ? `Original resolution: ${pxW} × ${pxH} px` : '';
      const sizeText = selectedSize ? ` | Selected size: ${selectedSize} in` : '';
      resInfoEl.textContent = `${originalText}${sizeText}`;
    };
    // run immediately and whenever the size changes
    updateInfo();
    if (sizeSelect) {
      sizeSelect.addEventListener('change', updateInfo);
    }
  }
  // Initialise the resolution quality indicator for this product
  initQualityIndicator(product);
  // Add event listener for add to cart button
  const addButton = container.querySelector('.add-to-cart-btn');
  if (addButton) {
    addButton.addEventListener('click', () => {
      const selectedSize = sizeSelect.value;
      addToCart(product.id, selectedSize, 1);
    });
  }
}

// Render the shopping cart page. Should be called on cart.html after the DOM
// has loaded. It builds a table of items with quantity controls and totals.
function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) return;
  const cart = loadCart();
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  let tableHtml =
    '<table class="cart-table"><thead><tr><th>Print</th><th>Size</th><th>Qty</th><th>Price</th><th>Total</th><th></th></tr></thead><tbody>';
  let grandTotal = 0;
  cart.forEach((item, idx) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return;
    const price = product.prices[item.size];
    const total = price * item.quantity;
    grandTotal += total;
    tableHtml += `<tr><td>${product.name}</td><td>${item.size}</td>`;
    tableHtml += `<td><input type="number" min="1" value="${item.quantity}" data-index="${idx}" class="qty-input"/></td>`;
    tableHtml += `<td>$${price.toFixed(2)}</td>`;
    tableHtml += `<td>$${total.toFixed(2)}</td>`;
    tableHtml += `<td><button class="remove-btn" data-index="${idx}">Remove</button></td></tr>`;
  });
  tableHtml +=
    '</tbody><tfoot><tr><td colspan="4" class="grand-total-label">Grand Total</td>' +
    `<td colspan="2" class="grand-total-value">$${grandTotal.toFixed(
      2,
    )}</td></tr></tfoot></table>`;
  cartContainer.innerHTML = tableHtml;
  // Attach events for quantity and remove
  cartContainer.querySelectorAll('.qty-input').forEach((input) => {
    input.addEventListener('change', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      const value = parseInt(e.target.value, 10);
      changeQuantity(index, value);
      renderCart();
    });
  });
  cartContainer.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      removeFromCart(index);
      renderCart();
    });
  });
}

// Kick things off after the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  // If on the product detail page, render product details
  if (document.getElementById('product-detail')) {
    renderProductDetail();
  }
  // If on the cart page, render cart
  if (document.getElementById('cart-container')) {
    renderCart();
  }
});