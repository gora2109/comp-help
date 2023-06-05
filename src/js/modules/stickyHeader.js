let heightWrapper = 0;
function stickyHeader(){
    let header = document.getElementsByClassName('header'),
        wrapper = document.getElementById("wrapper");
    if(header){
        if (heightWrapper > header[0].offsetHeight || heightWrapper < header[0].offsetHeight){
            wrapper.style.paddingTop = `${header[0].offsetHeight}px`;
            heightWrapper = header[0].offsetHeight;
        }
    }

}

document.addEventListener("DOMContentLoaded", function () {
    stickyHeader();
});

window.addEventListener("resize", function () {
    stickyHeader();
});