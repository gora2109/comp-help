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
attachInputObj = {};
/*form validation start*/
function initFormsValidate() {
    let formContent = document.querySelectorAll('.form');
    if (formContent.length){
        for (let i = 0; i < formContent.length; i++){
            formValidate(formContent[i]);
        }
    }
}
function formValidate(element) {
    let formId = element.id,
        inputs = element.querySelectorAll('.form-input'),
        inputGroup = element.querySelectorAll('.form-group'),
        attachInput = element.querySelectorAll('.attach__input');
    if (element.getAttribute('id') == formId){
        const validate = new window.JustValidate(`#${formId}`,
            {
                errorFieldCssClass: 'error',
                errorLabelCssClass: 'error-label',
                successFieldCssClass: 'success',
                successLabelCssClass: 'success-label',
            },
            [
                {
                    key: 'Name is too short',
                    dict: {
                        ru: 'Имя слишком короткое',
                        en: 'Name is too short',
                        ua: 'Назва занадто коротка',
                    },
                },
                {
                    key: 'Field is required',
                    dict: {
                        ru: 'Обязательное поле',
                        en: 'Field is required',
                        ua: 'Поле обов`язкове',
                    },
                },
                {
                    key: 'Field is required. Please enter your phone',
                    dict: {
                        ru: 'Поле, обязательное для заполнения. Пожалуйста, введите свой телефон',
                        en: 'Field is required. Please enter your phone',
                        ua: 'Поле обов`язкове. Будь ласка, введіть свій телефон',
                    },
                },
                {
                    key: 'Field is required. Please enter your password',
                    dict: {
                        ru: 'Поле, обязательное для заполнения. Пожалуйста введите ваш пароль',
                        en: 'Field is required. Please enter your password',
                        ua: 'Поле обов`язкове. Будь ласка, введіть свій пароль',
                    },
                },
                {
                    key: 'Field is required. Please enter your email',
                    dict: {
                        ru: 'Поле, обязательное для заполнения. Пожалуйста, введите адрес электронной почты',
                        en: 'Field is required. Please enter your email',
                        ua: 'Поле обов`язкове. Будь ласка, введіть свою електронну адресу',
                    },
                },
                {
                    key: 'Input field entered incorrectly',
                    dict: {
                        ru: 'Не верно введено поле ввода',
                        en: 'Input field entered incorrectly',
                        ua: 'Поле введення введено невірно',
                    },
                },
                {
                    key: 'You should select at least one communication channel',
                    dict: {
                        ru: 'Вы должны выбрать хотя бы один канал связи',
                        en: 'You should select at least one communication channel',
                        ua: 'Ви повинні вибрати хоча б один канал зв`язку',
                    },
                },
                {
                    key: 'This field is required. Specify a date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите дату',
                        en: 'This field is required. Specify a date',
                        ua: 'Це поле є обов`язковим. Вкажіть дату',
                    },
                },
                {
                    key: 'This field is required. Specify end date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите конечную дату',
                        en: 'This field is required. Specify end date',
                        ua: 'Це поле є обов`язковим. Вкажіть кінцеву дату',
                    },
                },
                {
                    key: 'This field is required. Specify start date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите начальную дату',
                        en: 'This field is required. Specify start date',
                        ua: 'Це поле є обов`язковим. Вкажіть дату початку',
                    },
                },
                {
                    key: 'This field is required. Specify a start and end date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите начальную и конечную дату ',
                        en: 'This field is required. Specify a start and end date',
                        ua: 'Це поле є обов`язковим. Укажіть дату початку та закінчення',
                    },
                },
                {
                    key: 'Uploaded files have one or several invalid properties (extension/size/type etc)',
                    dict: {
                        ru: 'Загруженные файлы имеют одно или несколько недопустимых свойств (расширение/размер/тип и т. д.)',
                        en: 'Uploaded files have one or several invalid properties (extension/size/type etc)',
                        ua: 'Завантажені файли мають одну або декілька недійсних властивостей (розширення/розмір/тип тощо)',
                    },
                },
            ]
        );

        validate.setCurrentLocale('ua');// передаем параметр языка для валидации формы
        //input field initialization on error and required fields
        for (let j = 0; j < inputs.length; j++){
            let id = inputs[j].id,
                inputType =  inputs[j].getAttribute('type');
            if (inputs[j].getAttribute('id') == id){
                if (inputs[j].disabled == false){
                    if(inputType == 'text'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required',
                            },
                        ])
                    } else if(inputType == 'tel'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required. Please enter your phone',
                            },
                        ])
                    } else if(inputType == 'password'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required. Please enter your password',
                            },
                        ])
                    } else if(inputType == 'email'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required. Please enter your email',
                            },{
                                rule: "email",
                                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
                                errorMessage: 'Input field entered incorrectly',
                            }
                        ])
                    } else if(inputType == 'checkbox' || inputType == 'radio'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required',
                            },
                        ])
                    }
                }

            }
            if (inputs[j].disabled == false){
                if(inputs[j].tagName === 'SELECT'){
                    validate.addField(`#${id}`, [
                        {
                            rule: 'required',
                            errorMessage: 'Field is required',
                        },
                    ])
                }
                if (inputs[j].classList.contains('datepicker-input')){
                    if(inputs[j].classList.contains('datepicker-input__max')){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'This field is required. Specify end date',
                            },
                        ])
                    } else if(inputs[j].classList.contains('datepicker-input__min')){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'This field is required. Specify start date',
                            },
                        ])
                    } else {
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'This field is required. Specify a date',
                            },
                        ])
                    }
                }
                if (inputs[j].classList.contains('datepicker-input__range')){
                    validate.addField(`#${id}`, [
                        {
                            rule: 'required',
                            errorMessage: 'This field is required. Specify a start and end date',
                        },
                    ])
                }
            }
        }
        if (attachInput.length){
            for (let y = 0; y < attachInput.length; y++){
                let id = attachInput[y].id;
                if (attachInput[y].getAttribute('id') == id){
                    validate.addField(`#${id}`, [
                        {
                            rule: 'files',
                            value: {
                                files: {
                                    extensions: ['jpeg', 'png', 'jpg'],
                                    maxSize: 2500000,
                                    minSize: 1000,
                                    types: ['image/jpeg', 'image/png', 'image/jpg'],
                                },
                            },
                            errorMessage: 'Uploaded files have one or several invalid properties (extension/size/type etc)',
                        },{
                            rule: 'required',
                            errorMessage: 'This field is required. Specify a start and end date',
                        },

                    ]);
                }
            }
        }
        //groups form initialization
        for(let k = 0; k < inputGroup.length; k++){
            let id = inputGroup[k].id;
            validate.addRequiredGroup(
                `#${id}`,
                'You should select at least one communication channel',

            );
        }
        //method call on success
        validate.onSuccess((ev) => {
            ev.preventDefault();
            // successModal('success-popup');
            // errorModal('error-popup');
            clearForm(validate.form);
        });
        console.log(validate)
    }
}

