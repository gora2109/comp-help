// Инициализация аккордиона
function accordion(){
    let accordionSection = document.querySelectorAll('.accordion');
    if (accordionSection.length){
        for (let i = 0; i < accordionSection.length; i++){
            accordionInit(accordionSection[i]);
        }
    }
}

function accordionInit(accordion){
    let accordionItem = accordion.querySelectorAll('.accordion-item__header');
    for (let i = 0; i < accordionItem.length; i++){
        accordionItem[i].addEventListener('click', (e) =>{
            if (!e.target.closest('.accordion-item').classList.contains('active')){
                let items = e.target.closest(".accordion__list").querySelectorAll('.accordion-item')
                for (let j = 0; j < items.length; j++){
                    if (items[j].closest('.accordion-item').classList.contains('active')){
                        items[j].closest('.accordion-item').classList.remove('active')
                    }
                }
                e.target.closest('.accordion-item').classList.add('active');
            } else {
                e.target.closest('.accordion-item').classList.remove('active')
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    accordion();
});