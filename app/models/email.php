<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../phpMailer/src/Exception.php';
require '../phpMailer/src/PHPMailer.php';
require '../phpMailer/src/SMTP.php';

class email
{
    private static $host = 'smtp.gmail.com'; // Servidor SMTP
    private static $SMTPAuth = true; // Habilitar autenticación SMTP
    private static $Username = 'gustasama1996@gmail.com'; // Nombre de usuario SMTP
    private static $Password = 'itvjcqvnzfbgpbjj'; // Contraseña SMTP
    private static $Port = 465; // Puerto SMTP
    private static $SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Habilitar SSL
    private static $email = 'gustasama1996@gmail.com'; // Dirección de correo del remitente

    public static function emailSolicitudCreada($data)
    {
        $mail = new PHPMailer();
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = self::$host; // Servidor SMTP
            $mail->SMTPAuth = self::$SMTPAuth; // Habilitar autenticación SMTP
            $mail->Username = self::$Username; // Nombre de usuario SMTP
            $mail->Password = self::$Password; // Contraseña SMTP
            $mail->Port = self::$Port; // Puerto SMTP
            $mail->SMTPSecure = self::$SMTPSecure; // Habilitar SSL

            $mail->setFrom(self::$email, 'G.A.D. El Guabo - Municipio de El Guabo'); // Dirección de correo del remitente
            $mail->addAddress($data['email']); // Dirección de correo del destinatario

            $mail->isHTML(true); // Formato de correo en HTML
            $mail->Subject = 'Solicitud de permiso creada'; // asunto
            $mail->addEmbeddedImage('../../public/images/cabecera.png', 'cabecera'); // inserta la imagen
            $mail->Body = '
            <div>
                <img src="cid:cabecera" />

                <p>Estimado/a <b>'.$data['apellidos'].' '.$data['nombres'].'</b>.</p>
                <p>Se ha creado su solicitud de permiso con el ID: '.$data['numero_solicitud'].'.</p>
                <p>Asegurese que insertar su firma electrónica en el documento, lo que dará inicio al proceso de aprobación.</p>
                <p>Saludos cordiales.</p>
                
            </div>
            '; // mensaje

            $mail->send();
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}
