let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximunAge: 0
}
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(sucess, error, options);
}else{
    alert('Servicios de Geolocalizacion no disponibles');
}


function sucess (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude
    
    let map = L.map('mapa', {
        center:[latitude, longitude],
        zoom: 16,
    })
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let inicio = L.icon({
        iconUrl: '../imagenes/marcador.png',
        iconSize: [60, 85],
        iconAnchor: [34, 85],
        popupAnchor: [-3, -72]
    })

    let final = L.icon({
        iconUrl: '../imagenes/marcador.png',
        iconSize: [60, 85],
        iconAnchor: [34, 85],
        popupAnchor: [-3, -72]
    })

    let track = L.icon({
        iconUrl: '../imagenes/marcador.png',
        iconSize: [60, 85],
        iconAnchor: [34, 85],
        popupAnchor: [-3, -72]
    })

    let control = L.Routing.control({
        waypoints:[
            L.latLng(latitude, longitude),
            L.latLng(40.405, -3.691)
        ],
        language: 'es',
        createMarker: function(i, wp, nWps){
            switch(i){
                case 0:
                    return L.marker(wp.latLng, {icon:inicio, draggable:true}).addTo(map).bindPopup('Inicio').openPopup();
                case nWps-1:
                    return L.marker(wp.latLng, {icon:final, draggable:true}).addTo(map).bindPopup('Final').openPopup();
                default:
                    return L.marker(wp.latLng, {icon:track, draggable:true}).addTo(map).bindPopup('Paso Intermedio').openPopup();
            }
        }
    }).addTo(map);
    
}
function error () {
    let map = L.map('mapa', {
        center:[37.17059, -3.60552],
        zoom: 16,
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);    
}