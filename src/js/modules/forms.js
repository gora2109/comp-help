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
                    },
                },
                {
                    key: 'Field is required',
                    dict: {
                        ru: 'Обязательное поле',
                        en: 'Field is required',
                    },
                },
                {
                    key: 'Field is required. Please enter your phone',
                    dict: {
                        ru: 'Поле, обязательное для заполнения. Пожалуйста, введите свой телефон',
                        en: 'Field is required. Please enter your phone',
                    },
                },
                {
                    key: 'Field is required. Please enter your password',
                    dict: {
                        ru: 'Поле, обязательное для заполнения. Пожалуйста введите ваш пароль',
                        en: 'Field is required. Please enter your password',
                    },
                },
                {
                    key: 'Field is required. Please enter your email',
                    dict: {
                        ru: 'Поле, обязательное для заполнения. Пожалуйста, введите адрес электронной почты',
                        en: 'Field is required. Please enter your email',
                    },
                },
                {
                    key: 'Input field entered incorrectly',
                    dict: {
                        ru: 'Не верно введено поле ввода',
                        en: 'Input field entered incorrectly',
                    },
                },
                {
                    key: 'You should select at least one communication channel',
                    dict: {
                        ru: 'Вы должны выбрать хотя бы один канал связи',
                        en: 'You should select at least one communication channel',
                    },
                },
                {
                    key: 'This field is required. Specify a date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите дату',
                        en: 'This field is required. Specify a date',
                    },
                },
                {
                    key: 'This field is required. Specify end date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите конечную дату',
                        en: 'This field is required. Specify end date',
                    },
                },
                {
                    key: 'This field is required. Specify start date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите начальную дату',
                        en: 'This field is required. Specify start date',
                    },
                },
                {
                    key: 'This field is required. Specify a start and end date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите начальную и конечную дату ',
                        en: 'This field is required. Specify a start and end date',
                    },
                },
                {
                    key: 'Uploaded files have one or several invalid properties (extension/size/type etc)',
                    dict: {
                        ru: 'Загруженные файлы имеют одно или несколько недопустимых свойств (расширение/размер/тип и т. д.)',
                        en: 'Uploaded files have one or several invalid properties (extension/size/type etc)',
                    },
                },
            ]
        );

        validate.setCurrentLocale('ru');// передаем параметр языка для валидации формы
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
            successModal('success-popup');
            errorModal('error-popup');
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