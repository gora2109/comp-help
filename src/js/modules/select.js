let selectObj = {};
function initSelect(){
    // let selectBlock = document.querySelectorAll('select');
    // for (let i = 0; i < selectBlock.length; i++){
    //     let select = NiceSelect.bind(selectBlock[i]);
    //
    // }
    /*var els = document.querySelectorAll("select");
    els.forEach(function(select){
        let id = select.id;
        if (select.id.length){

        }
        let s = NiceSelect.bind(document.getElementById(id));
        selectObj[`${id}`] = {
            id: id,
            select: s
        }
    });*/
    const element = document.querySelectorAll('select');
    element.forEach(function(select){
        const choices = new Choices(select, {
            searchEnabled: false,
            itemSelectText: 'Press to select',
        });
    });

}
document.addEventListener("DOMContentLoaded", function () {
    initSelect();
});