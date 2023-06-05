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