function successModal(popUpId){
    showPopUp(popUpId);
    setTimeout(closePopup, 3000);
}
function errorModal(popUpId){
    showPopUp(popUpId);
    setTimeout(closePopup, 3000);
}
//form cleanup function
function clearForm(form) {
    form.reset();
    let input = form.querySelectorAll('input');
    for (let i = 0; i < input.length; i++){
        if (input[i].type == 'text' || input[i].type == 'tel' || input[i].type == 'password' || input[i].type == 'email'){
            if (input[i].value != ''){
                input[i].value = "";
            }
        } else if (input[i].type == 'file'){
            if (input[i].value != ''){
                input[i].value = "";
            }
        }

        if (input[i].classList.contains('datepicker-input')){
            datepickerUpdate(input[i].id);
        } else if (input[i].classList.contains('datepicker-input__range')){
            datepickerRangeUpdate(input[i].id)
        }
    }
}

// Добавление Файлов
function initInputFile(){
    let attachInput = document.querySelectorAll('.attach__input');
    for (let i = 0; i < attachInput.length; i++){
        attachInput[i].addEventListener('change', function (e) {

            readURL(this);
            console.log(this.files[0]);
            console.log(this.files);
        })
    }
}

function resetReadURL(input) {

}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            input.closest(".attach").classList.add("attach_active");
            input.closest(".attach").querySelector('.attach__preview').setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}




