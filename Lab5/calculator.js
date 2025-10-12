document.addEventListener("DOMContentLoaded", function () {
    var calculateButton = document.getElementById("calculate");
    var quantityInput = document.getElementById("quantity");
    var productSelect = document.getElementById("product");
    var message = document.getElementById("message");

    calculateButton.addEventListener("click", function () {
        var quantityStr = quantityInput.value.trim();
        var isValid = /^[1-9]\d*$/.test(quantityStr);
        var quantity = parseInt(quantityStr);
        var price = parseInt(productSelect.value);
        var total = quantity * price;
        if (!isValid) {
            message.style.color = "Red";
            message.textContent = "Пожалуйста, введите корректное количество.";
            return;
        }

        message.style.color = "Black";
        message.textContent = "Общая стоимость заказа: " + total + " руб.";
    });
});
