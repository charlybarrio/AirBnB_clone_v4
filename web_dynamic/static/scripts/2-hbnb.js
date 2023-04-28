$(document).ready(function() {
    const checkBoxes = $("input[type='checkbox']");
    const amenityH4Tag = $(".amenities > h4");
  
    let amenities = {};
    checkBoxes.change(function() {
      const id = $(this).data("id");
      const name = $(this).data("name");
  
      if (this.checked) {
        amenities[id] = name;
      } else {
        delete amenities[id];
      }
  
      const amenityList = Object.values(amenities).join(", ");
  
      if (amenityList.length > 0) {
        amenityH4Tag.text(amenityList);
      } else {
        amenityH4Tag.html("&nbsp;");
      }
    });
  
    function ApiStatus() {
      const API_URL = 'http://0.0.0.0:5001/api/v1/status/';
      $.get(API_URL, function(data, status) {
        if (status === 'success' && data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      });
    }
  
    ApiStatus();
  });