// init popUp
function popupInit() {
    let body = document.querySelector('.wrapper'),
        popUpWrap = document.querySelectorAll('.popup-wrap'),
        popUp = document.querySelectorAll('.popup');
    let popUpBtn = document.querySelectorAll('.popup-init');
    for (let i = 0; i < popUpBtn.length; i++){
        popupInitBtn(popUpBtn[i], body, popUp);
    }
    // Close on Esc
    document.addEventListener('keyup', event => {
        if (event.code === 'Escape'){
            if (body.classList.contains('popup-visible')){
                body.classList.remove('popup-visible');
                document.querySelector('body').classList.remove('popup-open');
                for (let j = 0; j < popUp.length; j++){
                    popUp[j].classList.remove('active');
                }
            }
        }
    });
    // Close on click outside popup
    document.addEventListener('mouseup', e => {
        let target = e.target,
            popup = popUpWrap,
            its_popup,
            its_popup_is_active;
        for (let i = 0; i < popUp.length; i++){
            if (popUp[i].classList.contains('active')){
                popup = popUp[i];
                its_popup = target == popup || popup.contains(target);
                its_popup_is_active = popup.classList.contains('active');
                if (!its_popup && its_popup_is_active){
                    body.classList.remove('popup-visible');
                    document.querySelector('body').classList.remove('popup-open');
                    for (let j = 0; j < popUp.length; j++){
                        popUp[j].classList.remove('active');
                    }

                }
            }
        }
    });
}

function popupInitBtn(popupBtn, body, popUp) {
    popupBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let data = popupBtn.dataset['popupname'];
        showPopUp(data);
    });
}

function showPopUp(popUpName) {
    let popupBlock = document.querySelector(`.${popUpName}`),
        body = document.querySelector('.wrapper'),
        popUp = document.querySelectorAll('.popup');
    if (!body.classList.contains('.popup-visible')){
        document.querySelector('body').classList.add('popup-open');
        body.classList.add('popup-visible');
        for (let j = 0; j < popUp.length; j++){
            popUp[j].classList.remove('active');
        }
        popupBlock.classList.add('active');
        closePopupButton(popupBlock);
    }
}

// Cross closure
function closePopupButton(popupBlock) {
    let popupRemove = popupBlock.querySelectorAll('.popup-remove');
    for (let i = 0; i < popupRemove.length; i++){
        popupRemove[i].addEventListener('click', function (e) {
            e.preventDefault();
            closePopup();
        })
    }
}

function closePopup() {
    let body = document.querySelector('.wrapper'),
        popUp = document.querySelectorAll('.popup');
    if (body.classList.contains('popup-visible')){
        body.classList.remove('popup-visible');
        document.querySelector('body').classList.remove('popup-open');
        for (let j = 0; j < popUp.length; j++){
            popUp[j].classList.remove('active');
        }
    }

}
// init popUp
document.addEventListener("DOMContentLoaded", function () {
    popupInit();
});