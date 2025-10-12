document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
});

function initCalculator() {
    const calculatorForm = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const resultText = document.getElementById('result-text');
    const errorText = document.getElementById('error-text');
    
    calculatorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        resultDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        
        const productSelect = document.getElementById('product');
        const quantityInput = document.getElementById('quantity');
        
        const selectedProduct = productSelect.value;
        const quantity = quantityInput.value.trim();
        
        if (!selectedProduct) {
            showError('Пожалуйста, выберите товар из списка.');
            return;
        }
        
        const quantityRegex = /^[1-9][0-9]*$/;
        if (!quantityRegex.test(quantity)) {
            showError('Пожалуйста, введите корректное количество. Допускаются только цифры, начиная с 1.');
            quantityInput.focus();
            return;
        }
        
        const price = parseInt(selectedProduct, 10);
        const quantityNum = parseInt(quantity, 10);
        
        if (quantityNum > 1000000) {
            showError('Количество товара слишком большое. Пожалуйста, введите значение меньше 1 000 000.');
            return;
        }
        
        const totalCost = calculateTotalCost(price, quantityNum);
        
        showResult(price, quantityNum, totalCost);
    });
    
    const formInputs = calculatorForm.querySelectorAll('input, select');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            errorDiv.style.display = 'none';
        });
    });
}

function calculateTotalCost(price, quantity) {
    return price * quantity;
}

function showResult(price, quantity, totalCost) {
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('result-text');
    
    const formattedPrice = formatNumber(price);
    const formattedQuantity = formatNumber(quantity);
    const formattedTotal = formatNumber(totalCost);
    
    const productSelect = document.getElementById('product');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const productName = selectedOption.text.split(' - ')[0];
    
    resultText.innerHTML = `
        <strong>Товар:</strong> ${productName}<br>
        <strong>Цена за единицу:</strong> ${formattedPrice} руб.<br>
        <strong>Количество:</strong> ${formattedQuantity} шт.<br>
        <strong>Общая стоимость:</strong> <span class="text-success fw-bold">${formattedTotal} руб.</span>
    `;
    
    resultDiv.style.display = 'block';
    
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    const errorText = document.getElementById('error-text');
    
    errorText.textContent = message;
    errorDiv.style.display = 'block';
    
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}