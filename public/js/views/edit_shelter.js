$.put = function(url, data, callback, type) {
  console.log('url, data, callback, type: ', url, data, callback, type);
  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }
  console.log('url, data, callback, type: ', url, data, callback, type);

  type = type || 'JSON';
  console.log('url, data, callback, type: ', url, data, callback, type);

  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: type
  });
}

function sendMultipartFormData () {
  var formData = new FormData();

  // HTML file input, chosen by user
  formData.append('avatar', $('[name="avatar"')[0].files[0]);

  var request = new XMLHttpRequest();
  request.open('POST', '/api/shelter/:id/avatar');
  request.send(formData);
}

function isEmail (email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function handleAvatar(files) {
  if (!files.length) return;
  $img = $('.avatar > img');
  $img.attr('src', window.URL.createObjectURL(files[0]));
  $img.onload = function() {
    window.URL.revokeObjectURL(this.src);
  }
}

$(function () {
  $('#submit').click(function (e) {
    e.preventDefault();

    $('.status').css('display', 'none');

    // TODO: Validations
    var data = {
      name: $('[name="name"]').val(),
      address: {
        street: $('[name="address-street"]').val(),
        city:   $('[name="address-city"]').val(),
        state:  $('[name="address-state"]').val(),
        zip:    $('[name="address-zip"]').val()
      },
      phone: $('[name="phone"]').val(),
      websiteUrl: $('[name="websiteUrl"]').val(),
      twitterUrl: $('[name="twitterUrl"]').val(),
      facebookUrl: $('[name="facebookUrl"]').val(),
      email: $('[name="email"]').val(),
      bio: $('[name="bio"]').val(),
      // avatarFile: $('[name="avatar"')[0].files[0]
    };

    if (
      !(
        data.name &&
        data.address &&
        data.phone &&
        data.websiteUrl &&
        data.twitterUrl &&
        data.facebookUrl &&
        data.email &&
        data.bio &&
        // data.avatarFile
      )
    ) {
      $('#fieldsRequired').css('display', 'inherit');
      return;
    }

    if (!isEmail(data.email)) {
      $('#invalidEmail').css('display', 'inherit');
      return;
    }

    console.log('data.avatarFile: ', data.avatarFile);

    var shelterId = $('#data').attr('shelterId');
    console.log('shelterId: ', shelterId);

    // $.put('/api/shelter/' + shelterId, data, function (result) {
    //   console.log(result);
    // });
    $.ajax({
      url: '/api/shelter/' + shelterId,
      type: 'PUT',
      success: function (result) {
        console.log(result);
      },
      data: data,
      // contentType: type
    });

    $('#msgSent').css('display', 'inherit');
  });
});

