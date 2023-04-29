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

    function Places () {
      const PLACE_URL = `http://0.0.0.0:5001/api/v1/places_search/`;
      $.ajax({
        type: 'POST',
        url: PLACE_URL,
        data: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
        success: function (response) {
          for (const r of response) {
            const article = ['<article>',
              '<div class="title_box">',
            `<h2>${r.name}</h2>`,
            `<div class="price_by_night">$${r.price_by_night}</div>`,
            '</div>',
            '<div class="information">',
            `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
            `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
            `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
            '</div>',
            '<div class="description">',
            `${r.description}`,
            '</div>',
            '</article>'];
            $('SECTION.places').append(article.join(''));
          }
        },
        error: function (error) {
          console.log(error);
        }
      })
    }
    ApiStatus();
  });