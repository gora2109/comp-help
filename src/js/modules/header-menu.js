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