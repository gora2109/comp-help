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