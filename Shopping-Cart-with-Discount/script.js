// Cart items stored as an array of objects
let cart = [
  { name: "Notebook", price: 120, quantity: 1 },
  { name: "Pen Pack", price: 60, quantity: 1 },
  { name: "Water Bottle", price: 350, quantity: 1 }
];

const cartBody = document.getElementById("cart-body");
const cartTable = document.getElementById("cart-table");
const emptyMessage = document.getElementById("empty-message");
const summary = document.getElementById("summary");

// Draw the table and update all the calculations
function renderCart() {
  cartBody.innerHTML = "";

  // If the cart is empty, show the message and hide the table + summary
  if (cart.length === 0) {
    cartTable.classList.add("hidden");
    summary.classList.add("hidden");
    emptyMessage.classList.remove("hidden");
    return;
  }

  cartTable.classList.remove("hidden");
  summary.classList.remove("hidden");
  emptyMessage.classList.add("hidden");

  let subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + item.name + "</td>" +
      "<td>Rs. " + item.price + "</td>" +
      "<td>" +
        '<button class="qty-btn" onclick="decreaseQty(' + i + ')">-</button> ' +
        '<span class="qty-value">' + item.quantity + "</span> " +
        '<button class="qty-btn" onclick="increaseQty(' + i + ')">+</button>' +
      "</td>" +
      "<td>Rs. " + itemTotal + "</td>" +
      '<td><button class="remove-btn" onclick="removeItem(' + i + ')">Remove</button></td>';
    cartBody.appendChild(row);
  }

  // 10% discount if subtotal is Rs. 1000 or more
  let discount = 0;
  if (subtotal >= 1000) {
    discount = subtotal * 0.10;
  }
  const finalAmount = subtotal - discount;

  document.getElementById("subtotal").textContent = "Rs. " + subtotal.toFixed(2);
  document.getElementById("discount").textContent = "Rs. " + discount.toFixed(2);
  document.getElementById("final").textContent = "Rs. " + finalAmount.toFixed(2);
}

function increaseQty(index) {
  cart[index].quantity++;
  renderCart();
}

function decreaseQty(index) {
  // Quantity must never go below 1
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  }
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

renderCart();
