(function ($) {
    "use strict";
    // ГЛобальные переменные
    var header = $(".site-header"),
        wrapper = $('.wrapper');
    function fixHeaderScroll() {
        var header = $('.header'),
            scroll = $(window).scrollTop();

        if (scroll >= 100){
            if (!header.hasClass('scroll')){
                header.addClass('scroll');
            }
        } else {
            if (header.hasClass('scroll')){
                header.removeClass('scroll');
            }
        }
    }
    $(document).ready(function () {
        fixHeaderScroll();
    });
    $(window).scroll(function(){
        fixHeaderScroll();
    });

})(jQuery);