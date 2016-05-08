function initMap() 
{
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            var myOrigin = {
                lat: position.coords.latitude,
                lng:  position.coords.longitude
            }
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;   
            
            var map = new google.maps.Map(document.getElementById('map'), 
            {
                zoom: 14,
                center: {lat: myOrigin.lat, lng: myOrigin.lng }
            });
            directionsDisplay.setMap(map);
            var infoWindow = new google.maps.InfoWindow({map: map});
            infoWindow.setPosition(map.center);
            infoWindow.setContent('You are here! (Or not, but somewhere near :P)');
            var onClickHandler = function() 
            {
                calculateAndDisplayRoute(directionsService, directionsDisplay, myOrigin);
            };

            document.getElementById('doplan').addEventListener('click', onClickHandler);                     
        });
    }
    else
    {
        handleLocationError();
    }
}

function handleLocationError() 
{
    window.alert("Error!");
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, myOrigin) 
{
    var myDestination = null;

    if (!document.getElementById("iscustom").checked)
    {
        myDestination = document.getElementById('end').value; 
    }
    else
    {
        myDestination = document.getElementById('address').value;
    }

    directionsService.route(
    {
        origin: new google.maps.LatLng(myOrigin.lat, myOrigin.lng),
        destination: myDestination,
        travelMode: google.maps.TravelMode.DRIVING
    }, 
    function(response, status) 
    {
        if (status === google.maps.DirectionsStatus.OK) 
        {
            directionsDisplay.setDirections(response);
        } 
        else 
        {
            window.alert('Directions request failed due to ' + status);
        }
    });
}