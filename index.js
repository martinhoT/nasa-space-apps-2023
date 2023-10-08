const globalView = {
    coords: [28.1, 11.6],
    zoom: 2
}

const iberianView = {
    coords: [39.834, -3.142],
    zoom: 6
}

current_page = "intro";
current_stage = "evaporation";

function introduction_next(map) {
    go_to_map(map);
}

function go_to_introduction(map) {
    if (current_page == "outro") {
        $('#outro').fadeOut(1000);
    }
    else if (current_page == "map") {
        $('#map-stuff').fadeOut(1000);
    }
    $('#introduction').fadeIn(1000);
    map.setView(globalView.coords, globalView.zoom, {animate: true, duration: 2.0, easeLinearity: 0});
    current_page = "intro";
}

function go_to_map(map) {
    if (current_page == "outro") {
        $('#outro').fadeOut(1000);
    }
    else if (current_page == "intro") {
        $('#introduction').fadeOut(1000);
    }
    map.setView(iberianView.coords, iberianView.zoom, {animate: true, duration: 2.0, easeLinearity: 0});
    $('#map-stuff').fadeIn(1000);
    evaporation();

    current_page = "map";
}

function go_to_outro(map) {
    if (current_page == "intro") {
        $('#introduction').fadeOut(1000);
    }
    else if (current_page == "map") {
        $('#map-stuff').fadeOut(1000);
    }
    $('#outro').fadeIn(1000);
    map.setView(globalView.coords, globalView.zoom, {animate: true, duration: 2.0, easeLinearity: 0});
    current_page = "outro";
}

function evaporation() {
    $('#stage-description-text').html('<b>Evaporation</b>: surface water, such as oceans, rivers and lakes, is heated by the sun and turns into water vapor.');

    end_previous_stage();
    $('#evaporation').fadeIn(1000);

    current_stage = "evaporation";
}

function condensation() {
    $('#stage-description-text').html('<b>Condensation</b>: Water vapor rises into the atmosphere and turns into water droplets, forming clouds.');

    end_previous_stage();
    $('#clouds').fadeIn(1000);

    current_stage = "condensation";
}

function precipitation() {
    $('#stage-description-text').html('<b>Precipitation</b>: The water droplets in the clouds come together and fall back to Earth as rain, snow, hail, etc.');
    
    end_previous_stage();
    $('#clouds').fadeIn(1000);
    $('#clouds').addClass('darken');
    $('#rain').fadeIn(1000);

    current_stage = "precipitation";
}

function infiltration() {
    $('#stage-description-text').html('<b>Collection</b>: Part of the water seeps into the ground, feeding the water table and contributing to groundwater.');

    end_previous_stage();
    $('#vectors').fadeIn(1000);

    current_stage = "infiltration";
}

function end_previous_stage() {
    if (current_stage == "evaporation") {
        $('#evaporation').fadeOut(1000);
    }
    if (current_stage == "condensation") {
        $('#clouds').fadeOut(1000);
    }
    else if (current_stage == "precipitation") {
        $('#clouds').fadeOut(1000);
        $('#clouds').removeClass('darken');
        $('#rain').fadeOut(1000);
    }
    else if (current_stage == "infiltration") {
        $('#vectors').fadeOut(1000);
    }
}

$(document).ready(function() {
    $('#outro').hide();
    $('#map-stuff').hide();
    $('#evaporation').hide();
    $('#clouds').hide();
    $('#rain').hide();
    $('#vectors').hide();

    var map = L.map('map', {
        attributionControl: false,
        zoomControl: false,
        doubleClickZoom: false,
        dragging: false,
        keyboard: false,
        scrollWheelZoom: false,
        touchZoom: false
    }).setView(globalView.coords, globalView.zoom);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.geoJSON(riversGeoJSON).addTo(map);

    function createMarkerAt(coords, title, description) {
        var marker = L.marker(coords).addTo(map);
        marker.bindPopup("<b>" + title + "</b><br>" + description);
        // Optionally open the popup right after the marker is created
        // marker.openPopup();
    }

    createMarkerAt([40.733916115511356, 0.3730720537075789], "Floods in Mas de Barberans, Catalonia", "03/09/2023");
    createMarkerAt([40.41677634362118, -3.703779651436239], "Floods in Madrid", "21/09/1972 - 22/09/1972");
    createMarkerAt([38.72218027508508, -9.139373064035505], "Floods in Lisbon", "25/11/1967");
    createMarkerAt([41.14000402765314, -8.609668351032106], "Floods in Douro", "17/12/1909 - 25/12/1909");
    createMarkerAt([38.69703830996315, -9.422414474712719], "Floods in Cascais", "19/11/1983");
    createMarkerAt([38.470576242564256, -8.984936050570607], "Loss of coastal land in Portinho da Arrábida", "60% over 50 years");

    $('#introduction-next').on('click', function() {
        introduction_next(map);
    });
    $('#timeline-evaporation').on('click', function() {
        evaporation();
    });
    $('#timeline-condensation').on('click', function() {
        condensation();
    });
    $('#timeline-precipitation').on('click', function() {
        precipitation();
    });
    $('#timeline-infiltration').on('click', function() {
        infiltration();
    });
    $('#info').on('click', function() {
        go_to_outro(map);
    });
    $('#outro-back').on('click', function() {
        go_to_map(map)
    });
    $('#navbar-intro').on('click', function() {
        go_to_introduction(map);
    });
    $('#navbar-map').on('click', function() {
        go_to_map(map);
    });
    $('#navbar-outro').on('click', function() {
        go_to_outro(map);
    });
});