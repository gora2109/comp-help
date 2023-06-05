/*button scroll top*/

function scrollTopShow(){
    let back_to = document.querySelectorAll('.back-to');
    if (back_to.length){
        for (let i = 0; i < back_to.length; i++){
            if (back_to[i].classList.contains('top')){
                if (window.scrollY > 300){
                    if (back_to[i].style.opacity == 0){
                        fadeIn(back_to[i]);
                    }
                } else {
                    if (back_to[i].style.opacity == 1){
                        fadeOut(back_to[i]);
                    }
                }
            }
        }
    }
}

function scrollTopClick(){
    let back_to = document.querySelectorAll('.back-to.top');
    if (back_to.length){
        for (let i = 0; i < back_to.length; i++){
            back_to[i].addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                return false;
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    scrollTopShow();
    scrollTopClick();
});
window.addEventListener('scroll', function () {
    scrollTopShow();
});
/*button scroll top*/