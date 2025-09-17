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

// Clear the entire cart. Useful after completing a purchase.
function clearCart() {
  saveCart([]);
  updateCartCount();
}

// Render the checkout page. Shows a summary of the cart and a simple
// checkout form for collecting buyer details. Called on checkout.html.
function renderCheckout() {
  const container = document.getElementById('checkout-container');
  if (!container) return;
  const cart = loadCart();
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  // Build summary table
  let tableHtml =
    '<table class="cart-table"><thead><tr><th>Print</th><th>Size</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>';
  let grandTotal = 0;
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return;
    const price = product.prices[item.size];
    const total = price * item.quantity;
    grandTotal += total;
    tableHtml += `<tr><td>${product.name}</td><td>${item.size}</td><td>${item.quantity}</td>` +
                 `<td>$${price.toFixed(2)}</td><td>$${total.toFixed(2)}</td></tr>`;
  });
  tableHtml +=
    `</tbody><tfoot><tr><td colspan="4" class="grand-total-label">Grand Total</td><td>$${grandTotal.toFixed(2)}</td></tr></tfoot></table>`;
  // Build form markup
  const formHtml = `
    <h2>Checkout Details</h2>
    <form id="checkout-form" class="checkout-form">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" id="address" required />
        </div>
        <div class="form-group">
          <label for="city">City</label>
          <input type="text" id="city" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="state">State</label>
          <input type="text" id="state" required />
        </div>
        <div class="form-group">
          <label for="zip">Postal Code</label>
          <input type="text" id="zip" required />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Place Order</button>
    </form>
  `;
  container.innerHTML = tableHtml + formHtml;
  // Handle submission
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your order has been received.');
      clearCart();
      // Redirect to home or shop after order
      window.location.href = 'index.html';
    });
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
      return { rating: 0, label: '', ppi: 0 };
    }
    const parts = sizeStr.split('×');
    const widthIn = parseFloat(parts[0]);
    const heightIn = parseFloat(parts[1]);
    const [pxW, pxH] = product.resolution;
    // Compute pixels per inch in each dimension and use the limiting (minimum)
    // dimension as the effective pixel density. This mirrors how print labs
    // determine sharpness: the lower PPI axis dictates the perceived detail.
    const ppiW = pxW / widthIn;
    const ppiH = pxH / heightIn;
    const ppi = Math.min(ppiW, ppiH);
    let rating;
    let label;
    // Printing quality thresholds: see updateInfo for documentation.
    // Adjusted print quality thresholds to better reflect real‑world
    // viewing experience. At very high PPI (>250) prints are
    // exceptionally sharp. Between 140–249 PPI they remain very
    // detailed. Prints between 100–139 PPI are still quite good,
    // while those between 50–99 PPI are acceptable but softer. Below
    // 50 PPI the print will appear noticeably pixelated.
    if (ppi >= 250) {
      rating = 5;
      label = 'Excellent';
    } else if (ppi >= 140) {
      rating = 4;
      label = 'Very good';
    } else if (ppi >= 100) {
      rating = 3;
      label = 'Good';
    } else if (ppi >= 50) {
      rating = 2;
      label = 'Fair';
    } else {
      rating = 1;
      label = 'Poor';
    }
    return { rating, label, ppi };
  }
  // Update the DOM based on current selection
  function update() {
    const sizeSelect = document.getElementById('size-select');
    if (!sizeSelect) return;
    const selected = sizeSelect.value;
    const { rating, label, ppi } = computeQuality(selected);
    dots.forEach((dot, index) => {
      if (index < rating) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    if (labelEl) {
      // Prefix the quality label and include the computed PPI for transparency
      const ppiRounded = Math.round(ppi);
      labelEl.textContent = `Resolution: ${label} (${ppiRounded} PPI)`;
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
    // Set default selected value to the first size for consistency
    if (product.sizes.length > 0) {
      sizeSelect.value = product.sizes[0];
    }
  }

  // Populate custom size list for a more interactive selection experience. This mimics
  // WhiteWall's size grid with quality dots and pricing. Each row shows
  // the resolution quality (based on pixels-per-inch), the size label and the
  // corresponding price. Clicking a row updates the hidden select and
  // triggers the quality indicator and resolution info updates.
  const sizeListEl = container.querySelector('#size-list');
  if (sizeListEl) {
    // Clear any existing rows
    sizeListEl.innerHTML = '';
    // Helper to compute quality rating (1–5) for a given size
    function computeRating(sizeStr) {
      if (!sizeStr || !sizeStr.includes('×')) return 0;
      const parts = sizeStr.split('×');
      const widthIn = parseFloat(parts[0]);
      const heightIn = parseFloat(parts[1]);
      const [pxW, pxH] = product.resolution;
      const ppiW = pxW / widthIn;
      const ppiH = pxH / heightIn;
      const ppi = Math.min(ppiW, ppiH);
      // Use the same thresholds as the quality indicator for consistency
      if (ppi >= 300) return 5;
      if (ppi >= 200) return 4;
      if (ppi >= 150) return 3;
      if (ppi >= 100) return 2;
      return 1;
    }
    product.sizes.forEach((size, index) => {
      const rating = computeRating(size);
      // Create row container
      const row = document.createElement('div');
      row.className = 'size-row';
      row.dataset.size = size;
      // Quality dots
      const qualityEl = document.createElement('div');
      qualityEl.className = 'size-quality';
      for (let i = 0; i < 5; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i < rating) dot.classList.add('active');
        qualityEl.appendChild(dot);
      }
      // Size label
      const nameEl = document.createElement('span');
      nameEl.className = 'size-name';
      nameEl.textContent = size + '″';
      // Price label
      const priceEl = document.createElement('span');
      priceEl.className = 'size-price';
      priceEl.textContent = '$' + product.prices[size].toFixed(2);
      // Assemble row
      row.appendChild(qualityEl);
      row.appendChild(nameEl);
      row.appendChild(priceEl);
      // Click handler to select this size
      row.addEventListener('click', () => {
        // Update select value
        if (sizeSelect) {
          sizeSelect.value = size;
        }
        // Highlight the selected row
        sizeListEl.querySelectorAll('.size-row').forEach((r) => r.classList.remove('active'));
        row.classList.add('active');
        // Trigger change event to update resolution info and quality indicator
        if (sizeSelect) {
          const event = new Event('change');
          sizeSelect.dispatchEvent(event);
        }
      });
      sizeListEl.appendChild(row);
    });
    // Initially highlight the first size as default selected
    if (sizeListEl.firstChild) {
      sizeListEl.firstChild.classList.add('active');
    }
  }

  // After building the size list and setting default size, trigger a change event on
  // the hidden select to ensure the resolution info and quality indicator
  // initialise with the correct values. Without this explicit dispatch the
  // indicator may not update until the user interacts.
  if (sizeSelect) {
    sizeSelect.dispatchEvent(new Event('change'));
  }

  // Populate resolution and selected size information
  const resInfoEl = container.querySelector('#resolution-info');
  if (resInfoEl) {
    // helper to update the info text
    const updateInfo = () => {
      const selectedSize = sizeSelect ? sizeSelect.value : '';
      const [pxW, pxH] = product.resolution || [];
      const originalText = pxW && pxH ? `Original resolution: ${pxW} × ${pxH} px` : '';
      let sizeText = '';
      let ppiText = '';
      if (selectedSize && selectedSize.includes('×')) {
        sizeText = ` | Selected size: ${selectedSize} in`;
        // Compute PPI for the selected size using the same method as the quality indicator
        const parts = selectedSize.split('×');
        const widthIn = parseFloat(parts[0]);
        const heightIn = parseFloat(parts[1]);
        if (pxW && pxH && widthIn && heightIn) {
          const ppiW = pxW / widthIn;
          const ppiH = pxH / heightIn;
          const ppi = Math.min(ppiW, ppiH);
          const ppiRounded = Math.round(ppi);
          ppiText = ` | Pixel density: ${ppiRounded} PPI`;
        }
      }
      resInfoEl.textContent = `${originalText}${sizeText}${ppiText}`;
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

  // If on the checkout page, render checkout summary and form
  if (document.getElementById('checkout-container')) {
    renderCheckout();
  }
});