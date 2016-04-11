
function Shelter (s) {
  return  '<a href="/shelter/' + s._id + '">' +
            '<div class="search-result row">' +
              '<div class="result-logo"><img src="' + s.avatarUrl + '" alt="' + s.name + '"></div>' +
              '<div class="result-info">' +
                '<div class="info-element info-name">' + s.name + '</div>' +
                '<div class="info-element info-address">' +
                  s.address.street + '<br>' +
                  s.address.city + ', ' + s.address.state + ' ' + s.address.zip +
                '</div>' +
                '<div class="info-element info-phone">' + s.phone + '</div>' +
              '</div>' +
            '</div>' +
          '</a>';
}

// { data: { term, zipcode, radius }, success, error }
function search (data, success, error) {
  $.get('/api/search', data, success, 'json');
}

$(function () {
  $('.btn-search').click(function (e) {
    var data = {
      term:    $('#search-name').val(),
      zipcode: $('#search-zipcode').val(),
      radius:  $('#search-radius').val()
    };
    search(data, function (res) {
      console.log('res: ', res);

      if(!res.success) {
        console.log('[search] error:', res.msg);
        return;
      }

      var data = res.data;

      console.log('data: ', data);

      $('.search-results').html('');

      if(!data.shelters) {
        $('.search-results').html('<p class="search-notice row">No results found.</p>');
      }

      data.shelters.forEach(function (shelter) {
        var shelterHTML = Shelter(shelter);
        $('.search-results').append(shelterHTML);
      });
    });
  });
});
