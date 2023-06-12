<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных из POST-запроса
$name = $_POST['name'];
$phoneNumber = $_POST['phoneNumber'];
$email = $_POST['email'];

// Формирование тела письма
$message = "
<table style='width: 100%;'>
  <tr>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Имя</b></td>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$name</td>
  </tr>
  <tr style='background-color: #f8f8f8;'>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Телефон</b></td>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$phoneNumber</td>
  </tr>
  <tr>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Email</b></td>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$email</td>
  </tr>
</table>
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth = true;

  // Настройки вашей почты
  $mail->Host = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username = 'iniacor86@gmail.com'; // Логин на почте
  $mail->Password = 'klhfpamzuauejibk'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;

  $mail->setFrom('iniacor86@gmail.com', 'Заявка с вашего сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('evroigor86@gmail.com');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = 'Заявка с вашего сайта';
  $mail->Body = $message;

  $mail->send();
  $status = "Сообщение успешно отправлено";

} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

echo $status;
?>
