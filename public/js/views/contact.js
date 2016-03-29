$(function () {
	$('#submit').click(function (e) {
		e.preventDefault();

		$('.status').css('display', 'none');

		// TODO: Validations

		var email   = $('[name="email"]').val();
		var name    = $('[name="name"]').val();
		var subject = $('[name="subject"]').val();
		var message = $('[name="message"]').val();

		if (!(name && email && subject && message)) {
			$('#fieldsRequired').css('display', 'inherit');
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