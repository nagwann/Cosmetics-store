document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartIconSpan = document.querySelector('#cart-items-count');

    // Group items by name and calculate total quantities
    const groupedItems = cartItems.reduce((acc, item) => {
        if (acc[item.name]) {
            acc[item.name].quantity += parseInt(item.quantity, 10) || 1;
        } else {
            acc[item.name] = { ...item, quantity: parseInt(item.quantity, 10) || 1 };
        }
        return acc;
    }, {});

    // Convert grouped items to an array for easier processing
    const groupedItemsArray = Object.values(groupedItems);

    if (groupedItemsArray.length === 0) {
        cartItemsContainer.innerHTML =
            '<tr><td colspan="3">Your cart is empty</td></tr>';
    } else {
        let subtotal = 0;

        groupedItemsArray.forEach((item, index) => {
            const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            const itemQuantity = item.quantity;

            const itemRow = document.createElement("tr");
            itemRow.innerHTML = `
                <tr>
                    <td>
                        <div class="cart-info">
                            <img src="${item.image}" alt="${item.name}" />
                            <div>
                                <p>${item.name}</p>
                                <span>Price: ${item.price} EGP</span> <br/>
                                <a href="#" class="remove-item">remove</a>
                            </div>
                        </div>
                    </td>
                    <td><input type="number" value="${itemQuantity}" min="1" class="quantity-input" data-name="${item.name}" /></td>
                    <td class="item-total">${(itemPrice * itemQuantity).toFixed(2)} EGP</td>
                </tr>
            `;

            cartItemsContainer.appendChild(itemRow);
        });

        updateCartTotals();

        // Add event listener to quantity inputs
        cartItemsContainer.addEventListener("input", (event) => {
            if (event.target.classList.contains("quantity-input")) {
                const input = event.target;
                const itemName = input.getAttribute("data-name");
                const newQuantity = parseInt(input.value, 10);

                // Update the item's total price based on the new quantity
                const item = groupedItems[itemName];
                const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
                const newTotalPrice = itemPrice * newQuantity;

                // Update the total price in the DOM
                input.closest("tr").querySelector(".item-total").textContent = `${newTotalPrice.toFixed(2)} EGP`;

                // Update quantity in cartItems array
                item.quantity = newQuantity;

                // Update localStorage
                localStorage.setItem("cartItems", JSON.stringify(Object.values(groupedItems)));

                // Recalculate and update cart totals
                updateCartTotals();
                updateCartItemCount();
            }
        });

        // Remove item from cart
        cartItemsContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-item")) {
                const itemRow = event.target.closest("tr");
                const itemName = itemRow.querySelector(".cart-info p").textContent;

                // Remove item from groupedItems
                delete groupedItems[itemName];

                // Update localStorage
                localStorage.setItem("cartItems", JSON.stringify(Object.values(groupedItems)));

                // Refresh the page
                location.reload();
            }
        });
    }

    function updateCartTotals() {
        const itemTotals = document.querySelectorAll(".item-total");
        let subtotal = 0;

        itemTotals.forEach((itemTotal) => {
            const price = parseFloat(itemTotal.textContent.replace(/[^0-9.-]+/g, ""));
            subtotal += price;
        });

        const tax = subtotal * 0.1; // Assuming 10% tax rate
        const total = subtotal + tax;

        document.getElementById("subtotal").textContent = `${subtotal.toFixed(2)} EGP`;
        document.getElementById("tax").textContent = `${tax.toFixed(2)} EGP`;
        document.getElementById("total").textContent = `${total.toFixed(2)} EGP`;
    }
});