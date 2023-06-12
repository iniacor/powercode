<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];

  $to = 'iniacor86@google.com'; // Укажите вашу почту здесь
  $subject = 'Новая форма от ' . $name;
  $message = "Имя: " . $name . "\n";
  $message .= "Номер телефона: " . $phone . "\n";
  $message .= "Почта: " . $email . "\n";

  // Опционально: установите дополнительные заголовки или настройте параметры отправки

  if (mail($to, $subject, $message)) {
    echo 'Данные успешно отправлены!';
  } else {
    echo 'Произошла ошибка при отправке данных.';
  }
}
?>