function inputPlaceholder() {
    let inputs = document.querySelectorAll('input'),
        textareas = document.querySelectorAll('textarea');
    for (let i = 0; i <inputs.length; i++) {
        let input = inputs[i];
        if (input.type == 'text' || input.type == 'tel' || input.type == 'password' || input.type == 'email'){
            initInput(input)
        }
        if (input.type == 'text' || input.type == 'tel' || input.type == 'password' || input.type == 'email'){
            input.addEventListener('change', function () {
                initInput(input);
            })
        }
    }

    for (let j = 0; j <textareas.length; j++) {
        let textarea = textareas[j];
        textarea.addEventListener('change', function () {
            initInput(textarea);
        })
    }
}

//todo: initInput выполняем функцию эффекта placeholder согласно макету
function initInput(elem) {
    let elementValue = elem.value,//полусаем value данного поля
        label = elem.closest('.label-wrap');
    //делаем проверку. Если поле не пустое. То добавляем класс. В противном случае убираем класс
    if (label){
        if (elementValue !== ''){
            if (!label.classList.contains('selected')){
                label.classList.add('selected');
            }
        } else {
            if (label.classList.contains('selected')){
                label.classList.remove('selected');
            }
        }
    }

}

/*form validation end*/

//inputMask start
//phone mask initialization.
function inputMaskPhoneInit() {
    let inputMaskElement = document.querySelectorAll('.phone_mask');
    if (inputMaskElement.length){
        for (let i = 0; i < inputMaskElement.length; i++){
            if (inputMaskElement[i].type == 'text' || inputMaskElement[i].type == 'tel'){
                inputMaskPhone(inputMaskElement[i]);
            }
        }
    }
}
function inputMaskPhone(element) {
    let maskOptions = {
            mask: '+{38}(000)000-00-00'
        },
        mask = IMask(element, maskOptions);
}
//inputMask end
document.addEventListener("DOMContentLoaded", function () {
    initFormsValidate();
    inputMaskPhoneInit();
    inputPlaceholder();
    initInputFile();
});
//Menu burger initialization
function initNavToggle() {
    let header = document.getElementsByClassName('header'),
        btn = header[0].getElementsByClassName('nav-toggle');
    if (btn.length){
        btn[0].addEventListener('click', function (e) {
            e.preventDefault();
            if (!this.closest('.header').classList.contains('active')){
                this.closest('.header').classList.add('active')
                this.closest('body').classList.add('menu-open')
            } else {
                this.closest('.header').classList.remove('active');
                this.closest('body').classList.remove('menu-open');
            }
        })
    }
}

function headerMenuResize(){
    let header = document.getElementsByClassName('header');
    if (window.innerWidth >=  1024 && header[0].classList.contains('active')){
        header[0].classList.remove('active');
        header[0].closest('body').classList.remove('menu-open');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
});

window.addEventListener('resize', function () {
    headerMenuResize();
});

