// Инициализация аккордиона
function accordion(){
    let accordionSection = document.querySelectorAll('.accordion');
    if (accordionSection.length){
        for (let i = 0; i < accordionSection.length; i++){
            accordionInit(accordionSection[i]);
        }
    }
}

function accordionInit(accordion){
    let accordionItem = accordion.querySelectorAll('.accordion-item__header');
    for (let i = 0; i < accordionItem.length; i++){
        accordionItem[i].addEventListener('click', (e) =>{
            if (!e.target.closest('.accordion-item').classList.contains('active')){
                let items = e.target.closest(".accordion__list").querySelectorAll('.accordion-item')
                for (let j = 0; j < items.length; j++){
                    if (items[j].closest('.accordion-item').classList.contains('active')){
                        items[j].closest('.accordion-item').classList.remove('active')
                    }
                }
                e.target.closest('.accordion-item').classList.add('active');
            } else {
                e.target.closest('.accordion-item').classList.remove('active')
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    accordion();
});
let videoArray = [];
//todo: initVideo. функция инициализации видео файлов
//init video sttart
function initVideo() {
    let videoBlock = document.querySelectorAll('.video-block'),
        id;
    if (videoBlock.length){
        let players = Array.from(videoBlock).map(p => new Plyr(p,{
            youtube: {
                loop: 1,
                controls: 0,
            },
            volume: 1,
            // iconUrl: '../images/content/plyr-sprite.svg',//ссылка на самостоятельный спрайт иконок
            controls: [
                'play-large',
                'progress',
                'fullscreen',
            ],
        }));
        players.forEach(player => {
            player.on('play', ev =>{
                let playerId = ev.detail.plyr.id;
                players.forEach(pl =>{
                    if (playerId != pl.id){
                        pl.pause();
                    }
                });
            });
        });
    }

}
//init video end

//todo: функция иницииализации аудио файлов
//init Audio
function initAudioPlayer(){
    let players = Array.from(document.querySelectorAll('audio')).map(p => new Plyr(p, {
        controls: ['play', 'progress', 'current-time']
    }));
    if (document.querySelectorAll('.tracks').length){
        audioTrack(players);
    }
    players.forEach(player => {
        player.on('ready', event => {
            event.target.setAttribute('data-id' , player.id);
        });

        player.on('play', ev => {
            var Id = ev.target.dataset.id;
            players.forEach(pl => {
                if (Id != pl.id) {
                    pl.pause();
                }

            });
        });
        player.on('ended', ev => {
            let Id = ev.target.dataset.id;
            players.forEach(pl => {
                if (Id == pl.id) {
                    pl.stop();
                }
            });
        });
    });
}

function audioTrack(audioArray) {
    audioArray.forEach(player =>{
        player.on('play', ev => {
            var Id = ev.target.dataset.id;
            audioArray.forEach(pl => {
                if (ev.detail.plyr.media.classList.contains('track-player__audio')){
                    if (Id == pl.id) {
                        pl.media.closest('.track-item').classList.add('active');
                    }
                }

            });
        });
        player.on('pause', ev => {
            var Id = ev.target.dataset.id;
            audioArray.forEach(pl => {
                if (ev.detail.plyr.media.classList.contains('track-player__audio') && pl.media.closest('.track-item').classList.contains('active')){
                    if (Id == pl.id) {
                        pl.media.closest('.track-item').classList.remove('active');
                    }
                }
            });
        });
        player.on('ended', ev => {
            let itemActive = ev.target.dataset.id,
                trackListItems = ev.detail.plyr.media.closest('.track-item').nextElementSibling;
            if(trackListItems != null){
                audioArray.forEach(pl => {
                    if (ev.detail.plyr.media.classList.contains('track-player__audio')){
                        if (trackListItems.querySelector('.plyr').dataset.id == pl.id){
                            pl.play();
                        }
                    }
                });
            }
        });
    });
}
//init Audio

document.addEventListener("DOMContentLoaded", function () {
    initVideo();
    initAudioPlayer();
});
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
/*todo: chartContainer функция инициализации графиков*/
function chartContainer(){
    let chartArray = [];


    getChartContainer();
    /*getChartContainer - находим на странице сайта все элементы блока по имени класса chart-canvas.
    * в найденном элементе блока chart-canvas находим элемент canvas. В элементе canvas получаем 3 параметра для инициализаци графика:
    * 1)имя-id,
    * 2)data-атрибут "data-chart-type" - данный атрибут передает соответсвующий тип графика.
    * Часто используеммые типы графиков:
    * 2.1)line - график линиями
    * 2.2)bar - график полос
    * 2.3)polarArea - график полякной области
    * 2.4)doughnut - график "пончик"
    * 2.5)pie - график "пирог"
    * 2.6) radar - график пайтины. Примечание. Для данного типа графика необходим масси из нескольких параметров
    * 3)data-атрибут "data-chart-coordinates" - данный атрибут передает место хранения координат с данными по которому будет строится данный график. Все наши координаты хранятся в JSON файле
    * Если одного из 3-х параметров не будет, по график не построится */


    function getChartContainer() {
        let chartContainers = document.querySelectorAll('.chart-canvas');
        if (chartContainers.length){
            chartContainers.forEach((elem)=>{
                let ChartCanvas = elem.querySelector('.chart-canvas__container'),
                    chartId = ChartCanvas.id,
                    ChartType = ChartCanvas.dataset.chartType,
                    chartCoordinates = ChartCanvas.dataset.chartCoordinates;

                if (chartId != "" && ChartType != "" && chartCoordinates != ''){
                    chartArray.push({
                        idChart: chartId,
                        typeChart: ChartType,
                        coordinatesChart: chartCoordinates
                    })
                }

            })
        }
    }

    /*jsonChartLabels функция получения данных X-координат для графика*/
    function jsonChartLabels(jsonUrl){
        let xhr = new XMLHttpRequest(),
            coordinates = [],
            jsonData;
        xhr.open("GET", `${jsonUrl}`, false);
        xhr.send();
        jsonData = JSON.parse(xhr.responseText);
        for (let i = 0; i < jsonData.length; i++){
            coordinates.push(String(jsonData[i].label));
        }
        return coordinates;
    }
    /*jsonChartData функция получения данных Y-координат для графика*/
    function jsonChartData(jsonUrl){
        let xhr = new XMLHttpRequest(),
            coordinates = [],
            multiCoordinates = [],
            jsonData;
        xhr.open("GET", `${jsonUrl}`, false);
        xhr.send();
        jsonData = JSON.parse(xhr.responseText);
        for (let i = 0; i < jsonData.length; i++){
            if (Array.isArray(jsonData[i].data)){
                multiCoordinates = [];
                for (let j = 0; j < jsonData[i].data.length; j++){
                    multiCoordinates.push(jsonData[i].data[j].data);
                }
                coordinates.push({
                    data: multiCoordinates
                });

            } else {
                multiCoordinates.push(jsonData[i].data);

            }
        }
        coordinates.push({
            data: multiCoordinates
        });
        multiCoordinates = [];
        return coordinates;
    }

    initChartContainer();
    /*initChartContainer функция построения графика*/
    function initChartContainer() {
        for (let i = 0; i < chartArray.length; i++){
            initChart(chartArray[i].idChart, chartArray[i].coordinatesChart, chartArray[i].typeChart)
        }
    }
    /*initChart функция инициализации графика*/
    function initChart(id ,coordinateData, chartType) {
        let ctx = document.getElementById(`${id}`).getContext('2d');
        /*передаем глобальные параметры градиента графиков*/
        let gradientFillRed = 'rgba(274, 56, 89, .5)',
            gradientFillBlue = 'rgba(0, 204, 204, .5)',
            gradientFillYellow = 'rgba(243, 156, 18, .5)',
            gradientFillGreen = 'rgba(99, 176, 62, .5)',
            gradientFillOrange = 'rgba(231, 76, 60, .5)';

        let chartColorRed = 'rgba(274, 56, 89, 1)',
            chartColorBlue = 'rgba(0, 204, 204, 1)',
            chartColorYellow = 'rgba(243, 156, 18, 1)',
            chartColorGreen = 'rgba(99, 176, 62, 1)',
            chartColorOrange = 'rgba(231, 76, 60, 1)';
        let gradientFill = [
                gradientFillRed,
                gradientFillBlue,
                gradientFillYellow,
                gradientFillGreen,
                gradientFillOrange,
            ],
            chartColor = [
                chartColorRed,
                chartColorBlue,
                chartColorYellow,
                chartColorGreen,
                chartColorOrange,
            ];


        window.addEventListener('resize', function () {
            if (window.innerWidth > 1024){
                Chart.defaults.font.size = 12;
                Chart.defaults.font.lineHeight = '24px';
                Chart.defaults.scale.ticks.padding = 16;
                Chart.defaults.elements.point.radius = 3.5;
            } else {
                Chart.defaults.font.size = 10;
                Chart.defaults.font.lineHeight = '14px';
                Chart.defaults.scale.ticks.padding = 8;
                Chart.defaults.elements.point.radius = 1.5;

            }
        });
        if (window.innerWidth > 1024){
            Chart.defaults.font.size = 12;
            Chart.defaults.font.lineHeight = '24px';
            Chart.defaults.scale.ticks.padding = 16;
            Chart.defaults.elements.point.radius = 3.5;
        } else {
            Chart.defaults.font.size = 10;
            Chart.defaults.font.lineHeight = '14px';
            Chart.defaults.scale.ticks.padding = 8;
            Chart.defaults.elements.point.radius = 1.5;

        }
        Chart.defaults.font.family = "'Nunito', sans-serif";
        Chart.defaults.font.weight = 400;
        Chart.defaults.color = '#1B1B2F';
        Chart.defaults.scale.grid.color = 'rgba(31, 64, 104, .05)';
        Chart.defaults.scale.grid.borderColor = 'rgba(31, 64, 104, .05)';
        Chart.defaults.scale.grid.tickColor = 'rgba(31, 64, 104, .1)';
        Chart.defaults.elements.point.backgroundColor = '#1F4068';
        Chart.defaults.plugins.legend = false;


        if (chartType == 'line'){
            let gradientFillRed = ctx.createLinearGradient(0, 0, 0, 500),
                gradientFillBlue = ctx.createLinearGradient(0, 0, 0, 500),
                gradientFillYellow = ctx.createLinearGradient(0, 0, 0, 400),
                gradientFillGreen = ctx.createLinearGradient(0, 0, 0, 500),
                gradientFillOrange = ctx.createLinearGradient(0, 0, 0, 500),
                chartColorRed = 'rgba(274, 56, 89, 1)',
                chartColorBlue = 'rgba(0, 204, 204, 1)',
                chartColorYellow = 'rgba(243, 156, 18, 1)',
                chartColorGreen = 'rgba(99, 176, 62, 1)',
                chartColorOrange = 'rgba(231, 76, 60, 1)';


            gradientFillRed.addColorStop(0, 'rgba(274, 56, 89, 0.3)');
            gradientFillRed.addColorStop(1, 'rgba(274, 56, 89, 0)');

            gradientFillBlue.addColorStop(0, 'rgba(0, 204, 204, 0.3)');
            gradientFillBlue.addColorStop(1, 'rgba(0, 204, 204, 0)');

            gradientFillYellow.addColorStop(0, 'rgba(243, 156, 18, 0.3)');
            gradientFillYellow.addColorStop(1, 'rgba(243, 156, 18, 0)');

            gradientFillGreen.addColorStop(0, 'rgba(99, 176, 62, 0.3)');
            gradientFillGreen.addColorStop(1, 'rgba(99, 176, 62, 0)');

            gradientFillOrange.addColorStop(0, 'rgba(231, 76, 60, 0.3)');
            gradientFillOrange.addColorStop(1, 'rgba(231, 76, 60, 0)');

            let gradientFill = [
                    gradientFillRed,
                    gradientFillBlue,
                    gradientFillYellow,
                    gradientFillGreen,
                    gradientFillOrange,
                ],
                chartColor = [
                    chartColorRed,
                    chartColorBlue,
                    chartColorYellow,
                    chartColorGreen,
                    chartColorOrange,
                ],

                label = jsonChartLabels(coordinateData),
                dataCoordinate = jsonChartData(coordinateData),
                cfg = {
                    type: `line`,
                    data: {
                        labels : label,
                        datasets: dataCoordinate,
                    },
                };

            Chart.defaults.elements.line.backgroundColor = gradientFill;
            Chart.defaults.elements.line.borderColor = chartColor;
            Chart.defaults.elements.line.tension = 0;
            Chart.defaults.elements.line.borderWidth = 1;
            Chart.defaults.elements.line.fill = true;
            Chart.defaults.elements.line.tension = 0.4;
            myChart = new Chart(ctx, cfg);
            return myChart;
        } else if (chartType == 'bar'){
            let label = jsonChartLabels(coordinateData),
                dataCoordinate = jsonChartData(coordinateData),
                cfg = {
                    type: 'bar',
                    data: {
                        labels : label,
                        datasets: dataCoordinate,
                    },
                };
            Chart.defaults.elements.bar.backgroundColor = gradientFill;
            Chart.defaults.elements.bar.borderColor = chartColor;
            Chart.defaults.elements.bar.tension = 0;
            Chart.defaults.elements.bar.borderWidth = 1;
            Chart.defaults.elements.bar.fill = true;
            Chart.defaults.elements.bar.tension = 0.4;
            myChart = new Chart(ctx, cfg);
            return myChart;
        } else if (chartType == 'polarArea'){
            let label = jsonChartLabels(coordinateData),
                dataCoordinate = jsonChartData(coordinateData),
                cfg = {
                    type: 'polarArea',

                    data: {
                        labels : label,
                        datasets: dataCoordinate,
                    },

                };
            Chart.defaults.elements.arc.backgroundColor = gradientFill;
            Chart.defaults.elements.arc.borderColor = chartColor;
            Chart.defaults.elements.arc.tension = 0;
            Chart.defaults.elements.arc.borderWidth = 1;
            Chart.defaults.elements.arc.fill = true;
            Chart.defaults.elements.arc.tension = 0.4;
            myChart = new Chart(ctx, cfg);
            return myChart;
        } else if (chartType == 'doughnut'){
            let label = jsonChartLabels(coordinateData),
                dataCoordinate = jsonChartData(coordinateData),
                cfg = {
                    type: 'doughnut',

                    data: {
                        labels : label,
                        datasets: dataCoordinate,
                    },

                };
            Chart.defaults.elements.arc.backgroundColor = gradientFill;
            Chart.defaults.elements.arc.borderColor = chartColor;
            Chart.defaults.elements.arc.tension = 0;
            Chart.defaults.elements.arc.borderWidth = 1;
            Chart.defaults.elements.arc.fill = true;
            Chart.defaults.elements.arc.tension = 0.4;
            myChart = new Chart(ctx, cfg);
            return myChart;
        } else if (chartType == 'pie'){
            let gradientFillRed = 'rgba(274, 56, 89, .5)',
                gradientFillBlue = 'rgba(0, 204, 204, .5)',
                gradientFillYellow = 'rgba(243, 156, 18, .5)',
                gradientFillGreen = 'rgba(99, 176, 62, .5)',
                gradientFillOrange = 'rgba(231, 76, 60, .5)',

                chartColorRed = 'rgba(274, 56, 89, 1)',
                chartColorBlue = 'rgba(0, 204, 204, 1)',
                chartColorYellow = 'rgba(243, 156, 18, 1)',
                chartColorGreen = 'rgba(99, 176, 62, 1)',
                chartColorOrange = 'rgba(231, 76, 60, 1)',
                gradientFill = [
                    gradientFillRed,
                    gradientFillBlue,
                    gradientFillYellow,
                    gradientFillGreen,
                    gradientFillOrange,
                ],
                chartColor = [
                    chartColorRed,
                    chartColorBlue,
                    chartColorYellow,
                    chartColorGreen,
                    chartColorOrange,
                ],
                label = jsonChartLabels(coordinateData),
                dataCoordinate = jsonChartData(coordinateData),
                cfg = {
                    type: 'pie',

                    data: {
                        labels : label,
                        datasets: dataCoordinate,
                    },

                };
            Chart.defaults.elements.arc.backgroundColor = gradientFill;
            Chart.defaults.elements.arc.borderColor = chartColor;
            Chart.defaults.elements.arc.tension = 0;
            Chart.defaults.elements.arc.borderWidth = 1;
            Chart.defaults.elements.arc.fill = true;
            Chart.defaults.elements.arc.tension = 0.4;
            myChart = new Chart(ctx, cfg);
            return myChart;
        } else if (chartType == 'radar'){
            let label = jsonChartLabels(coordinateData),
                dataCoordinate = jsonChartData(coordinateData),
                cfg = {
                    type: 'radar',
                    data: {
                        labels : label,
                        datasets: dataCoordinate,
                    },
                };
            Chart.defaults.elements.line.backgroundColor = gradientFill;
            Chart.defaults.elements.line.borderColor = chartColor;
            Chart.defaults.elements.line.tension = 0;
            Chart.defaults.elements.line.borderWidth = 1;
            Chart.defaults.elements.line.fill = true;
            Chart.defaults.elements.line.tension = 0;
            myChart = new Chart(ctx, cfg);
            return myChart;
        }

    }
}
document.addEventListener("DOMContentLoaded", function () {
    chartContainer();
});
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
const docSlider = (function () {

    let undefined;
    let sc, pcr;
    let d = {};

    const op = {
        speed        : 600,
        easing       : 'ease',
        pager        : true,
        horizontal   : false,
        startSpeed   : null,
        scrollReset  : false,
        complete     : function () {},
        beforeChange : function () {},
        afterChange  : function () {},
        setInitCss : function(index, horizontal){

            const point = horizontal ? 'left' : 'top';
            const style = {};

            style[point] = index * 100 + '%';

            return style;

        },
        setChangeCss   : function (index, currentIndex, speed, easing, horizontal) {

            const xy = horizontal ? 'X' : 'Y';
            const style = {};

            style.transitionProperty = 'transform';
            style.transitionDuration = speed + 'ms';
            style.transitionTimingFunction = easing;
            style.transform = 'translate' + xy + '(-' + currentIndex * 100 + '%)';

            return style;

        }
    };

    const f = {

        setOptions : function (options) {

            if(options === undefined)
                return;

            const keys = Object.keys(options);

            for(let i = 0; i < keys.length; i++){

                const key = keys[i];

                op[key] = options[key];

            }

            if(!op.pager)
                u.updatePager = function () {};

        },

        createInner : function(){

            const wrapper = document.querySelector('.docSlider');
            const inner   = document.createElement('div');
            const pages   = document.querySelectorAll('.docSlider > *:not(.docSlider-pager)');

            inner.classList.add('docSlider-inner');

            for(let i = 0; i < pages.length; i++){

                const page = pages[i];
                const prop = op.setInitCss(i,op.horizontal);

                for(let p = 0; p < Object.keys(prop).length; p++){

                    const key = Object.keys(prop)[p];

                    page.style[key] = prop[key];

                }

                page.classList.add('docSlider-page');
                page.classList.add('docSlider-scroll');
                page.setAttribute('data-ds-index',i.toString());
                page.setAttribute('tabindex','0');

                inner.appendChild(page);

            }

            wrapper.appendChild(inner);

        },

        createPager : function () {

            if(!op.pager)
                return;

            const pageLength = document.querySelectorAll('.docSlider-inner > *').length;

            if(document.querySelector('.docSlider-pager')){

                const buttons = document.querySelectorAll('.docSlider-button');

                for(let i = 0; i < buttons.length; i++){

                    let button = buttons[i];

                    button.setAttribute('data-ds-jump',i.toString());
                    button.setAttribute('tabindex','-1');

                }

            }else{
                const pager      = document.createElement('nav');

                pager.classList.add('docSlider-pager');

                for(let i = 0; i < pageLength; i++){

                    let button = document.createElement('button');

                    button.classList.add('docSlider-button');
                    button.setAttribute('data-ds-jump',i.toString());
                    button.setAttribute('tabindex','-1');

                    pager.appendChild(button);

                }

                document.querySelector('.docSlider').appendChild(pager);

            }

        },

        setData : function () {

            d.html    = document.documentElement;
            d.wrapper = document.querySelector('.docSlider');
            d.pages   = document.querySelectorAll('.docSlider-inner > *');
            d.pager   = document.querySelector('.docSlider-pager');
            d.buttons = document.querySelectorAll('.docSlider-pager .docSlider-button');
            d.length  = d.pages.length;
            d.now     = 0;
            d.past    = 0;
            d.xy      = op.horizontal ? 'X' : 'Y';
            d.yx      = !op.horizontal ? 'X' : 'Y';
            d.wheel   = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
            d.wheelTick   = true;
            d.wheelEnable = true;
            d.fromPoint   = 'elementsFromPoint' in document ? 'elementsFromPoint' : 'msElementsFromPoint';
            d.isTouch     = 'ontouchstart' in window;
            d.isMobile    = /iPhone|Android.+Mobile/.test(navigator.userAgent);
            d.resizeTimer = 0;
            d.speed       = null;
            d.easing      = null;
            d.enable      = true;
            d.type        = null;
            d.pastType    = null;
            d.active      = null;

            u.updatePager();
            u.updateClass();

            d.active = d.pages[d.now];
            d.pages[d.now].focus({preventScroll :false});

        },

        setEvent : function () {

            for(let i = 0; i < d.length; i++){

                const page   = d.pages[i];
                const button = d.buttons[i];

                page.addEventListener('focusin',u.focusin);

                if(button === undefined)
                    continue;

                button.addEventListener('click',u.pagerClick);

            }

            document.addEventListener('keyup',u.keyup);
            document.addEventListener(d.wheel,u.wheel);
            d.pages[0].addEventListener('transitionstart',u.transitionstart);
            d.pages[0].addEventListener('transitionend',u.transitionend);

            if(d.isTouch){

                d.touch = {
                    move  : false,
                    nextX : 'right',
                    prevX : 'left',
                    nextY : 'bottom',
                    prevY : 'top',
                    X : {},
                    Y : {}
                }

                d.wrapper.addEventListener('touchstart',u.touchstart,false);
                d.wrapper.addEventListener('touchmove',u.touchmove,false);
                d.wrapper.addEventListener('touchend',u.touchend,false);

            }

            if(d.isMobile){

                u.setFV();
                window.addEventListener('resize',u.resize);

            }

        },

        hashJump : function () {

            const to = u.hashToIndex(location.hash);

            if(to === d.now)
                return false;

            d.speed = op.startSpeed === null ? op.speed : op.startSpeed;
            d.type = 'anchor';

            if(d.speed){

                setTimeout(function () {

                    u.pageChange(to);

                },200)

            }else{

                u.pageChange(to);

            }

            return true;

        }

    };

    const u = {

        hashToIndex : function (hash) {

            return (function () {

                if(hash.length){

                    let page = document.querySelector(hash);

                    if(!page || !page.hasAttribute('data-ds-index'))
                        return 0;

                    return Number(page.getAttribute('data-ds-index'));

                }else{

                    return 0;

                }

            })();

        },

        indexCheck : function(num){

            return (num >= 0 && num < d.length) ? num : d.now;

        },

        pageChange : function(to){

            if(d.type !== 'focus')
                d.pages[to].focus();

            d.active = d.pages[to];

            if(to === d.now)
                return;

            d.type = d.type ? d.type : 'focus';
            d.past = d.now;
            d.now  = to;

            let speed  = d.speed  === null ? op.speed  : d.speed;

            const easing = d.easing === null ? op.easing : d.easing;

            for(let i = 0; i < d.length; i++){

                const page = d.pages[i];
                const prop = op.setChangeCss(i, d.now, speed, easing, op.horizontal);

                for(let p = 0; p < Object.keys(prop).length; p++){

                    const key = Object.keys(prop)[p];

                    page.style[key] = prop[key];

                }

            }

            if(!speed){

                if(op.scrollReset)
                    u.scrollReset(d.pages[d.now]);

                if(pcr)
                    u.animationReset(d.past);

                op.beforeChange(d.past, d.pages[d.past], d.now, d.pages[d.now], d.type);
                d.pastType = d.type;
                d.type = null;

                if(sc)
                    scrollCue._updateWithDocSlider();

                op.afterChange(d.now, d.pages[d.now], d.past, d.pages[d.past], d.pastType);
                d.pastType = null;

            }

            d.speed  = null;
            d.easing = null;

            u.updatePager();
            u.updateClass();

        },

        focusin : function(){

            const to = Number(this.getAttribute('data-ds-index'));

            d.type = d.type ? d.type : 'focus';

            u.pageChange(to);

        },

        focusinx : function(){

            const to = Number(this.getAttribute('data-ds-index'));

            d.active = d.pages[to];

            if(to === d.now)
                return;

            d.type = d.type ? d.type : 'focus';
            d.past = d.now;
            d.now  = to;

            let speed  = d.speed  === null ? op.speed  : d.speed;

            const easing = d.easing === null ? op.easing : d.easing;

            for(let i = 0; i < d.length; i++){

                const page = d.pages[i];
                const prop = op.setChangeCss(i, d.now, speed, easing, op.horizontal);

                for(let p = 0; p < Object.keys(prop).length; p++){

                    const key = Object.keys(prop)[p];

                    page.style[key] = prop[key];

                }

            }

            if(!speed){

                if(op.scrollReset)
                    u.scrollReset(d.pages[d.now]);

                if(pcr)
                    u.animationReset(d.past);

                op.beforeChange(d.past, d.pages[d.past], d.now, d.pages[d.now], d.type);
                d.pastType = d.type;
                d.type = null;

                if(sc)
                    scrollCue._updateWithDocSlider();

                op.afterChange(d.now, d.pages[d.now], d.past, d.pages[d.past], d.pastType);
                d.pastType = null;

            }

            d.speed  = null;
            d.easing = null;

            u.updatePager();
            u.updateClass();

        },

        pagerClick : function(){

            if(!d.enable)
                return;

            const to = Number(this.getAttribute('data-ds-jump'));

            d.type = 'pager';
            u.pageChange(to);

        },

        updatePager : function () {

            for(let i = 0; i < d.length; i++ ){

                const button = d.buttons[i];

                if(button === undefined)
                    continue;

                button.classList.remove('selected');

            }

            if(d.buttons[d.now] === undefined)
                return ;

            d.buttons[d.now].classList.add('selected');

        },

        updateClass : function(){

            const past      = d.pages[d.past];
            const pastIndex = past.getAttribute('data-ds-index');
            const pastPage  = Number(pastIndex) +1;
            const pastId    = past.hasAttribute('id') ? past.getAttribute('id') : false;

            const now = d.pages[d.now];
            const nowIndex = now.getAttribute('data-ds-index');
            const nowPage  = Number(nowIndex) +1;
            const nowId    = now.hasAttribute('id') ? now.getAttribute('id') : false;

            d.html.classList.remove('docSlider-index_' + pastIndex);
            d.html.classList.remove('docSlider-page_'  + pastPage);
            d.html.classList.remove('docSlider-id_'    + pastId);

            d.html.classList.add('docSlider-index_' + nowIndex);
            d.html.classList.add('docSlider-page_'  + nowPage);
            if(nowId) d.html.classList.add('docSlider-id_'    + nowId);

            d.pages[d.past].classList.remove('docSlider-current');
            d.pages[d.now].classList.add('docSlider-current');

        },

        keyup : function(e){

            if(!d.enable)
                return;

            if(d.pages[d.now] !== document.activeElement)
                return;

            let to;
            const key   = e.key;
            const shift = e.shiftKey;
            const page  = d.pages[d.now];

            if((shift && / |Spacebar/.test(key) || !shift && /ArrowUp|Up|PageUp/.test(key)) && u.scrollEnd(page,'top')){

                to = d.now - 1;

            }else if(!shift && / |Spacebar|ArrowDown|Down|PageDown/.test(key) && u.scrollEnd(page,'bottom')) {

                to = d.now + 1;

            }else if(!shift && key === 'Home'){

                to = 0;

            }else if(!shift && key === 'End'){

                to = d.length - 1;

            }else if(!shift && op.horizontal && /ArrowLeft|Left/.test(key)){

                to = d.now - 1;

            }else if(!shift && op.horizontal && /ArrowRight|Right/.test(key)){

                to = d.now + 1;

            }else{

                return;

            }

            if(u.indexCheck(to) === d.now)
                return;

            d.type = 'key';
            u.pageChange(to);

        },

        scrollEnd : function (element,direction) {

            switch (direction) {
                case 'top'    : return element.scrollTop  <= 0;
                case 'bottom' : return element.scrollTop  >= element.scrollHeight - element.clientHeight;
                case 'left'   : return element.scrollLeft <= 0;
                case 'right'  : return element.scrollLeft >= element.scrollWidth - element.clientWidth;
                default       : return direction;
            }

        },

        wheel : function (e) {

            if(!d.wheelTick)
                return;

            requestAnimationFrame(function () {

                d.wheelTick = true;

                if(!d.enable)
                    return;

                if(!d.wheelEnable)
                    return;

                const delta    = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail);
                const elms     = document[d.fromPoint](e.pageX,e.pageY);
                const distance = delta > 0 ? 'top' : 'bottom';
                const to       = u.indexCheck(distance === 'top' ? d.now - 1 : d.now + 1);

                if(d.active !== d.pages[d.now])
                    return;

                if(to === d.now)
                    return;

                for(let i = 0; i < elms.length; i ++){

                    const elm = elms[i];

                    if(elm.classList.contains('docSlider-scroll') && !u.scrollEnd(elm,distance))
                        return

                }

                d.type = 'scroll';
                u.pageChange(to);

            });

            d.wheelTick = false;

        },

        transitionstart : function () {

            d.wheelEnable = false;

            if(op.scrollReset)
                u.scrollReset(d.pages[d.now]);

            if(pcr)
                u.animationReset(d.past);

            op.beforeChange(d.past, d.pages[d.past], d.now, d.pages[d.now], d.type);
            d.pastType = d.type;
            d.type = null;

        },

        transitionend : function () {

            d.wheelEnable = true;

            if(sc)
                scrollCue._updateWithDocSlider();

            op.afterChange(d.now, d.pages[d.now], d.past, d.pages[d.past], d.pastType);
            d.pastType = null;

        },

        resize : function(){

            if(d.resizeTimer > 0)
                clearTimeout(d.resizeTimer);

            d.resizeTimer = setTimeout(u.setFV,200);

        },

        setFV : function () {

            d.wrapper.style.height = window.innerHeight + '';
            d.wrapper.style.height = window.innerHeight + 'px';

        },

        touchstart : function (e) {

            if(!d.enable)
                return;

            if(e.touches.length > 1)
                return;

            d.touch.move = false;
            d.touch.X.start = e.touches[0].pageX;
            d.touch.Y.start = e.touches[0].pageY;

        },

        touchmove : function (e) {

            if(!d.enable)
                return;

            if(e.touches.length > 1){
                e.preventDefault();
                return;
            }

            d.touch.move = true;
            d.touch.X.move = e.changedTouches[0].pageX;
            d.touch.Y.move = e.changedTouches[0].pageY;

        },

        touchend : function (e) {

            if(!d.enable)
                return;


            if(e.touches.length > 1)
                return;

            if(!d.touch.move)
                return;

            d.touch.X.distance = d.touch.X.move - d.touch.X.start;
            d.touch.Y.distance = d.touch.Y.move - d.touch.Y.start;

            if(Math.abs(d.touch[d.xy].distance) < Math.abs(d.touch[d.yx].distance))
                return;

            const np = d.touch[d.xy].distance < 0 ? 'next' : 'prev';
            const to = u.indexCheck(np === 'next' ? d.now + 1 : d.now - 1);

            if(to === d.now)
                return;

            if((d.now === 0 && np === 'prev') || (d.now === d.length-1 && np === 'next'))
                return;

            const direction = d.touch[np + d.xy];
            const elms      = document[d.fromPoint](d.touch.X.start,d.touch.Y.start);

            for(let i = 0; i < elms.length; i++){

                const elm = elms[i];

                if(elm.classList.contains('docSlider-scroll') && !u.scrollEnd(elm,direction))
                    return;

            }

            d.type = 'scroll';
            u.pageChange(to);

        },

        scrollReset : function (page){

            page.scrollTop = 0;
            page.scrollLeft = 0;

        },

        animationReset : function (index){

            let selector = '[data-scpage][data-show="true"]'
            let elms = document.querySelectorAll(selector);

            if(!elms.length)
                return false;

            for(let i=0; i < elms.length; i++){

                let elm = elms[i];
                let classes = elm.getAttribute('data-addClass');

                if(elm.getAttribute('data-scpage') === index+'')
                    continue;

                elm.removeAttribute('style');
                elm.removeAttribute('data-show');

                if(!classes)
                    continue;

                classes = classes.split(' ');

                for(let j=0; j<classes.length; j++){

                    let className = classes[j];

                    elm.classList.remove(className);

                }

            }

            scrollCue._searchElements();

        },

    };

    return {

        init : function (options) {

            let startHash;

            f.setOptions(options);
            f.createInner();
            f.createPager();
            f.setData();
            f.setEvent();
            startHash = f.hashJump();

            sc = typeof scrollCue === 'undefined' ? false : scrollCue._hasDocSlider();
            pcr = typeof scrollCue === 'undefined' ? false : scrollCue._hasPageChangeReset();

            if(sc){

                scrollCue._initWithDocSlider(startHash);

            }

            op.complete(op, docSlider.getElements());

        },

        jumpPage : function (to, speed, easing) {

            let index;

            if(to === undefined)
                return;

            if(isNaN(to)){

                index = u.hashToIndex('#'+to.replace('#',''));

            }else{

                index = u.indexCheck(to < 0 ? d.length + to : to);

            }

            d.speed  = speed  === undefined ? null : speed;
            d.easing = easing === undefined ? null : easing;
            d.type   = 'jumpPage';

            u.pageChange(index);

        },

        nextPage : function (speed, easing) {

            const index = u.indexCheck(d.now +1);

            d.speed  = speed  === undefined ? null : speed;
            d.easing = easing === undefined ? null : easing;
            d.type   = 'nextPage';

            u.pageChange(index);

        },

        prevPage : function (speed, easing) {

            const index = u.indexCheck(d.now -1);

            d.speed  = speed  === undefined ? null : speed;
            d.easing = easing === undefined ? null : easing;
            d.type   = 'prevPage';

            u.pageChange(index);

        },

        getOptions : function () {

            return op;

        },

        getElements : function () {

            return {
                wrapper : d.wrapper,
                pages   : d.pages,
                pager   : d.pager,
                buttons : d.buttons,
            };

        },

        getCurrentIndex : function () {

            return d.now;

        },

        getCurrentPage : function () {

            return d.pages[d.now];

        },

        enable : function (toggle) {

            d.enable = toggle === undefined ? !d.enable : toggle;

            const tabindex = d.enable ? '0' : '-1';

            for(let i = 0; i < d.length; i++){

                d.pages[i].setAttribute('tabindex',tabindex);

            }

        },
        _getWheelEnable : function (){

            return d.wheelEnable;

        }

    }


})();
attachInputObj = {};
/*form validation start*/
function initFormsValidate() {
    let formContent = document.querySelectorAll('.form');
    if (formContent.length){
        for (let i = 0; i < formContent.length; i++){
            formValidate(formContent[i]);
        }
    }
}
function formValidate(element) {
    let formId = element.id,
        inputs = element.querySelectorAll('.form-input'),
        inputGroup = element.querySelectorAll('.form-group'),
        attachInput = element.querySelectorAll('.attach__input');
    if (element.getAttribute('id') == formId){
        const validate = new window.JustValidate(`#${formId}`,
            {
                errorFieldCssClass: 'error',
                errorLabelCssClass: 'error-label',
                successFieldCssClass: 'success',
                successLabelCssClass: 'success-label',
            },
            [
                {
                    key: 'Name is too short',
                    dict: {
                        ru: 'Имя слишком короткое',
                        en: 'Name is too short',
                    },
                },
                {
                    key: 'Field is required',
                    dict: {
                        ru: 'Обязательное поле',
                        en: 'Field is required',
                    },
                },
                {
                    key: 'Field is required. Please enter your phone',
                    dict: {
                        ru: 'Поле, обязательное для заполнения. Пожалуйста, введите свой телефон',
                        en: 'Field is required. Please enter your phone',
                    },
                },
                {
                    key: 'Field is required. Please enter your password',
                    dict: {
                        ru: 'Поле, обязательное для заполнения. Пожалуйста введите ваш пароль',
                        en: 'Field is required. Please enter your password',
                    },
                },
                {
                    key: 'Field is required. Please enter your email',
                    dict: {
                        ru: 'Поле, обязательное для заполнения. Пожалуйста, введите адрес электронной почты',
                        en: 'Field is required. Please enter your email',
                    },
                },
                {
                    key: 'Input field entered incorrectly',
                    dict: {
                        ru: 'Не верно введено поле ввода',
                        en: 'Input field entered incorrectly',
                    },
                },
                {
                    key: 'You should select at least one communication channel',
                    dict: {
                        ru: 'Вы должны выбрать хотя бы один канал связи',
                        en: 'You should select at least one communication channel',
                    },
                },
                {
                    key: 'This field is required. Specify a date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите дату',
                        en: 'This field is required. Specify a date',
                    },
                },
                {
                    key: 'This field is required. Specify end date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите конечную дату',
                        en: 'This field is required. Specify end date',
                    },
                },
                {
                    key: 'This field is required. Specify start date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите начальную дату',
                        en: 'This field is required. Specify start date',
                    },
                },
                {
                    key: 'This field is required. Specify a start and end date',
                    dict: {
                        ru: 'Данное поле обязательное. Укажите начальную и конечную дату ',
                        en: 'This field is required. Specify a start and end date',
                    },
                },
                {
                    key: 'Uploaded files have one or several invalid properties (extension/size/type etc)',
                    dict: {
                        ru: 'Загруженные файлы имеют одно или несколько недопустимых свойств (расширение/размер/тип и т. д.)',
                        en: 'Uploaded files have one or several invalid properties (extension/size/type etc)',
                    },
                },
            ]
        );

        validate.setCurrentLocale('ru');// передаем параметр языка для валидации формы
        //input field initialization on error and required fields
        for (let j = 0; j < inputs.length; j++){
            let id = inputs[j].id,
                inputType =  inputs[j].getAttribute('type');
            if (inputs[j].getAttribute('id') == id){
                if (inputs[j].disabled == false){
                    if(inputType == 'text'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required',
                            },
                        ])
                    } else if(inputType == 'tel'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required. Please enter your phone',
                            },
                        ])
                    } else if(inputType == 'password'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required. Please enter your password',
                            },
                        ])
                    } else if(inputType == 'email'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required. Please enter your email',
                            },{
                                rule: "email",
                                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
                                errorMessage: 'Input field entered incorrectly',
                            }
                        ])
                    } else if(inputType == 'checkbox' || inputType == 'radio'){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'Field is required',
                            },
                        ])
                    }
                }

            }
            if (inputs[j].disabled == false){
                if(inputs[j].tagName === 'SELECT'){
                    validate.addField(`#${id}`, [
                        {
                            rule: 'required',
                            errorMessage: 'Field is required',
                        },
                    ])
                }
                if (inputs[j].classList.contains('datepicker-input')){
                    if(inputs[j].classList.contains('datepicker-input__max')){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'This field is required. Specify end date',
                            },
                        ])
                    } else if(inputs[j].classList.contains('datepicker-input__min')){
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'This field is required. Specify start date',
                            },
                        ])
                    } else {
                        validate.addField(`#${id}`, [
                            {
                                rule: 'required',
                                errorMessage: 'This field is required. Specify a date',
                            },
                        ])
                    }
                }
                if (inputs[j].classList.contains('datepicker-input__range')){
                    validate.addField(`#${id}`, [
                        {
                            rule: 'required',
                            errorMessage: 'This field is required. Specify a start and end date',
                        },
                    ])
                }
            }
        }
        if (attachInput.length){
            for (let y = 0; y < attachInput.length; y++){
                let id = attachInput[y].id;
                if (attachInput[y].getAttribute('id') == id){
                    validate.addField(`#${id}`, [
                        {
                            rule: 'files',
                            value: {
                                files: {
                                    extensions: ['jpeg', 'png', 'jpg'],
                                    maxSize: 2500000,
                                    minSize: 1000,
                                    types: ['image/jpeg', 'image/png', 'image/jpg'],
                                },
                            },
                            errorMessage: 'Uploaded files have one or several invalid properties (extension/size/type etc)',
                        },{
                            rule: 'required',
                            errorMessage: 'This field is required. Specify a start and end date',
                        },

                    ]);
                }
            }
        }
        //groups form initialization
        for(let k = 0; k < inputGroup.length; k++){
            let id = inputGroup[k].id;
            validate.addRequiredGroup(
                `#${id}`,
                'You should select at least one communication channel',

            );
        }
        //method call on success
        validate.onSuccess((ev) => {
            ev.preventDefault();
            successModal('success-popup');
            errorModal('error-popup');
            clearForm(validate.form);
        });
        console.log(validate)
    }
}

