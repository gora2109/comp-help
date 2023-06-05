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