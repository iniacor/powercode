// form validation starts
$.validator.addMethod(
  'validName',
  function (value, element) {
    return this.optional(element) || /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]{3,20}$/.test(value);
  },
  'Please enter a valid name (3-20 characters, letters only).',
);

$.validator.addMethod(
  'validPhoneNumber',
  function (value, element) {
    return this.optional(element) || /^\d{8,13}$/.test(value);
  },
  'Please enter a valid phone number (8 digits only).',
);

$.validator.addMethod(
  'validEmail',
  function (value, element) {
    return (
      this.optional(element) ||
      /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-яЁёІіЇїЄє]{1}[-0-9А-яЁёІіЇїЄє\.]{1,}[0-9А-Яа-яЁёІіЇїЄє]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u.test(
        value,
      )
    );
  },
  'Please enter a valid email address.',
);

$(document).ready(function () {
  $('#myWebinarForm').validate({
    rules: {
      name: {
        required: true,
        validName: true,
      },
      phoneNumber: {
        required: true,
        validPhoneNumber: true,
      },
      email: {
        required: true,
        validEmail: true,
      },
    },
    messages: {
      name: {
        required: 'Please enter your name',
        validName: 'Пожалуйста введите корректное имя',
      },
      phoneNumber: {
        required: 'Please enter your phone number',
        validPhoneNumber: 'Пожалуйста введите корректный номер',
      },
      email: {
        required: 'Please enter your email',
        validEmail: 'Пожалуйста введите корректный email',
      },
    },
    ignore: '.country-code-select',
    onkeyup: function (element) {
      $(element).valid();
    },

    errorPlacement: function (error, element) {
      error.addClass('error-message');
      error.appendTo(element.parent());
    },

    submitHandler: function (thisForm) {
      let formData = new FormData(thisForm);

      fetch('send_email.php', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            console.log('Отправлено');
          } else {
            console.error('Ошибка при отправке');
          }
        })
        .catch(error => {
          console.error('Ошибка при отправке:', error);
        });

      thisForm.reset();
    },
  });
});

// form validation ends

// phone input dropdown
var input = document.querySelector('#phoneNumber');
window.intlTelInput(input, {
  onlyCountries: ['ua', 'ru'],
  initialCountry: 'UA',
  utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
});
