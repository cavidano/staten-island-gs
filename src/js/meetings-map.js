//////////////////////////////////////////////
// A. Global Variables
//////////////////////////////////////////////

const mapColumns = document.getElementById("map-columns");

let sidebarShown = false;

//////////////////////////////////////////////
// B. Map Height
//////////////////////////////////////////////

function setMapHeight() {

    const windowHeight = window.innerHeight;

    const mapColumnsPos = mapColumns.offsetTop;

    if (window.matchMedia('( min-width: 1000px )').matches) {
        mapColumns.style.height = windowHeight - mapColumnsPos + "px";
    } else {
        mapColumns.style.height = 'initial';
    }

}

setMapHeight();

//////////////////////////////////////////////
// B. Create Leaflet Map
//////////////////////////////////////////////

var map = L.map('map-loader', {
    center: [40.5795, -74.1502],
    setZoom: 8,
    minZoom: 8,
    maxZoom: 16,
    scrollWheelZoom: false,
    attributionControl: false,
    zoomControl: false,
});

var myPath = ".";

// Create custom pin

var Icon = L.Icon.extend({
    options: {
        iconSize: [30, 45],
        iconAnchor: [15, 45],
        shadowSize: [45, 22.5],
        shadowAnchor: [22.5, 22.5],
        shadowUrl: myPath + './images/map-pin-shadow.svg',
        popupAnchor:  [0, -50]
    }
});

// Load SI Bounds

var siGeo = new L.GeoJSON.AJAX('./lib/geojson/statenIsland.geojson');

siGeo.on('data:loaded', function() {
    centerMap(siGeo);
    L.tileLayer.provider('CartoDB.VoyagerNoLabels').addTo(map);
});

function centerMap(myBounds){
    map.fitBounds(myBounds.getBounds(), { padding: [40, 40] });
}
// Custom popup options

var markerOptions = {
    riseOnHover: true,
    icon: Icon
};

var openMeeting = new Icon( { iconUrl: myPath + '/images/map-pin-open.svg'} );
var closedMeeting = new Icon( { iconUrl: myPath + '/images/map-pin-closed.svg'} );

// Create Markers

markerLayer = L.layerGroup([]).addTo(map);

function createMarker(
    coords, 
    meetingType,
    meetingTitle,
    meetingAddress
) {

    var meeting;

    if( meetingType === closedMeeting ){
        meeting = 'Closed';
    } else if(meetingType === openMeeting) {
        meeting = 'Open';
    }

    var contentPopUp = '<strong>' + meetingTitle + '</strong>';

    var contentSidebar = '<p class="meeting__title">' + meetingTitle + '</p>' +
                         '<p class="meeting__type">' + meeting + ' Discussion' + '</p>' +
                         '<p class="meeting__address">' + meetingAddress + '</p>';
    
    var marker = L.marker(coords, { icon: meetingType }).addTo(markerLayer);
    
    marker.bindPopup(contentPopUp);

    marker.on('click', function (event) {

        if( sidebarShown === false){
            mapColumns.classList.add('sidebar-shown');
            sidebarShown = true;
        }

        var id = L.Util.stamp(event.target);

        if (document.getElementById(id) != null) return;

        var sidebarElement = L.DomUtil.create('div', 'sidebarElement', document.getElementById('marker-info'));
        sidebarElement.id = id;
        
        var meetingDetail = L.DomUtil.create('div', 'meeting-detail' + ' ' + meeting.toLowerCase() + ' ' + 'border-bottom', sidebarElement);
        meetingDetail.innerHTML = contentSidebar;
        
        meetingDetail.setAttribute("tabindex", 0);

        meetingDetail.setAttribute("data-highlight", "true");

        setTimeout( function() {
            meetingDetail.setAttribute("data-highlight", "false");
        }, 2000)
        
        L.DomEvent.on( meetingDetail, 'click', function (event) {

            if( event.target.classList.contains('btn')) {
                event.preventDefault();
            } else {
                var marker = markerLayer.getLayer(this.id);
                marker.closePopup();
                map.panTo(marker.getLatLng());
                marker.bounce(2);
            }

        }, sidebarElement);
        
        var unpinMeeting = L.DomUtil.create('button', 'btn btn--icon-only', meetingDetail);
        
        unpinMeeting.innerHTML = '<span class="screen-reader-only">Remove</span>' +
                                    '<span class="fas fa-times btn__icon"></span>';

        unpinMeeting.setAttribute("title", "Remove");
        
        L.DomEvent.on(unpinMeeting, 'click', function (event) {
            markerLayer.getLayer(this.id).closePopup();
            this.parentNode.removeChild(this);
        }, sidebarElement);
    });
}

createMarker(
    [40.641310, -74.075930],
    openMeeting, 
    "The Crossroads",
    "26 Bay St,<br>Staten Island, NY<br>10301"
);

createMarker(
    [40.628910, -74.114570],
    closedMeeting, 
    "Carl's House",
    "471 Broadway,<br>Staten Island, NY<br>10301"
);

createMarker(
    [40.632000, -74.132060],
    closedMeeting, 
    "Jaywalker Club",
    "945 Post Ave,<br>Staten Island, NY<br>10302"
);

createMarker(
    [40.639150, -74.076800],
    openMeeting, 
    "Project Hospitality Cafe",
    "100 Central Ave,<br>Staten Island, NY<br>10301"
);

createMarker(
    [40.533780, -74.189230],
    openMeeting, 
    "Steps to the Stars",
    "5371 Amboy Rd,<br>Staten Island, NY<br>10312"
);

window.addEventListener('resize', setMapHeight);

//////////////////////////////////////////////
// D. Custom Map Buttons
//////////////////////////////////////////////

const zoomInButton = document.querySelector('[data-map-zoom-in]');
const zoomOutButton = document.querySelector('[data-map-zoom-out]');
const toggleLocationButton = document.querySelector('[data-toggle-locations]');

map.on("zoomend", function () {
    let currentZoom = map.getZoom();
    let maxZoom = map.options.maxZoom;
    let minZoom = map.options.minZoom;

    if (currentZoom >= maxZoom) {
        zoomInButton.disabled = true;
    } else {
        zoomInButton.disabled = false;
    }

    if (currentZoom <= minZoom) {
        zoomOutButton.disabled = true;
    } else{
        zoomOutButton.disabled = false;
    }
});

zoomInButton.addEventListener('click', function (event) {
   map.zoomIn();
});

zoomOutButton.addEventListener('click', function (event) {
    map.zoomOut()
});

toggleLocationButton.addEventListener('click', function () {

    if( sidebarShown === false){
        mapColumns.classList.add("sidebar-shown");
        sidebarShown = true;
    } else if ( sidebarShown === true) {
        mapColumns.classList.remove("sidebar-shown");
        sidebarShown = false;
    }
    
    map.invalidateSize(true);

});