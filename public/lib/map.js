
let mapOptions = {
    center: {lat: 51.5, lng: -0.1},
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

google.maps.event.addDomListener(window, 'load', initialize);


function initialize(){
    let map = new google.maps.Map(document.getElementById("map"), mapOptions)
}