//Menu burger initialization
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
//"show password" function
function showHidePassword() {
    let inputPassword = document.querySelector('.password-input'),
        span;
    if (inputPassword){
        let btnPassword = inputPassword.querySelector('.password-btn');
        btnPassword.addEventListener("mousedown", function (e) {
            let inputValue = inputPassword.querySelector('input[type="password"]').value;
            if (inputValue !== ''){
                inputPassword.insertAdjacentHTML('beforeend',`<span class="password-text">${inputValue}</span>`);
                btnPassword.querySelector('.fa').classList.remove('fa-eye-slash');
                btnPassword.querySelector('.fa').classList.add('fa-eye');
                mouseUpSpan(inputPassword.querySelector('.password-text'));
            }

        });
        btnPassword.addEventListener("mouseup", function (e){
            let inputValue = inputPassword.querySelector('input[type="password"]').value;
            span = inputPassword.querySelector('.password-text');
            if (span != null){
                span.remove();
            }
            if (inputValue !== ''){
                btnPassword.querySelector('.fa').classList.remove('fa-eye');
                btnPassword.querySelector('.fa').classList.add('fa-eye-slash');
            }
        });

    }
}
function mouseUpSpan(div) {
    let inputPassword = document.querySelector('.password-input'),
        btnPassword = inputPassword.querySelector('.password-btn');
    div.addEventListener("mouseup", function (e){
        div.remove();
        btnPassword.querySelector('.fa').classList.remove('fa-eye');
        btnPassword.querySelector('.fa').classList.add('fa-eye-slash');
    });
}

document.addEventListener("DOMContentLoaded", function () {
    showHidePassword();
});
let tabsSlidsHeader = {},
    sliderObj = {};
/*todo: функции слайдера*/
/*sliders*/
/*carousel slider*/
function carousel(){
    let carousel = document.querySelectorAll('.slider-carousel');
    for (let i = 0; i < carousel.length; i++){
        let carouselItem = carousel[i].id;
        initCarousel(carouselItem);
    }
}
function initCarousel(id){
    let sliderId = document.getElementById(id),
        count = sliderId.dataset.carouselSlide,
        startCount = 4;
    if (count != undefined){
        startCount = count
    }
    var swiper = new Swiper(`#${id}`, {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination:{
            el: `.slider-pagination`,
            clickable: true,
        },
        autoplay:true,
        navigation:{
            nextEl: `.slider-nav-btn-next`,
            prevEl: `.slider-nav-btn-prev`,
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: startCount,
                spaceBetween: 32
            }
        }
    });
    sliderObj[`${id}`] = {
        id: id,
        slider: swiper
    }
}
/*carousel slider*/

/*slider tabs*/
function sliderTabs(){
    let tabsSlider = document.querySelectorAll('.slider-tabs');
    if (tabsSlider.length){
        for (let i = 0; i < tabsSlider.length; i++){
            let tabsItemBody = tabsSlider[i].querySelectorAll('.slider-tabs-body__item'),
                tabsItemHeader = tabsSlider[i].querySelectorAll('.slider-tabs-header__item');
            for (let j = 0; j < tabsItemBody.length; j++){
                if (tabsItemBody[j].classList.contains('active')){
                    if (tabsItemBody[j].querySelector('.slider')){
                        initSliderTabs(tabsItemBody[j].querySelector('.slider').id)
                    }
                }
            }
            for (let k = 0; k < tabsItemHeader.length; k++){
                tabsItemHeader[k].addEventListener('click', function (e) {
                    e.preventDefault();
                    for (let h = 0; h < tabsItemHeader.length; h++){
                        for (let key in sliderObj){
                            if (sliderObj[key].id == tabsItemHeader[h].dataset.tabsSlide){
                                sliderObj[key].slider.destroy;
                                delete sliderObj[key];
                            }
                        }

                    }

                    initSliderTabs(tabsItemHeader[k].dataset.tabsSlide);
                })
            }

        }
    }
}
function initSliderTabs(id){
    let sliderId = document.getElementById(id),
        count = sliderId.dataset.carouselSlide,
        startCount = 4;
    if (count != undefined){
        startCount = count
    }
    var swiper = new Swiper(`#${id}`, {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination:{
            el: `.slider-pagination`,
            clickable: true,
        },
        autoplay:true,
        navigation:{
            nextEl: `.slider-nav-btn-next`,
            prevEl: `.slider-nav-btn-prev`,
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 32
            },
            1024: {
                slidesPerView: startCount,
                spaceBetween: 32
            }
        }
    });
    sliderObj[`${id}`] = {
        id: id,
        slider: swiper
    }
}
/*slider tabs*/
/*reviews*/
function initReviewsSlider(){
    var swiper = new Swiper(`#reviews-slider-1 .slider`, {
        slidesPerView: 1,
        spaceBetween: 16,
        autoplay:true,
        navigation:{
            nextEl: `#reviews-slider-1 .slider-nav-btn-next`,
            prevEl: `#reviews-slider-1 .slider-nav-btn-prev`,
        },
    });
}
/*reviews*/
/*sliders*/
document.addEventListener("DOMContentLoaded", function () {
    initReviewsSlider();
    carousel();
    sliderTabs();
});
/*todo: init tabs*/
// Init Tabs
function tabs() {
    let tabs = document.querySelectorAll('.tabs');
    if (tabs.length){
        for (let i = 0; i<tabs.length; i++){
            tabsInit(tabs[i])
        }
    }
}

