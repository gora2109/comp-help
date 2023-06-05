//todo: init datePicker functions
//datepicker
let lang = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'hh:mm aa',
    firstDay: 0
},
    datePickerObj = {};

function datepickerInline() {
    let datepickerInline = document.querySelectorAll('.datepicker-inline');
    if (datepickerInline.length){
        for (let i = 0; i < datepickerInline.length; i++){
            let id = datepickerInline[i].getAttribute('id'),
            datepicker = new AirDatepicker(`#${id}`,{
                inline: true,
                prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.0303 18.0303C15.3232 17.7374 15.3232 17.2626 15.0303 16.9697L10.5607 12.5L15.0303 8.03033C15.3232 7.73744 15.3232 7.26256 15.0303 6.96967C14.7374 6.67678 14.2626 6.67678 13.9697 6.96967L8.96967 11.9697C8.67678 12.2626 8.67678 12.7374 8.96967 13.0303L13.9697 18.0303C14.2626 18.3232 14.7374 18.3232 15.0303 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.96967 18.0303C8.67678 17.7374 8.67678 17.2626 8.96967 16.9697L13.4393 12.5L8.96967 8.03033C8.67678 7.73744 8.67678 7.26256 8.96967 6.96967C9.26256 6.67678 9.73744 6.67678 10.0303 6.96967L15.0303 11.9697C15.3232 12.2626 15.3232 12.7374 15.0303 13.0303L10.0303 18.0303C9.73744 18.3232 9.26256 18.3232 8.96967 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                navTitles: {
                    days: 'MMMM yyyy'
                },

                locale: lang,
                firstDay: 0,//week start option
            });

            datePickerObj[`${id}`] = {
                id: id,
                datePicker: datepicker,
            };
        }

    }
}

function datepickerInpute() {
    let datepickerInputs = document.querySelectorAll('.datepicker-input');
    if (datepickerInputs.length){
        for (let i = 0; i < datepickerInputs.length; i++){
            let id = datepickerInputs[i].getAttribute('id');
            if (!datepickerInputs[i].classList.contains('datepicker-input__min') && !datepickerInputs[i].classList.contains('datepicker-input__max')){
                let datepicker = new AirDatepicker(`#${id}`,{
                    dateFormat: 'dd/MM/yyyy',
                    prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.0303 18.0303C15.3232 17.7374 15.3232 17.2626 15.0303 16.9697L10.5607 12.5L15.0303 8.03033C15.3232 7.73744 15.3232 7.26256 15.0303 6.96967C14.7374 6.67678 14.2626 6.67678 13.9697 6.96967L8.96967 11.9697C8.67678 12.2626 8.67678 12.7374 8.96967 13.0303L13.9697 18.0303C14.2626 18.3232 14.7374 18.3232 15.0303 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                    nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.96967 18.0303C8.67678 17.7374 8.67678 17.2626 8.96967 16.9697L13.4393 12.5L8.96967 8.03033C8.67678 7.73744 8.67678 7.26256 8.96967 6.96967C9.26256 6.67678 9.73744 6.67678 10.0303 6.96967L15.0303 11.9697C15.3232 12.2626 15.3232 12.7374 15.0303 13.0303L10.0303 18.0303C9.73744 18.3232 9.26256 18.3232 8.96967 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                    navTitles: {
                        days: 'MMMM yyyy'
                    },
                    locale: lang,

                    onSelect({date, formattedDate, datepicker}) {
                        inputDatepickerPlaceholder(datepicker.$el, formattedDate);
                    },
                });
                datePickerObj[`${id}`] = {
                    id: id,
                    datePicker: datepicker,
                };
            }

        }
    }
}

