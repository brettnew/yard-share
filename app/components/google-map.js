import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  didInsertElement() {
    debugger;
    var location = this.get('location');
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {address: location}, (result, status) => {
      if (status === 'OK') {
        let location = result[0].geometry.location;
        let postion = {lat: location.lat(), lng: location.lng()};
      }
    })
    var container = this.$('.map-display')[0];
    var options = {
      center: this.get('map').center(this.get('listing.latitude'), this.get('listing.longitude')),
      zoom: 15
    };
    var newMap = this.get('map').findMap(container, options);
    var markerOptions = {
      position: {lat: this.get('listing.latitude'), lng: this.get('listing.longitude')},
      map: newMap,
      icon: '/images/leaf_icon.png'
    };
    var content = {
      content: "<h4>" + this.get('listing.title') + "</h4>"
    };
    var infowindow = this.get('map').createInfoWindow(content);
    var marker = this.get('map').createMarker(markerOptions);
    marker.addListener('click', function() {
      infowindow.open(newMap, marker);
    });
  }





  // maps: Ember.inject.service('google-map'),
  //
  // didInsertElement() {
  //   this._super(...arguments);
  //   let location = this.get('location');
  //   let mapElement = this.get('maps').getMapElement(location);
  //   this.$('.map-container').append(mapElement);
  // }
});
