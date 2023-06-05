function createQuantityInput(){
    let quantity = document.querySelectorAll('input[type="number"]');
    for (let i = 0; i < quantity.length; i++){
        let quantityItem = quantity[i];
        console.log(quantityItem);
        quantityItem.insertAdjacentHTML('beforebegin', '<div class="quantity"></div>');
        let div = quantityItem.closest('div').querySelector('.quantity');
        div.prepend(quantityItem);
        quantityItem.insertAdjacentHTML('beforebegin', '<button type="button" class="quantity-btn quantity-btn-minus" data-quantity="minus"></button>');
        quantityItem.insertAdjacentHTML('afterend', '<button type="button" class="quantity-btn quantity-btn-plus" data-quantity="plus"></button>');
        initQuantityInput(quantityItem);
    }
}

function initQuantityInput(input){
    let quantityInput = input,
        quantityInputMin = quantityInput.min,
        quantityInputMax = quantityInput.max,
        quantityInputStep = quantityInput.step,
        btnMinus = quantityInput.closest('.quantity').querySelector('.quantity-btn-minus'),
        btnPlus = quantityInput.closest('.quantity').querySelector('.quantity-btn-plus'),
        step,
        inputMin,
        inputMax;
    if (quantityInputStep.length != 0){
        step = Number(quantityInputStep);
    } else {
        step = 1;
    }

    if (quantityInputMin.length != 0){
        inputMin = Number(quantityInputMin);
    } else {
        inputMin = 1;
    }

    if (quantityInputMax.length != 0){
        inputMax = Number(quantityInputMax);
    } else {
        inputMax = 9999;
    }





    btnMinus.addEventListener('click', function (e) {
        let btn = e.target,
            input = btn.nextElementSibling;
        if (input.value > inputMin){
            input.value = Number(input.value) - step;
        }
    });
    btnPlus.addEventListener('click', function (e) {
        let btn = e.target,
            input = btn.previousElementSibling;
        if (input.value < inputMax) {
            input.value = Number(input.value) + step;
        }
    })

}

document.addEventListener("DOMContentLoaded", function () {
    createQuantityInput();

});