function successModal(popUpId){
    showPopUp(popUpId);
    setTimeout(closePopup, 3000);
}
function errorModal(popUpId){
    showPopUp(popUpId);
    setTimeout(closePopup, 3000);
}
//form cleanup function
function clearForm(form) {
    form.reset();
    let input = form.querySelectorAll('input');
    for (let i = 0; i < input.length; i++){
        if (input[i].type == 'text' || input[i].type == 'tel' || input[i].type == 'password' || input[i].type == 'email'){
            if (input[i].value != ''){
                input[i].value = "";
            }
        } else if (input[i].type == 'file'){
            if (input[i].value != ''){
                input[i].value = "";
            }
        }

        if (input[i].classList.contains('datepicker-input')){
            datepickerUpdate(input[i].id);
        } else if (input[i].classList.contains('datepicker-input__range')){
            datepickerRangeUpdate(input[i].id)
        }
    }
}

// Добавление Файлов
function initInputFile(){
    let attachInput = document.querySelectorAll('.attach__input');
    for (let i = 0; i < attachInput.length; i++){
        attachInput[i].addEventListener('change', function (e) {

            readURL(this);
            console.log(this.files[0]);
            console.log(this.files);
        })
    }
}

function resetReadURL(input) {

}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            input.closest(".attach").classList.add("attach_active");
            input.closest(".attach").querySelector('.attach__preview').setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}




