document.addEventListener("DOMContentLoaded", function () {
    var quantityInput = document.getElementById("quantity");
    var optionsDiv = document.getElementById("optionsDiv");
    var attributeDiv = document.getElementById("attributeDiv");
    var optionsSelect = document.getElementById("options");
    var attributeCheckbox = document.getElementById("attribute");
    var message = document.getElementById("message");
    var serviceRadios = document.querySelectorAll("input[name='serviceType']");

    var selectedType = null;

    var basePrices = {
        "1": 100,
        "2": 200,
        "3": 300
    };

    function updateVisibility() {
        if (selectedType === "1") {
            optionsDiv.classList.add("hidden");
            attributeDiv.classList.add("hidden");
        } else if (selectedType === "2") {
            optionsDiv.classList.remove("hidden");
            attributeDiv.classList.add("hidden");
        } else if (selectedType === "3") {
            optionsDiv.classList.add("hidden");
            attributeDiv.classList.remove("hidden");
        }
    }

    function calculateTotal() {
        var quantityStr = quantityInput.value.trim();
        var quantity = parseInt(quantityStr);
        var total = basePrices[selectedType] * quantity;
        var optionPrice = parseInt(optionsSelect.value);
        if (quantityStr === "") {
            message.style.color = "Black";
            message.textContent = "Стоимость: 0 руб.";
            return;
        }

        if (!(/^[1-9]\d*$/.test(quantityStr))) {
            message.style.color = "Red";
            message.textContent = "Пожалуйста, введите корректное количество.";
            return;
        }

        if (!selectedType) {
            message.style.color = "Red";
            message.textContent = "Пожалуйста, выберите тип услуги.";
            return;
        }

        if (selectedType === "2") {
            total += optionPrice * quantity;
        }

        if (selectedType === "3" && attributeCheckbox.checked) {
            total += 200 * quantity;
        }

        message.style.color = "Black";
        message.textContent = "Стоимость: " + total + " руб.";
    }

    serviceRadios.forEach(function (radio) {
        radio.addEventListener("change", function () {
            selectedType = this.value;
            updateVisibility();
            calculateTotal();
        });
    });

    quantityInput.addEventListener("input", calculateTotal);
    optionsSelect.addEventListener("change", calculateTotal);
    attributeCheckbox.addEventListener("change", calculateTotal);
});