function MinMaxDatepickerInpute() {
    let minMaxDatepickerBlock = document.querySelectorAll('.datepicker-range__block');
    if (minMaxDatepickerBlock.length){
        for (let i = 0; i < minMaxDatepickerBlock.length; i++){
            let dpMin, dpMax,
                minDatepickerInpute = minMaxDatepickerBlock[i].querySelector('.datepicker-input__min'),
                maxDatepickerInpute = minMaxDatepickerBlock[i].querySelector('.datepicker-input__max'),
                idMin = minDatepickerInpute.getAttribute('id'),
                idMax = maxDatepickerInpute.getAttribute('id');
            if (idMin.length && idMax.length){
                dpMin = new AirDatepicker(`#${idMin}`, {
                    prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.0303 18.0303C15.3232 17.7374 15.3232 17.2626 15.0303 16.9697L10.5607 12.5L15.0303 8.03033C15.3232 7.73744 15.3232 7.26256 15.0303 6.96967C14.7374 6.67678 14.2626 6.67678 13.9697 6.96967L8.96967 11.9697C8.67678 12.2626 8.67678 12.7374 8.96967 13.0303L13.9697 18.0303C14.2626 18.3232 14.7374 18.3232 15.0303 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                    nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.96967 18.0303C8.67678 17.7374 8.67678 17.2626 8.96967 16.9697L13.4393 12.5L8.96967 8.03033C8.67678 7.73744 8.67678 7.26256 8.96967 6.96967C9.26256 6.67678 9.73744 6.67678 10.0303 6.96967L15.0303 11.9697C15.3232 12.2626 15.3232 12.7374 15.0303 13.0303L10.0303 18.0303C9.73744 18.3232 9.26256 18.3232 8.96967 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                    dateFormat: 'dd/MM/yyyy',
                    position: 'bottom left',
                    locale: lang,
                    /*position ({$datepicker, $target, $pointer}) {
                        let coords = $target.getBoundingClientRect(),
                            dpHeight = $datepicker.clientHeight,
                            dpWidth = $datepicker.clientWidth;

                        let top = coords.y + coords.height / 2 + window.scrollY - dpHeight / 2;
                        let left = coords.x + coords.width / 2 - dpWidth / 2;

                        $datepicker.style.left = `0px`;
                        $datepicker.style.bottom = `0px`;

                        $pointer.style.display = 'none';
                    },*/
                    navTitles: {
                        days: 'MMMM yyyy'
                    },
                    onSelect({date, formattedDate, datepicker}) {
                        inputDatepickerPlaceholder(datepicker.$el, formattedDate);
                        dpMax.update({
                            minDate: date,
                        });

                    },
                });

                datePickerObj[`${idMin}`] = {
                    id: idMin,
                    datePicker: dpMin,
                };

                dpMax = new AirDatepicker(`#${idMax}`, {
                    dateFormat: 'dd/MM/yyyy',
                    prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.0303 18.0303C15.3232 17.7374 15.3232 17.2626 15.0303 16.9697L10.5607 12.5L15.0303 8.03033C15.3232 7.73744 15.3232 7.26256 15.0303 6.96967C14.7374 6.67678 14.2626 6.67678 13.9697 6.96967L8.96967 11.9697C8.67678 12.2626 8.67678 12.7374 8.96967 13.0303L13.9697 18.0303C14.2626 18.3232 14.7374 18.3232 15.0303 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                    nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.96967 18.0303C8.67678 17.7374 8.67678 17.2626 8.96967 16.9697L13.4393 12.5L8.96967 8.03033C8.67678 7.73744 8.67678 7.26256 8.96967 6.96967C9.26256 6.67678 9.73744 6.67678 10.0303 6.96967L15.0303 11.9697C15.3232 12.2626 15.3232 12.7374 15.0303 13.0303L10.0303 18.0303C9.73744 18.3232 9.26256 18.3232 8.96967 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                    position: 'bottom right',
                    locale: lang,
                    /*position ({$datepicker, $target, $pointer}) {
                        let coords = $target.getBoundingClientRect(),
                            dpHeight = $datepicker.clientHeight,
                            dpWidth = $datepicker.clientWidth;

                        let top = coords.y + coords.height / 2 + window.scrollY - dpHeight / 2;
                        let left = coords.x + coords.width / 2 - dpWidth / 2;

                        $datepicker.style.left = `${left}px`;
                        $datepicker.style.top = `${top}px`;

                        $pointer.style.display = 'none';
                    },*/
                    navTitles: {
                        days: 'MMMM yyyy'
                    },
                    onSelect({date, formattedDate, datepicker}) {
                        inputDatepickerPlaceholder(datepicker.$el, formattedDate);
                        dpMin.update({
                            maxDate: date
                        });
                    }
                });
                datePickerObj[`${idMax}`] = {
                    id: idMax,
                    datePicker: dpMax,
                };
            }
        }
    }
}

