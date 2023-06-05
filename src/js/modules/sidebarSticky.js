/*sticky-sidebar*/
let sidebarObj = {},
    topSpacing,
    sidebarObjSection = {},
    oldData,
    header = document.getElementsByClassName('header');

if (header){
    topSpacing = header[0].offsetHeight;
} else {
    topSpacing = 20
}
function initStickySidebars(){
    let columnLeft = document.getElementById('sidebar-left'),
        columnRight = document.getElementById('sidebar-right');

    if (columnLeft){
        if (window.innerWidth > 1023){
            if (!columnLeft.classList.contains('active')){
                initStickySidebarsLeft(topSpacing)
            }
        } else {
            for (let key in sidebarObj){
                if (sidebarObj[key].id == columnLeft){
                    sidebarObj[key].sidebar.destroy();
                    if (sidebarObj[key].id.classList.contains('active')){
                        sidebarObj[key].id.classList.remove('active');
                    }
                    delete sidebarObj[key];
                }
            }
        }
    }
    if (columnRight){
        if (window.innerWidth > 1023){
            if (!columnRight.classList.contains('active')){
                initStickySidebarsRight(topSpacing);
            }
        } else {
            for (let key in sidebarObj){
                if (sidebarObj[key].id == columnRight){
                    sidebarObj[key].sidebar.destroy();
                    if (sidebarObj[key].id.classList.contains('active')){
                        sidebarObj[key].id.classList.remove('active');
                    }
                    delete sidebarObj[key];
                }
            }
        }
    }



    function initStickySidebarsLeft(top){
        let sidebarLeft = new StickySidebar('#sidebar-left',{
            containerSelector: '#sidebar',
            innerWrapperSelector: '.sidebar-inner__left',
            topSpacing: top,
            bottomSpacing: 20,
            // stickyClass: 'active',
        });
        columnLeft.classList.add('active');
        sidebarObj[`${columnLeft.id}`] = {
            id: columnLeft,
            sidebar: sidebarLeft
        }
    }
    function initStickySidebarsRight(top){
        let sidebarRight = new StickySidebar('#sidebar-right',{
            containerSelector: '#sidebar',
            innerWrapperSelector: '.sidebar-inner__right',
            topSpacing: top,
            bottomSpacing: 20,
            // stickyClass: 'active',
        });
        columnRight.classList.add('active');
        sidebarObj[`${columnRight.id}`] = {
            id: columnRight,
            sidebar: sidebarRight
        }
    }
}



function stickySection(){
    let sticky_section = document.querySelectorAll('.sticky-section'),
        header = document.getElementsByClassName('header'),
        topSpacingHeight;

    if (header){
        topSpacingHeight = header[0].offsetHeight;
    } else {
        topSpacingHeight = 20
    }
    if (sticky_section.length){
        for (let i = 0; i < sticky_section.length; i++){
            let id = sticky_section[i].querySelector('.sticky-container').id;
            if (id){
                initStickySection(id, topSpacingHeight);

            }
        }
        oldData = topSpacingHeight
    }


}

function initStickySection(id, stickyTopHeight){
    let sticky_block = new StickySidebar(`#${id}`,{
        containerSelector: '.sticky-section',
        topSpacing: stickyTopHeight,
    });
    sidebarObjSection[`${id}`] = {
        id: id,
        sidebar: sticky_block
    }
}

function reinitStickySection(){
    if (oldData > header[0].offsetHeight || oldData < header[0].offsetHeight){
        for (let key in sidebarObjSection){
            // sidebarObjSection[key].sidebar.updateSticky();
            sidebarObjSection[key].sidebar.destroy();
            let id = sidebarObjSection[key].id;
            delete sidebarObjSection[key];
            initStickySection(id, header[0].offsetHeight);
        }
        oldData = header[0].offsetHeight;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initStickySidebars();

    stickySection();
});
window.addEventListener("resize", function () {
    initStickySidebars();
    reinitStickySection();
    // stickyHeaderUpdate();
});
/*sticky-sidebar*/
