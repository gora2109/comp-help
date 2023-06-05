function initFullPageScroll() {
    let inSlider = document.getElementsByClassName('docSlider');
    if (inSlider.length){
        docSlider.init({
            horizontal: false
        });
    }
}
document.addEventListener("DOMContentLoaded", function () {
    initFullPageScroll();
});