function datepickerInputRange() {
    let datepickerInputRange = document.querySelectorAll('.datepicker-input__range');
    if (datepickerInputRange.length){
        for (let i = 0; i < datepickerInputRange.length; i++){
            let id = datepickerInputRange[i].getAttribute('id');
            if (!datepickerInputRange[i].classList.contains('datepicker-input__min') && !datepickerInputRange[i].classList.contains('datepicker-input__max')){
                let datepicker = new AirDatepicker(`#${id}`,{
                    dateFormat: 'dd/MM/yyyy',
                    prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.0303 18.0303C15.3232 17.7374 15.3232 17.2626 15.0303 16.9697L10.5607 12.5L15.0303 8.03033C15.3232 7.73744 15.3232 7.26256 15.0303 6.96967C14.7374 6.67678 14.2626 6.67678 13.9697 6.96967L8.96967 11.9697C8.67678 12.2626 8.67678 12.7374 8.96967 13.0303L13.9697 18.0303C14.2626 18.3232 14.7374 18.3232 15.0303 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                    nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.96967 18.0303C8.67678 17.7374 8.67678 17.2626 8.96967 16.9697L13.4393 12.5L8.96967 8.03033C8.67678 7.73744 8.67678 7.26256 8.96967 6.96967C9.26256 6.67678 9.73744 6.67678 10.0303 6.96967L15.0303 11.9697C15.3232 12.2626 15.3232 12.7374 15.0303 13.0303L10.0303 18.0303C9.73744 18.3232 9.26256 18.3232 8.96967 18.0303Z"/></svg>',//вставляем SVG-код стрелки
                    navTitles: {
                        days: 'MMMM yyyy'
                    },

                    range: true,
                    multipleDatesSeparator: ' - ',
                    locale: lang,

                    onSelect({date, formattedDate, datepicker}) {
                        inputDatepickerPlaceholder(datepicker.$el, formattedDate);
                    },
                });

                datePickerObj[`${id}`] = {
                    id: id,
                    datePicker: datepicker,
                };
            }

        }
    }
}

function inputDatepickerPlaceholder(elem, value){
    elem.setAttribute('value', value);
    let elementValue = elem.value;
    if (elementValue !== ''){
        if (!elem.closest('.label-wrap').classList.contains('selected')){
            elem.closest('.label-wrap').classList.add('selected')
        }
    } else {
        if (elem.closest('.label-wrap').classList.contains('selected')){
            elem.closest('.label-wrap').classList.remove('selected')
        }
    }
}

function datepickerUpdate(id){
    for (let key in datePickerObj){
        if (datePickerObj[key].id == id){
            datePickerObj[key].datePicker.unselectDate(datePickerObj[key].datePicker.lastSelectedDate);
        }
    }
}

function datepickerRangeUpdate(id){
    for (let key in datePickerObj){
        if (datePickerObj[key].id == id){
            datePickerObj[key].datePicker.unselectDate(datePickerObj[key].datePicker.rangeDateFrom);
            datePickerObj[key].datePicker.unselectDate(datePickerObj[key].datePicker.rangeDateTo);
        }
    }
}

//datepicker

document.addEventListener("DOMContentLoaded", function () {
    datepickerInline();
    datepickerInpute();
    MinMaxDatepickerInpute();
    datepickerInputRange();
});