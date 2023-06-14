<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require_once __DIR__ . '/../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mail = new PHPMailer(true);
    $title = "Заявка с формы"

    try {
        $mail->CharSet = "UTF-8";
        $mail->IsHTML(true);

        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $email = $_POST["email"];
        $email_template = __DIR__ . "/../template_mail.html";

        $body = file_get_contents($email_template);
        $body = str_replace('%name%', $name, $body);
        $body = str_replace('%phone%', $phone, $body);
        $body = str_replace('%email%', $email, $body);

        $mail->addAddress("evroigor86@gmail.com");   // Replace with the recipient's email address
        $mail->setFrom($email);
        $mail->Subject = $title;
        $mail->MsgHTML($body);

        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";  // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = "iniacor86@gmail.com";  // Replace with your SMTP username
        $mail->Password = "klhfpamzuauejibk";  // Replace with your SMTP password
        $mail->SMTPSecure = "ssl";  // Set the encryption type, if required
        $mail->Port = 465;  // Replace with the appropriate port number

        if ($mail->send()) {
            $response = ["message" => "Данные отправлены!"];
        } else {
            $response = ["message" => "Ошибка отправки"];
        }
    } catch (Exception $e) {
        $response = ["message" => "Ошибка: " . $mail->ErrorInfo];
    }

    header("Content-type: application/json");
    echo json_encode($response);
}
?>