function tabsInit(tabsBlock) {
    let tabsHeaderItem = tabsBlock.querySelectorAll('.tabs-header__item');
    for (let i = 0; i < tabsHeaderItem.length; i++){
        tabsHeaderItem[i].addEventListener('click', function (e) {
            e.preventDefault();
            tabsClick(tabsHeaderItem[i].dataset['tabs']);
        })
    }
}
function tabsClick(tabsClick) {
    let data = tabsClick,
        tabsBodyActive = document.querySelector(`#${data}`),
        tabsHeader = tabsBodyActive.closest('.tabs').querySelectorAll('.tabs-header__item'),
        tabsBody = tabsBodyActive.closest('.tabs').querySelectorAll('.tabs-body__item');
    for (let i = 0; i < tabsHeader.length; i++){
        tabsHeader[i].classList.remove('active')
    }
    for (let i = 0; i < tabsHeader.length; i++){
        if (tabsHeader[i].dataset['tabs'] == data){
            tabsHeader[i].classList.add('active')
        }
    }

    for (let j = 0; j < tabsBody.length; j++){
        tabsBody[j].classList.remove('active')
    }
    for (let j = 0; j < tabsBody.length; j++){
        if (tabsBody[j].id == data){
            tabsBody[j].classList.add('active');
        }
    }
}

//inits tabs slider

function initTabsSlider() {
    let galleryTabs = document.querySelectorAll('.tabs-header__slider');
    if (galleryTabs.length){
        for (let i = 0; i < galleryTabs.length; i++){
            let idSlideContainer = galleryTabs[i].getAttribute('id'),
                // tabsHeader = galleryTabs[i].querySelector('.tabs-header__slider');
                tabsHeader = galleryTabs[i];
            if(tabsHeader){
                tabsHeaderSlider(idSlideContainer)
            }
        }
    }
}