function inputPlaceholder() {
    let inputs = document.querySelectorAll('input'),
        textareas = document.querySelectorAll('textarea');
    for (let i = 0; i <inputs.length; i++) {
        let input = inputs[i];
        if (input.type == 'text' || input.type == 'tel' || input.type == 'password' || input.type == 'email'){
            initInput(input)
        }
        if (input.type == 'text' || input.type == 'tel' || input.type == 'password' || input.type == 'email'){
            input.addEventListener('change', function () {
                initInput(input);
            })
        }
    }

    for (let j = 0; j <textareas.length; j++) {
        let textarea = textareas[j];
        textarea.addEventListener('change', function () {
            initInput(textarea);
        })
    }
}

//todo: initInput выполняем функцию эффекта placeholder согласно макету
function initInput(elem) {
    let elementValue = elem.value,//полусаем value данного поля
        label = elem.closest('.label-wrap');
    //делаем проверку. Если поле не пустое. То добавляем класс. В противном случае убираем класс
    if (label){
        if (elementValue !== ''){
            if (!label.classList.contains('selected')){
                label.classList.add('selected');
            }
        } else {
            if (label.classList.contains('selected')){
                label.classList.remove('selected');
            }
        }
    }

}

/*form validation end*/

//inputMask start
//phone mask initialization.
function inputMaskPhoneInit() {
    let inputMaskElement = document.querySelectorAll('.phone_mask');
    if (inputMaskElement.length){
        for (let i = 0; i < inputMaskElement.length; i++){
            if (inputMaskElement[i].type == 'text' || inputMaskElement[i].type == 'tel'){
                inputMaskPhone(inputMaskElement[i]);
            }
        }
    }
}
function inputMaskPhone(element) {
    let maskOptions = {
            mask: '+{38}(000)000-00-00'
        },
        mask = IMask(element, maskOptions);
}
//inputMask end
document.addEventListener("DOMContentLoaded", function () {
    initFormsValidate();
    inputMaskPhoneInit();
    inputPlaceholder();
    initInputFile();
});
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

