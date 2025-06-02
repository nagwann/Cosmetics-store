document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartIconSpan = document.querySelector('#cart-items-count');

    const groupedItems = cartItems.reduce((acc, item) => {
        if (acc[item.name]) {
            acc[item.name].quantity += parseInt(item.quantity, 10) || 1;
        } else {
            acc[item.name] = { ...item, quantity: parseInt(item.quantity, 10) || 1 };
        }
        return acc;
    }, {});

    
    function updateCartItemCount() {
        const itemCount = Object.values(groupedItems).reduce((total, item) => total + item.quantity, 0);
        cartIconSpan.textContent = itemCount;
        console.log("asdasd"+itemCount);
    }
    updateCartItemCount();
});