(function ($) {
    "use strict";
    // ГЛобальные переменные
    var header = $(".site-header"),
        wrapper = $('.wrapper');
    // PRELOADER
    preloader();
    function preloader(){
        wrapper.on("click", ".nav__link", function (event) {
            event.preventDefault();
            var linkLocation = this.href;
            wrapper.removeClass('wrapper_ready-load');
            setTimeout(function () {
                window.location = linkLocation;
            }, 500);
        });
        setTimeout(function () {
            wrapper.addClass('wrapper_ready-load');
        }, 0);
    }
    navInit();
    function navInit() {
        header.find(".nav-toggle").on("click", function () {
            $(this).closest(header).toggleClass("site-header_menu-active");
        });
    }

    // Открытие под меню
    dropDownInit();
    function dropDownInit() {
        header.find(".dropdown__icon").on("click", function () {
            $(this).closest(".dropdown").toggleClass("dropdown_active");
        });
    }

    // Анимация при скролле страницы
    $(window).on('load resize scroll', function () {
        if ($(window).scrollTop() >= 1) {
            header.addClass('site-header_animation');
        } else {
            header.removeClass('site-header_animation');
        }
    });

    // Анимация при доскраливании до секции
    $(window).on('load resize scroll', function () {
        let h = $(window).height();
        $(".section").each(function () {
            if (($(window).scrollTop() + h) >= $(this).offset().top) {
                $(this).addClass("section_animation");
            }
        });
    });

    /*// Инициализация табов
    if ($(".tabs-header").length) {
        tabsInit();
    }
    function tabsInit() {
        let position,
            tabsBodyItem = $(".tabs-body__item");
        $('.tabs-header').on("click", ".tabs-header__item", function () {
            position = $(this).index();
            $(this).addClass("tabs-header__item_active").siblings(".tabs-header__item").removeClass("tabs-header__item_active");
            tabsBodyItem.eq(position).addClass("tabs-body__item_active").siblings(tabsBodyItem).removeClass("tabs-body__item_active");
        });
    }

    // Инициализация аккордиона
    if ($(".accordion").length) {
        accordionInit();
    }
    function accordionInit() {
        $('.accordion').on("click", ".accordion-item__header", function () {
            $(this).closest(".accordion-item").toggleClass("accordion-item_active").siblings(".accordion-item").removeClass("accordion-item_active");

        });
    }*/


    // Валидация и кастомизация формы
    if ($("form").length) {
        // Валидация формы
        // formValidation();
        // Стилизация Формы
        // jcf.setOptions('Select', {
        //     wrapNative: false,
        //     useCustomScroll: false,
        //     fakeDropInBody: false
        // });
        // jcf.replaceAll();
        // Маска формы
        // $(".phone_mask").mask("8(999) 999-99-99");
        // Добавление Файлов
        /*function readURL(input , currentInput) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    currentInput.closest(".attach").addClass("attach_active").find('.attach__preview').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]); // convert to base64 string
            }
        }
        $(".attach__input").change(function() {
            var currentInput = $(this);
            readURL(this, currentInput);
        });*/
    }

    function formValidation() {
        let form = $("form");
        form.submit(function () {
            if ($(this).valid()) {
                return true;
            } else {
                return false;
            }
        });
        form.each(function () {
            $(this).validate({
                rules: {
                    name: {
                        required: true,
                        name: true
                    },
                    phone: {
                        required: true
                    }
                }
            });
        });
        /*form.validate({
            rules: {
                name: {
                    required: true,
                    name: true
                },
                phone: {
                    required: true
                }
            }
        });*/
    }

    // Инициализация попапов
    // popupInit();
    function popupInit() {
        let popupName;
        // Вызов Попапа
        $(document).on('click', '.popup-init', function () {
            wrapper.addClass("popup-visible").find(".popup").removeClass("active");
            popupName = $(this).data("popupname");
            wrapper.find("."+ popupName + "").addClass("active");
        });
        // Закрытие по клику вне попапа
        $(document).mouseup(function (e){
            if($(".popup.active").length) {
                var div = $(".popup.active");
                if (!div.is(e.target) && div.has(e.target).length === 0) {
                    wrapper.removeClass("popup-visible").find(".popup").removeClass("active");
                }
            }
        });
        // Закрытие по Крестику
        $(document).on('click', '.popup-remove', function () {
            wrapper.removeClass("popup-visible").find(".popup").removeClass("active");
        });
        // Закрытие по Esc
        document.onkeydown = function(e) {
            if(e.key === "Escape") {
                wrapper.removeClass("popup-visible").find(".popup").removeClass("active");
            }
        };
    }

})(jQuery);

//global variables

var fade = {
    fade_in_from: 0,
    fade_out_from: 4
};
/*function fadeOut(elementBlock) {
    var target = elementBlock;
    if(getComputedStyle(target, "").opacity == 0)return;
    var newSetting = fade.fade_out_from / 4;
    target.style.opacity = newSetting;
    fade.fade_out_from--;

    if (fade.fade_out_from === 0) {
        target.style.opacity = 0;
        target.style.display = "none";

        clearTimeout(loopTimer);

        fade.fade_out_from = 4;
        return false;
    }


    var loopTimer = setTimeout('fadeOut(\''+elementBlock+'\')', 300);
}*/

/*function fadeIn(elementBlock) {
    var target = elementBlock;
    // console.log(target)
    // console.log(getComputedStyle(target, "").opacity)
    if(getComputedStyle(target, "").opacity==1){
        return;
    }
    target.style.display = "block";
    var newSetting = fade.fade_in_from / 4;
    target.style.opacity = newSetting;
    fade.fade_in_from++;

    if (fade.fade_in_from === 4) {
        target.style.opacity = 1;

        clearTimeout(loopTimer);

        fade.fade_in_from = 0;
        return false;
    }


    var loopTimer = setTimeout('fadeIn(\''+elementBlock+'\')', 300);
}*/
/*fade*/
function fadeOut(element){
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
            element.style.opacity = 0;
        } else {
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.3;
        }

    }, 50);
}
function fadeIn(element){
    var op = 0.1;  // initial opacity

    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
            element.style.display = 'block';
            element.style.opacity = 1;
        } else {
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.3;
        }
    }, 10);
}
/*fade*/