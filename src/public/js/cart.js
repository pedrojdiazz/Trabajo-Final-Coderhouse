function addToCart(productId, cartId) {
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: 1 }),
    })
    .then(response => response.json())
    .then(data => {
      const button = document.querySelector(`button[onclick="addToCart('${productId}', '${cartId}')"]`);
      const notification = document.createElement('div');
      notification.style.marginTop = '10px';
  
      if (data.message) {
        notification.textContent = data.message;
        notification.style.color = 'green';
      } else {
        notification.textContent = 'Error al agregar el producto al carrito';
        notification.style.color = 'red';
      }
  
      button.parentNode.insertBefore(notification, button.nextSibling);
  
      setTimeout(() => {
        notification.remove();
      }, 2000);
    })
    .catch(error => {
      const button = document.querySelector(`button[onclick="addToCart('${productId}', '${cartId}')"]`);
      const notification = document.createElement('div');
      notification.textContent = 'Error interno del servidor';
      notification.style.color = 'red';
      notification.style.marginTop = '10px';
      
      button.parentNode.insertBefore(notification, button.nextSibling);
  
      setTimeout(() => {
        notification.remove();
      }, 2000);
    });
  }


  function deleteFromCart(cartId, productId) {
    console.log(cartId, productId);
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        location.reload();
      } else {
        alert('Error al eliminar el producto del carrito');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error interno del servidor', error);
    });
  }