/*todo: googleMaps функция инициализации google карт*/
function googleMaps(){
    let mapObj = [],
        mapPlace = [],// переменная массива объектов. В этот массиве записываем данные объектов для карты блока с фильтром
        searchForm = [],
        markerclusterer = [],
        markers = [];
    /*google maps*/


    getMapPlace();
    /*
        Собираем на странице сайта секции с картами по имени класса "map-place__container". У данного контэйнера обязательно должен присутствовать имя id.
        В каждой секции ищем два блока с именами классов "map-place__map" и "map-place__filter".
        Блок с именем класса "map-place__map" являеться ранее инициализирована google карта. У данного контэйнера обязательно должен присутствовать имя id
        Блок с именем класса "map-place__filter" выводится список типов маркеров которые должны выводиться на инициализированной карте. У данного контэйнера обязательно должен присутствовать имя id
        Данные этих блоков мы передаем в с свойства объекта "mapPlace"
     */
    function getMapPlace() {
        let getContent = document.querySelectorAll('.map-place__container');
        if (getContent.length){
            getContent.forEach((elem, id)=>{
                let getItemId = elem.id,
                    getItemMap = elem.querySelector('.map-place__map'),
                    getItemList = elem.querySelector('.map-place__filter');
                if ( getItemId != "" && getItemMap.id !='' && getItemList.id !=''){
                    mapPlace.push({
                        idContainer: getItemId,
                        idMap: getItemMap.id,
                        filterList: getItemList,
                    });
                }
            });
        }
    }


    getMapSearchContent();
    /*
        На странице сайта собираем компонент блока карты с полем поиска. Ищем компонент карты с полем поиска по имени класса map-search__container. У данного компонента обязательно должен присутствовать имя id.
        В каждой компоненте ищем два блока с именами классов "map-search__map" и "map-search__input".
        Блок с именем класса "map-search__map" являеться ранее инициализирована google карта. У данного контэйнера обязательно должен присутствовать имя id
        Блок с именем класса "map-search__input" инициализирует поле ввода для поиска. У данного контэйнера обязательно должен присутствовать имя id
    */
    function getMapSearchContent() {
        let getContent = document.querySelectorAll('.map-search__container');
        if (getContent.length){
            getContent.forEach((elem, id)=>{
                let getItemId = elem.id,
                    getItemMap = elem.querySelector('.map-search__map'),
                    getItemSearch = elem.querySelector('.map-search__input');
                if (getItemId != "" && getItemMap.id != "" && getItemSearch.id !=""){
                    searchForm.push({
                        idContainer: getItemId,
                        idMap: getItemMap.id,
                        inputSearch: getItemSearch,
                    });
                }
            });
        }
    }

    getMapMarkerclusterer();
    /*
        На странице сайта собираем компонент блока карты с полем поиска. Ищем компонент карты с полем поиска по имени класса map-search__container. У данного компонента обязательно должен присутствовать имя id.
        В каждой компоненте ищем два блока с именами классов "map-search__map" и "map-search__input".
        Блок с именем класса "map-search__map" являеться ранее инициализирована google карта. У данного контэйнера обязательно должен присутствовать имя id
        Блок с именем класса "map-search__input" инициализирует поле ввода для поиска. У данного контэйнера обязательно должен присутствовать имя id
    */
    function getMapMarkerclusterer() {
        let getContent = document.querySelectorAll('.map-markerclusterer');
        if (getContent.length){
            getContent.forEach((elem, id)=>{
                let getItemId = elem.id;
                if (getItemId != ""){
                    markerclusterer.push({
                        idMap: getItemId,
                    });
                }
            });
        }
    }

    getMapContainer();
    /*
        Инициализируем google карту на странице.
        Данная функция "getMapContainer" ищет на странице сайта все блоки с именем класса "map-container".
        Для инициализации каждой карты на странице из данного блока функция должна получиить следующие парпметры:
        1)имя id данного блоко в которому будет инициализироваться наша google карта;
        2)Получаем координат расположения центрального маркера с помощью группы аттрибутов "data-map-lat" и  "data-map-lng". В аттрибуты "data-map-lat" и "data-map-lng" указываем координаты "lat" и "lng". Можно также использовать аттрибут "data-address". В аттрибуте "data-address" указываем название улица и города где должен отбразиться маркер например "Jersey City, New Jersey". Обаварианта аттрибутов рабочие
        После получения всех необходиммых данных, вызываем функцию инициализации google карты "initGoogleMaps"
    */
    function getMapContainer(){
        let mapContainer = document.querySelectorAll('.map-container');
        if (mapContainer.length){
            mapContainer.forEach((elem, id)=>{
                if (elem.id != ""){
                    if(typeof elem.dataset.mapLat != 'undefined' ||typeof elem.dataset.mapLng != 'undefined'){
                        initGoogleMaps(elem.id, {lat: Number(elem.dataset.mapLat), lng: Number(elem.dataset.mapLng),});
                    } else if (typeof elem.dataset.address != 'undefined'){
                        initGoogleMaps(elem.id, String(elem.dataset.address));
                    }
                }
            });
        }
    }

    /*
        Функция отображения карты.
        Функция initGoogleMaps получает параметры имени id блока где будет отрисовываться данная карта и в зависимости от результата проверки из функции "getMapContainer" получаем координаты положения центрального маркера в виде объекта или текста.
        По полученным параметрам строится google карта в соответствующие контейнере.
        В конце фунции передаем в глобальную переменную массива "mapObj" добавляем параметры:
        1)имя id блока отрисовываемой карты
        2)объект карты
        3)геокод расположения центрального маркерамаркера
    */
    function initGoogleMaps(mapContainer, addressData){
        let geocoder = new google.maps.Geocoder(),
            maping = mapContainer,
            dataAddress = addressData,
            image = new google.maps.MarkerImage('/images/content/marker.png'),
            newMap;

        newMap = new google.maps.event.addDomListener(window, 'load', initialize(maping));
        function initialize(id) {
            let mapStyles = [
                    {
                        "featureType": "all",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "weight": "2.00"
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#9c9c9c"
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#eeeeee"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#7b7b7b"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#46bcec"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#c8d7d4"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#070707"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    }
                ],
                mapOptions = {
                    panControl: false,
                    zoomControl: false,
                    disableDefaultUI: true,
                    scaleControl: false,
                    zoom: 17,
                    center: new google.maps.LatLng({ lat: 0, lng: 0 }),
                    styles: mapStyles
                },
                elemId = id,
                position,
                map;
            map = new google.maps.Map(document.getElementById(elemId), mapOptions);
            if (typeof dataAddress === "string"){
                geocoder.geocode({
                    'address': dataAddress,
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        position = results[0].geometry.location;
                        var marker = new google.maps.Marker({
                            map: map,
                            position: position,
                            icon: image,
                        });
                        mapObj.push({
                            id:elemId,
                            map: map,
                            center: position,
                        });
                        for (let i in mapPlace){
                            if (mapPlace[i].idMap == elemId){
                                initMapsPlace(elemId, map, position);
                            }
                        }
                        for (let i in searchForm){
                            if (searchForm[i].idMap == elemId){
                                MapsSearchForm(map, searchForm[i].inputSearch, marker)
                            }
                        }
                        for (let i in markerclusterer){
                            if (markerclusterer[i].idMap == elemId){
                                cluster(map);
                            }
                        }
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            } else if (typeof dataAddress === "object"){
                let newaddress = new google.maps.LatLng(dataAddress.lat, dataAddress.lng);
                position = newaddress;
                var marker2 = new google.maps.Marker({
                    map: map,
                    position: newaddress,
                    icon: image,
                });
                map.setCenter(newaddress);
                mapObj.push({
                    id:elemId,
                    map: map,
                    center: position,
                });
                for (let i in mapPlace){
                    if (mapPlace[i].idMap == elemId){
                        initMapsPlace(elemId, map, position);
                    }
                }
                for (let i in searchForm){
                    if (searchForm[i].idMap == elemId){
                        MapsSearchForm(map, searchForm[i].inputSearch, marker2)
                    }
                }
                for (let i in markerclusterer){
                    if (markerclusterer[i].idMap == elemId){
                        cluster(map);
                    }
                }
            }
        }

    }


    /*
    MapsSearchForm. функция инициализации карты с полем поиска.
    данная функция принимает следующие параметры:
    map - объект ранее иницииализованной карты,
    inputSearch - переданная поле ввода в которой будет инициализация функции поиска в карте,
    startMarker - стартовый маркер инициализации.
    */
    function MapsSearchForm(map, inputSearch, startMarker) {
        let input = document.getElementById(inputSearch.id),//находим поле ввода по имени-id
            searchBox = new google.maps.places.SearchBox(input), //инициализируем метод startMarker
            markers = [],
            marker;
        google.maps.event.addListener(searchBox, 'places_changed', function() {
            markers.push(startMarker);
            marker = markers[0];
            let places = searchBox.getPlaces(),
                bounds,
                image;
            //очищаем старый маркер.
            for (var i = 0, marker; marker = markers[i]; i++) {
                marker.setMap(null);
            }

            markers = [];
            bounds = new google.maps.LatLngBounds();
            for (let i = 0, place; place = places[i]; i++) {
                image = new google.maps.MarkerImage('/images/content/marker.png');
                marker = new google.maps.Marker({
                    map: map,
                    icon: image,
                    position: place.geometry.location
                });

                markers.push(marker);
                bounds.extend(place.geometry.location);
            }

            map.fitBounds(bounds);
            map.setZoom(17);
        });

        google.maps.event.addListener(map, 'bounds_changed', function() {
            var bounds = map.getBounds();
            searchBox.setBounds(bounds);
        });

    }

    function initMapsPlace(id, map, center) {
        let radiusSearch = 200,
            radius = new google.maps.Circle({
                strokeColor: "#34322F",
                strokeOpacity: 0.2,
                strokeWeight: 1,
                fillColor: "#34322F",
                fillOpacity: 0.3,
                map,
                center,
                radius: radiusSearch,
            }),
            mapFilter = document.getElementById(id).closest('.map-place__container').querySelector('.map-place__filter'),
            typePost;
        mapFilter.querySelectorAll('li').forEach(function (element) {
            if (element.classList.contains('active')){
                typePost = element.querySelector("a").dataset.markers;
                return typePost;
            }
        });
        nearbySearch(id, map, center, typePost, radiusSearch);
    }

    function nearbySearch(id, map, center, postType, radius) {
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(
            { location: center, radius: radius, type: postType},
            (results, status, pagination) => {
                if (status !== "OK" || !results) return;
                addPlaces(results, id, map);
            }
        );

        function addPlaces(places, id, map) {
            markers = [];
            for (const place of places) {
                if (place.geometry && place.geometry.location) {
                    const image = new google.maps.MarkerImage('/images/content/marker-sub.png');
                    markers.push(
                        new google.maps.Marker({
                            map,
                            icon: image,
                            position: place.geometry.location,
                        })
                    );
                }
            }
            for (let i in mapObj){
                if (mapObj[i].id == id){
                    mapObj[i]['markers'] = markers;
                }
            }
        }
    }

    reInitPlace();
    function reInitPlace() {
        let filterPlace = document.querySelectorAll('.map-place__filter');
        filterPlace.forEach(function (element) {
            if (element.id != ""){
                element.addEventListener('click', function (e) {
                    let newPostData,
                        getIdMapContainer;
                    e.preventDefault();
                    if(e.target.tagName.toLowerCase() === "a"){
                        this.querySelectorAll('li').forEach(function (element) {
                            if (element.classList.contains('active')){
                                element.classList.remove('active');
                            }
                        });
                        e.target.closest('li').classList.add('active');
                        newPostData = e.target.dataset.markers;
                        getIdMapContainer = this.closest('.map-place__container').querySelector('.map-container').id;
                        for (let i in mapObj){
                            if (mapObj[i].id == getIdMapContainer){
                                mapObj[i].markers.forEach((marker)=>{
                                    marker.setMap(null);
                                });
                                nearbySearch(mapObj[i].id, mapObj[i].map, mapObj[i].center, newPostData, 200);
                            }
                        }

                    }

                });
            }

        });
    }


    function cluster(maps) {
        let infoWindow = new google.maps.InfoWindow({
                content: "",
                disableAutoPan: true,
            }),
            map = maps;
        // Create an array of alphabetical characters used to label the markers.
        let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            locations = jsonDataGoogleMaps();
        let markers = locations.map((position, i) => {// Add some markers to the map.
            let label = labels[i % labels.length],
                marker = new google.maps.Marker({
                    position,
                    label,
                });

            // markers can only be keyboard focusable when they have click listeners
            // open info window when marker is clicked
            marker.addListener("click", () => {
                infoWindow.setContent(label);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        // Add a marker clusterer to manage the markers.
        let clusterer =  new markerClusterer.MarkerClusterer(
            {
                map,
                markers
            }
        );
    }

    function jsonDataGoogleMaps() {
        let xhr = new XMLHttpRequest(),
            locations = [],
            jsonData;
        xhr.open("GET", 'js/json/gooleLatLng.json', false);
        xhr.send();
        jsonData = JSON.parse(xhr.responseText);
        for (let i = 0; i < jsonData.length; i++){
            locations.push({
                lat: jsonData[i].lat,
                lng: jsonData[i].lng
            });
        }
        return locations;
    }
    /*google maps*/
}
document.addEventListener("DOMContentLoaded", function () {
    googleMaps();
});
// init popUp
function popupInit() {
    let body = document.querySelector('.wrapper'),
        popUpWrap = document.querySelectorAll('.popup-wrap'),
        popUp = document.querySelectorAll('.popup');
    let popUpBtn = document.querySelectorAll('.popup-init');
    for (let i = 0; i < popUpBtn.length; i++){
        popupInitBtn(popUpBtn[i], body, popUp);
    }
    // Close on Esc
    document.addEventListener('keyup', event => {
        if (event.code === 'Escape'){
            if (body.classList.contains('popup-visible')){
                body.classList.remove('popup-visible');
                document.querySelector('body').classList.remove('popup-open');
                for (let j = 0; j < popUp.length; j++){
                    popUp[j].classList.remove('active');
                }
            }
        }
    });
    // Close on click outside popup
    document.addEventListener('mouseup', e => {
        let target = e.target,
            popup = popUpWrap,
            its_popup,
            its_popup_is_active;
        for (let i = 0; i < popUp.length; i++){
            if (popUp[i].classList.contains('active')){
                popup = popUp[i];
                its_popup = target == popup || popup.contains(target);
                its_popup_is_active = popup.classList.contains('active');
                if (!its_popup && its_popup_is_active){
                    body.classList.remove('popup-visible');
                    document.querySelector('body').classList.remove('popup-open');
                    for (let j = 0; j < popUp.length; j++){
                        popUp[j].classList.remove('active');
                    }

                }
            }
        }
    });
}

function popupInitBtn(popupBtn, body, popUp) {
    popupBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let data = popupBtn.dataset['popupname'];
        showPopUp(data);
    });
}

function showPopUp(popUpName) {
    let popupBlock = document.querySelector(`.${popUpName}`),
        body = document.querySelector('.wrapper'),
        popUp = document.querySelectorAll('.popup');
    if (!body.classList.contains('.popup-visible')){
        document.querySelector('body').classList.add('popup-open');
        body.classList.add('popup-visible');
        for (let j = 0; j < popUp.length; j++){
            popUp[j].classList.remove('active');
        }
        popupBlock.classList.add('active');
        closePopupButton(popupBlock);
    }
}

// Cross closure
function closePopupButton(popupBlock) {
    let popupRemove = popupBlock.querySelectorAll('.popup-remove');
    for (let i = 0; i < popupRemove.length; i++){
        popupRemove[i].addEventListener('click', function (e) {
            e.preventDefault();
            closePopup();
        })
    }
}

function closePopup() {
    let body = document.querySelector('.wrapper'),
        popUp = document.querySelectorAll('.popup');
    if (body.classList.contains('popup-visible')){
        body.classList.remove('popup-visible');
        document.querySelector('body').classList.remove('popup-open');
        for (let j = 0; j < popUp.length; j++){
            popUp[j].classList.remove('active');
        }
    }

}
// init popUp
document.addEventListener("DOMContentLoaded", function () {
    popupInit();
});
function createQuantityInput(){
    let quantity = document.querySelectorAll('input[type="number"]');
    for (let i = 0; i < quantity.length; i++){
        let quantityItem = quantity[i];
        console.log(quantityItem);
        quantityItem.insertAdjacentHTML('beforebegin', '<div class="quantity"></div>');
        let div = quantityItem.closest('div').querySelector('.quantity');
        div.prepend(quantityItem);
        quantityItem.insertAdjacentHTML('beforebegin', '<button type="button" class="quantity-btn quantity-btn-minus" data-quantity="minus"></button>');
        quantityItem.insertAdjacentHTML('afterend', '<button type="button" class="quantity-btn quantity-btn-plus" data-quantity="plus"></button>');
        initQuantityInput(quantityItem);
    }
}

function initQuantityInput(input){
    let quantityInput = input,
        quantityInputMin = quantityInput.min,
        quantityInputMax = quantityInput.max,
        quantityInputStep = quantityInput.step,
        btnMinus = quantityInput.closest('.quantity').querySelector('.quantity-btn-minus'),
        btnPlus = quantityInput.closest('.quantity').querySelector('.quantity-btn-plus'),
        step,
        inputMin,
        inputMax;
    if (quantityInputStep.length != 0){
        step = Number(quantityInputStep);
    } else {
        step = 1;
    }

    if (quantityInputMin.length != 0){
        inputMin = Number(quantityInputMin);
    } else {
        inputMin = 1;
    }

    if (quantityInputMax.length != 0){
        inputMax = Number(quantityInputMax);
    } else {
        inputMax = 9999;
    }





    btnMinus.addEventListener('click', function (e) {
        let btn = e.target,
            input = btn.nextElementSibling;
        if (input.value > inputMin){
            input.value = Number(input.value) - step;
        }
    });
    btnPlus.addEventListener('click', function (e) {
        let btn = e.target,
            input = btn.previousElementSibling;
        if (input.value < inputMax) {
            input.value = Number(input.value) + step;
        }
    })

}

document.addEventListener("DOMContentLoaded", function () {
    createQuantityInput();

});
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
//"show password" function
function showHidePassword() {
    let inputPassword = document.querySelector('.password-input'),
        span;
    if (inputPassword){
        let btnPassword = inputPassword.querySelector('.password-btn');
        btnPassword.addEventListener("mousedown", function (e) {
            let inputValue = inputPassword.querySelector('input[type="password"]').value;
            if (inputValue !== ''){
                inputPassword.insertAdjacentHTML('beforeend',`<span class="password-text">${inputValue}</span>`);
                btnPassword.querySelector('.fa').classList.remove('fa-eye-slash');
                btnPassword.querySelector('.fa').classList.add('fa-eye');
                mouseUpSpan(inputPassword.querySelector('.password-text'));
            }

        });
        btnPassword.addEventListener("mouseup", function (e){
            let inputValue = inputPassword.querySelector('input[type="password"]').value;
            span = inputPassword.querySelector('.password-text');
            if (span != null){
                span.remove();
            }
            if (inputValue !== ''){
                btnPassword.querySelector('.fa').classList.remove('fa-eye');
                btnPassword.querySelector('.fa').classList.add('fa-eye-slash');
            }
        });

    }
}
function mouseUpSpan(div) {
    let inputPassword = document.querySelector('.password-input'),
        btnPassword = inputPassword.querySelector('.password-btn');
    div.addEventListener("mouseup", function (e){
        div.remove();
        btnPassword.querySelector('.fa').classList.remove('fa-eye');
        btnPassword.querySelector('.fa').classList.add('fa-eye-slash');
    });
}

document.addEventListener("DOMContentLoaded", function () {
    showHidePassword();
});
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