document.addEventListener("DOMContentLoaded", function() {
  // Configurar la fecha actual por defecto
  const today = new Date().toISOString().split('T')[0];
  document.getElementById("entry-date").value = today;

  // Validación: Precio de venta > Precio de compra
  document.getElementById("sale-price").addEventListener("change", function() {
    const purchasePrice = parseFloat(document.getElementById("purchase-price").value);
    const salePrice = parseFloat(this.value);
    if (salePrice <= purchasePrice) {
      alert("El precio de venta debe ser mayor al de compra");
      this.value = "";
    }
  });

  // Manejo del envío del formulario
  const form = document.getElementById("inventory-form");
  const confirmationMessage = document.getElementById("confirmation-message");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById("name").value,
      brand: document.getElementById("brand").value,
      category: document.getElementById("category").value,
      purchasePrice: document.getElementById("purchase-price").value,
      salePrice: document.getElementById("sale-price").value,
      quantity: document.getElementById("quantity").value,
      entryDate: document.getElementById("entry-date").value
    };
    
    // Aquí iría tu endpoint para guardar en inventario
    fetch('https://hook.us1.make.com/xxxxxxxxxxxxx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Éxito:", data);
      confirmationMessage.classList.remove("hidden");
      form.reset();
      document.getElementById("entry-date").value = today; // Restablecer fecha
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al registrar el producto");
    });
  });
});