
 let mapOptions = {
    center: {lat: 51.5, lng: -0.1},
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

let input1 = document.getElementById("departure")
let input2 = document.getElementById("destination")

let options = {
    types: ['(cities)']
}

let autocomplete1 = new google.maps.places.Autocomplete(input1, options);
let autocomplete2 = new google.maps.places.Autocomplete(input2, options);

let directionService = new google.maps.DirectionsService()
 
google.maps.event.addDomListener(window, 'load', initialize())

function initialize(){

    directionsDisplay = new google.maps.DirectionsRenderer();
    let map = new google.maps.Map(document.getElementById("map"), mapOptions) 
    directionsDisplay.setMap(map);
 }


google.maps.event.addListener(autocomplete1, 'place_changed', calcRoute)
google.maps.event.addListener(autocomplete2, 'place_changed', calcRoute)

function calcRoute() {
    let start = $('#departure').val();
    let end = $('#destination').val()
    let request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    }
    if(start && end) {
        directionService.route(request, function(response, status){
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(response);
            }
        })
    } else {
        initialize()
    }

}