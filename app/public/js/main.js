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
    return this.optional(element) || /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
  },
  'Please enter a valid phone number (+38 (999) 99-99-999).',
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
      phone: {
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
        required: 'Пожалуйста, введите ваше имя',
        validName: 'Пожалуйста введите корректное имя',
      },
      phone: {
        required: 'Пожалуйста, введите ваш номер',
        validPhoneNumber: 'Пожалуйста введите корректный номер',
      },
      email: {
        required: 'Пожалуйста, введите ваш email',
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
  });
});

let phoneInput = document.querySelector('input[type="tel"]');
let im = new Inputmask('+38 (999) 999-99-99');
im.mask(phoneInput);

// form validation ends

// form submit starts

const form = document.forms['myWebinarForm'];

form.addEventListener('submit', formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  const data = serializeForm(form);
  const response = await sendData(data);
  if (response.ok) {
    let result = await response.json();
    alert(result.message);
    form.reset();
  } else {
    alert('Код ошибки: ' + response.status);
  }
}

function serializeForm(formNode) {
  return new FormData(form);
}

async function sendData(data) {
  return await fetch('../send_mail.php', {
    method: 'POST',
    body: data,
  });
}

// form submit ends

// phone input dropdown
// var input = document.querySelector('#phoneNumber');
// window.intlTelInput(input, {
//   onlyCountries: ['ua', 'us'],
//   initialCountry: 'UA',
//   utilsScript:
//     'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
// });
