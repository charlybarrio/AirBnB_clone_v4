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
});