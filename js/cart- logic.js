

    window.addEventListener('DOMContentLoaded', () => {
      let cartItems = [];
      try {
        cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      } catch (e) {
        console.error("Cart data is corrupted");
        cartItems = [];
      }

      const cartTableBody = document.querySelector('#cart-items tbody');
      let subtotal = 0;

      cartItems.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        row.innerHTML = `
          <td><img src="${item.image}" width="70" alt="${item.name}"/></td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          <td><button class="remove-btn" data-name="${item.name}"><i class="fas fa-trash-alt"></i></button></td>
        `;
        cartTableBody.appendChild(row);
      });

      // Add event listeners after DOM insertion
      document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
          const itemName = e.currentTarget.getAttribute('data-name');
          const updatedCart = cartItems.filter(item => item.name !== itemName);
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          location.reload();
        });
      });

      const tax = subtotal * 0.14;
      const total = subtotal + tax;

      document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
      document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
      document.getElementById('total').innerText = `$${total.toFixed(2)}`;
    });
 


// // localStorage.clear();