function tabsHeaderSlider(id) {
    let tabsContainerId,
        tabsHeaderSlider,
        tabsHeaderSliderObj;
    if (typeof id == 'undefined'){
        if (Object.keys(tabsSlidsHeader).length != 0){
            for (let key in tabsSlidsHeader){
                let id = tabsSlidsHeader[key].id;
                tabsContainerId = document.getElementById(id);
                initTabsHeaderSlider(tabsContainerId);
            }
        } else {
            for (let key in sectionId){
                let id = sectionId[key].id;
                tabsContainerId = document.getElementById(id);
                initTabsHeaderSlider(tabsContainerId);
            }
        }
    } else {
        tabsContainerId = document.getElementById(id);
        // sectionId[`${id}`] = {id: id};
        initTabsHeaderSlider(tabsContainerId)
    }

    //init tabs header sliders
    function initTabsHeaderSlider(idContainer) {
        let tabsID = tabsContainerId.id;
        tabsContainerId = idContainer;
        tabsHeaderSlider = idContainer;
        // tabsHeaderSlider = tabsContainerId.getElementsByClassName('tabs-header__slider');
        if (tabsHeaderSlider) {
            // let elem = tabsHeaderSlider[0],
            let elem = tabsHeaderSlider,
                w = 0,
                t = elem.querySelectorAll('.slider-tabs__header_item');
            for (let j = 0; j < t.length; j++) {
                w += t[j].offsetWidth;
            }
            if (w > elem.offsetWidth + 10 && !elem.classList.contains('tabs-vertical')) {
                if (!elem.classList.contains('tabs-header__slider_active')) {
                    elem.classList.add('swiper', 'slider', 'tabs-header__slider_active');
                    elem.querySelector('.tabs-header').classList.add('swiper-wrapper', 'slider-list');
                    tabsHeaderSliderObj = new Swiper(`#${tabsContainerId.id}`, {
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        autoHeight: true,
                        slideClass: 'slider-tabs__header_item',
                        navigation: {
                            nextEl: `#${tabsContainerId.id} .tabs-header__slider .swiper-button-next`,
                            prevEl: `#${tabsContainerId.id} .tabs-header__slider .swiper-button-prev`,
                        },
                    });
                    tabsSlidsHeader[`${tabsID}`] = {
                        id: tabsID,
                        slider: tabsHeaderSliderObj,
                    };
                }
            } else  {
                if (elem.classList.contains('tabs-header__slider_active') && !elem.classList.contains('tabs-vertical')){
                    elem.classList.remove('swiper','slider','tabs-header__slider_active');
                    elem.querySelector('.tabs-header').classList.remove('swiper-wrapper','slider-list');
                    elem.querySelector('.tabs-header').setAttribute('style', '');
                    elem.querySelector('.tabs-header').setAttribute('id', '');
                    for (let key in tabsSlidsHeader){
                        if (tabsSlidsHeader[key].id == tabsID){
                            let id = tabsSlidsHeader[key].slider;
                            id.destroy;
                        }
                    }
                }
            }

            if (elem.classList.contains('tabs-vertical') && window.innerWidth < 768) {
                if (!elem.classList.contains('tabs-header__slider_active')) {
                    elem.classList.add('swiper', 'slider', 'tabs-header__slider_active');
                    elem.querySelector('.tabs-header').classList.add('swiper-wrapper', 'slider-list');
                    tabsHeaderSliderObj = new Swiper(`#${tabsContainerId.id}`, {
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        autoHeight: true,
                        slideClass: 'slider-tabs__header_item',
                        navigation: {
                            nextEl: `#${tabsContainerId.id} .tabs-header__slider .swiper-button-next`,
                            prevEl: `#${tabsContainerId.id} .tabs-header__slider .swiper-button-prev`,
                        },
                    });
                    tabsSlidsHeader[`${tabsID}`] = {
                        id: tabsID,
                        slider: tabsHeaderSliderObj,
                    };
                }
            } else {
                if (elem.classList.contains('tabs-vertical') && elem.classList.contains('tabs-header__slider_active') && window.innerWidth >= 768){
                    elem.classList.remove('swiper','slider','tabs-header__slider_active');
                    elem.querySelector('.tabs-header').classList.remove('swiper-wrapper','slider-list');
                    for (let key in tabsSlidsHeader){
                        if (tabsSlidsHeader[key].id == tabsID){
                            let id = tabsSlidsHeader[key].slider;
                            id.destroy;
                        }
                    }
                }
            }
        }
    }
}

$(window).on('resize', function () {
    initTabsSlider();
});

// Init Tabs
document.addEventListener("DOMContentLoaded", function () {
    initTabsSlider();
    tabs();
});