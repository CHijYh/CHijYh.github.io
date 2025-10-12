document.addEventListener('DOMContentLoaded', function () {
  const calculateBtn = document.getElementById('calculate');
  const quantityInput = document.getElementById('quantity');
  const productSelect = document.getElementById('product');
  const message = document.getElementById('message');

  calculateBtn.addEventListener('click', function () {
    const quantityStr = quantityInput.value.trim();

    const isValid = /^[1-9]\d*$/.test(quantityStr);

    if (!isValid) {
      message.style.color = 'Red';
      message.textContent = 'Пожалуйста, введите корректное количество (только положительные целые числа).'; 
      return;
    }

    message.style.color = 'Black';

    const quantity = parseInt(quantityStr);
    const price = parseInt(productSelect.value);

    const total = quantity * price;

    message.textContent = 'Общая стоимость заказа: '+ total +' руб.';
  });
});
