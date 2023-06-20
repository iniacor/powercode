// form validation starts
$.validator.addMethod('validName', function (value, element) {
  return this.optional(element) || /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]{3,20}$/.test(value);
});

$.validator.addMethod('validPhoneNumber', function (value, element) {
  return this.optional(element) || /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
});

$.validator.addMethod('validEmail', function (value, element) {
  return (
    this.optional(element) ||
    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-яЁёІіЇїЄє]{1}[-0-9А-яЁёІіЇїЄє\.]{1,}[0-9А-Яа-яЁёІіЇїЄє]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u.test(
      value,
    )
  );
});

$(document).ready(function () {
  const webinarForm = $('#myWebinarForm');
  const submitButton = webinarForm.find('.form-button');

  webinarForm.validate({
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
        email: true, // Добавлено правило email
      },
    },
    messages: {
      name: {
        required: 'Поле не может быть пустым',
        validName: 'Введите корректное имя',
      },
      phone: {
        required: 'Поле не может быть пустым',
        validPhoneNumber: 'Введите корректный номер',
      },
      email: {
        required: 'Поле не может быть пустым',
        validEmail: 'Введите корректный email',
        email: '', // Установлено пустое сообщение для правила email
      },
    },
    onkeyup: function (element) {
      $(element).valid();
    },
    errorPlacement: function (error, element) {
      const formControl = $(element).closest('.form__control');
      formControl.addClass('error');
      formControl.find('.error-message').text(error.text());
    },
    highlight: function (element) {
      const formControl = $(element).closest('.form__control');
      formControl.addClass('error').removeClass('success');
      formControl.find('.error-message').text('');
      submitButton.prop('disabled', true);
    },
    unhighlight: function (element) {
      const formControl = $(element).closest('.form__control');
      formControl.removeClass('error').addClass('success');
      formControl.find('.error-message').text('');

      if (webinarForm.find('.error').length === 0) {
        submitButton.prop('disabled', false);
      }
    },
  });
  // form validation ends

  // form submit starts
  // const form = webinarForm[0]; // Получаем DOM-элемент формы

  // form.addEventListener('submit', formSubmit);

  // async function formSubmit(e) {
  //   e.preventDefault();

  //   // Проверяем валидность формы
  //   if (webinarForm.valid()) {
  //     const data = serializeForm(form);
  //     const response = await sendData(data);

  //     if (response.ok) {
  //       let result = await response.json();
  //       alert(result.message);
  //       form.reset();
  //     } else {
  //       alert('Код ошибки: ' + response.status);
  //     }
  //   }
  // }

  // function serializeForm(formNode) {
  //   return new FormData(form);
  // }

  // function sendData(data) {
  //   return fetch('../send_mail.php', {
  //     method: 'POST',
  //     body: data,
  //   });
  // }
  async function formSubmit(e) {
    e.preventDefault();

    try {
      if (webinarForm.valid()) {
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
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  const form = webinarForm[0]; // Получаем DOM-элемент формы
  form.addEventListener('submit', formSubmit);

  function serializeForm(formNode) {
    return new FormData(form);
  }

  async function sendData(data) {
    try {
      return await fetch('../send_mail.php', {
        method: 'POST',
        body: data,
      });
    } catch (error) {
      console.error('Произошла ошибка при отправке данных:', error);
      throw error;
    }
  }
});

let phoneInput = document.querySelector('input[type="tel"]');
let im = new Inputmask('+38 (999) 999-99-99');
im.mask(phoneInput);

// form submit starts
// const form = document.forms['myWebinarForm'];

// form.addEventListener('submit', formSubmit);

// async function formSubmit(e) {
//   e.preventDefault();
//   const data = serializeForm(form);
//   const response = await sendData(data);
//   if (response.ok) {
//     let result = await response.json();
//     alert(result.message);
//     form.reset();
//   } else {
//     alert('Код ошибки: ' + response.status);
//   }
// }

// function serializeForm(formNode) {
//   return new FormData(form);
// }

// async function sendData(data) {
//   return await fetch('../send_mail.php', {
//     method: 'POST',
//     body: data,
//   });
// }
// form submit ends

// gsap animation starts
// decor-block animation
gsap.from('.decor-block__item--html,.decor-block__item--js, .decor-block__item--sublime', {
  duration: 1,
  opacity: 0,
  x: 200,
  stagger: 0.35,
});
gsap.to('.decor-block__item--sublime, .decor-block__item--vscode', {
  rotationY: 360,
  duration: 2,
});
gsap.from('.decor-block__item--css, .decor-block__item--vscode', {
  duration: 1,
  opacity: 0,
  y: 200,
  stagger: 0.55,
});

// form button animation
const timeLeftLable = gsap.timeline({
  defaults: { duration: 0.1 },
  delay: 3,
  repeat: -1,
  repeatDelay: 8,
});
timeLeftLable
  .to('.form-button', { rotate: 10 })
  .to('.form-button', { rotate: -10 })
  .to('.form-button', { rotate: 10 })
  .to('.form-button', { rotate: 0 });
