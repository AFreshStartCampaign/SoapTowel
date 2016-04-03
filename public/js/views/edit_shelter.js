function isEmail (email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$(function () {
	$('#submit').click(function (e) {
		e.preventDefault();

		$('.status').css('display', 'none');

		// TODO: Validations

		var contactEmail = $('[name="email"]').val();
		var name    = $('[name="name"]').val();
		var subject = $('[name="subject"]').val();
		var message = $('[name="message"]').val();

		if (!(name && email && subject && message)) {
			$('#fieldsRequired').css('display', 'inherit');
			return;
		}

		if (!isEmail(email)) {
			$('#invalidEmail').css('display', 'inherit');
			return;
		}

		$.post('/api/email/send', {
			name: name,
			email: email,
			subject: subject,
			message: message
		});
		$('#msgSent').css('display', 'inherit');
	})
});

