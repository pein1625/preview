var colorList = ["#0277a2", "#00ca4c", "#9a0202"]; // route stroke color

function route(origin, destination, color, callback) {
  color = color || "#000";
  var directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    preserveViewport: true,
    polylineOptions: {
      strokeColor: color,
      strokeWeight: 6
    }
  });
  directionsDisplay.setMap(map);

  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING'
  }, function (result, status) {
    if (status === "OK") {
      directionsDisplay.setDirections(result);
      var distance = result.routes[0].legs[0].distance;
      if (callback) {
        callback(distance, result.routes[0].bounds);
      }
    } else {
      console.log(status);
    }
  });
  return directionsDisplay;
}

function destroyRoute(directionsDisplay) {
  directionsDisplay.setMap(null);
}

function createMarker(options) {
  // var markerOptions = {
  //   query: ".marker", => marker template container
  //   position: hearse.position, => position {lat, lng}
  //   label: hearse.label, => label
  //   number: 1, => số bên cạnh label
  //   icon: "./images/icon-hearse.svg", => icon trắng trên marker
  //   distance: "2.3 km", => dùng cho cái marker của xe, nếu tồn tại thì icon nhỏ lại
  //   info: function() { => truyền function cho nút info gần label
  //     showModal(123);
  //   },
  //   lightPointer: true, => icon marker nền sáng hơn,
  //   color: "#000", => marker 2 backgroud color
  //   onClick: function() { => truyền function click vào marker
  //   }
  // }

  var Marker = createMarkerClass();
  var marker = new Marker(options);
  marker.setMap(map);
  return marker;
}

function destroyMarker(marker) {
  marker.onRemove();
}

function createMarkerClass() {
  function Marker(options) {
    var lat = options.position.lat,
        lng = options.position.lng;

    this.position = new google.maps.LatLng(lat, lng);
    var temp = document.querySelector(options.query);
    if (!temp) {
      console.log("Marker template is not found!");
      return;
    }
    this.containerDiv = temp.cloneNode(true);
    if (options.label) {
      this.containerDiv.querySelector(".marker-title").innerHTML = options.label;
    }
    if (options.lightPointer) {
      this.containerDiv.querySelector(".marker-pointer").classList.add("marker-pointer-lighter");
    }
    if (options.number) {
      this.containerDiv.querySelector(".marker-number").innerHTML = options.number;
      this.containerDiv.querySelector(".marker-header").style.paddingLeft = "12px";
    }
    if (options.icon) {
      this.containerDiv.querySelector(".marker-icon").src = options.icon;
    }
    if (options.distance) {
      this.containerDiv.querySelector(".marker-icon").classList.add("marker-icon-small");
      this.containerDiv.querySelector(".marker-distance").innerHTML = options.distance;
    } else {
      if (this.containerDiv.querySelector(".marker-icon")) {
        this.containerDiv.querySelector(".marker-icon").classList.remove("marker-icon-small");
      }
      if (this.containerDiv.querySelector(".marker-distance")) {
        this.containerDiv.querySelector(".marker-distance").innerHTML = "";
      }
    }
    if (options.info) {
      let infoEl = this.containerDiv.querySelector(".marker-info");
      infoEl.classList.add("show");
      infoEl.addEventListener("click", options.info);
      this.containerDiv.querySelector(".marker-header").style.paddingRight = "25px";
    } else {
      let infoEl = this.containerDiv.querySelector(".marker-info");
      if (infoEl) {
        infoEl.classList.remove("show");
      }
    }
    if (options.color && options.query === ".marker-2") {
      this.containerDiv.querySelector(".marker-wrapper").style.color = options.color;
    }
    if (options.onClick) {
      this.containerDiv.addEventListener("click", function () {
        options.onClick();
      });
    }

    // Optionally stop clicks, etc., from bubbling up to the map.
    google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
  }
  // ES5 magic to extend google.maps.OverlayView.
  Marker.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Marker.prototype.onAdd = function () {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  };

  /** Called when the popup is removed from the map. */
  Marker.prototype.onRemove = function () {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  };

  Marker.prototype.draw = function () {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    var display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';

    if (display === 'block') {
      this.containerDiv.style.left = divPosition.x + 'px';
      this.containerDiv.style.top = divPosition.y + 'px';
      this.containerDiv.style.zIndex = parseInt(divPosition.y * 1000);
    }
    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  };

  return Marker;
}

function setBounds() {
  if (!boundList) {
    return;
  }
  var bounds = new google.maps.LatLngBounds();
  for (var key in boundList) {
    bounds.union(boundList[key]);
  }
  map.fitBounds(bounds);
}