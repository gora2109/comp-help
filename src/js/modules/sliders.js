let tabsSlidsHeader = {},
    sliderObj = {};
/*todo: функции слайдера*/
/*sliders*/
/*banner slider*/
function banner(){
    let banner = document.querySelectorAll('.banner');
    for (let i = 0; i < banner.length; i++){
        let bannerItem = banner[i].id;
        initBanner(bannerItem)
    }
}
function initBanner(id) {
    var swiper = new Swiper(`#${id}`,{
        slidesPerView: 1,
        spaceBetween: 30,
        pagination:{
            el: `.slider-pagination`,
            clickable: true,
        },
        autoplay:true,
        navigation:{
            nextEl: `.slider-nav-btn-next`,
            prevEl: `.slider-nav-btn-prev`,
        }
    });
    sliderObj[`${id}`] = {
        id: id,
        slider: swiper
    }
}
/*banner slider*/

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
/*sliders*/
document.addEventListener("DOMContentLoaded", function () {
    banner();
    carousel();
    sliderTabs();
});