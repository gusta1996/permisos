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

    public static function conexionSMTP()
    {
        // Server settings
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = self::$host; // Servidor SMTP
        $mail->SMTPAuth = self::$SMTPAuth; // Habilitar autenticación SMTP
        $mail->Username = self::$Username; // Nombre de usuario SMTP
        $mail->Password = self::$Password; // Contraseña SMTP
        $mail->Port = self::$Port; // Puerto SMTP
        $mail->SMTPSecure = self::$SMTPSecure; // Habilitar SSL
        return $mail; // Devolvemos la instancia de PHPMailer
    }
    public static function emailSolicitudCreada($data)
    {
        try {
            $mail = self::conexionSMTP(); // Obtenemos la instancia de PHPMailer
            $mail->setFrom(self::$email, 'G.A.D. El Guabo - Municipio de El Guabo'); // Dirección de correo del remitente
            $mail->addAddress($data['email']); // Dirección de correo del destinatario

            $mail->isHTML(true); // Formato de correo en HTML
            $mail->Subject = 'Solicitud de permiso No. '.$data['numero_solicitud']; // asunto
            $mail->addEmbeddedImage('../../public/images/cabecera.png', 'cabecera'); // inserta la imagen
            $mail->Body = '
            <div>
                <img src="cid:cabecera" />

                <p>Estimado/a <b>' . $data['apellidos'] . ' ' . $data['nombres'] . '</b>.</p>
                <p>Se ha creado su solicitud de permiso con el ID: ' . $data['numero_solicitud'] . '.</p>
                <p>Asegurese que insertar su firma electrónica en el documento, lo que dará inicio al proceso de aprobación.</p>
                <p>Saludos cordiales.</p>
                
            </div>
            '; // mensaje

            $mail->send();
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
    public static function emailSolicitudFirmada($data, $duenoFirma)
    {
        try {
            $mail = self::conexionSMTP(); // Obtenemos la instancia de PHPMailer
            $mail->setFrom(self::$email, 'G.A.D. El Guabo - Municipio de El Guabo'); // Dirección de correo del remitente
            $mail->addAddress($data['email']); // Dirección de correo del destinatario

            $mail->isHTML(true); // Formato de correo en HTML
            $mail->Subject = 'Solicitud de permiso No. '.$data['numero_solicitud']; // asunto
            $mail->addEmbeddedImage('../../public/images/cabecera.png', 'cabecera'); // inserta la imagen

            if ($duenoFirma == 'estandar') { $mensaje = '<p>Su documento firmado ha sido ingresado con éxito.</p>'; }
            elseif ($duenoFirma == 'autorizador'){ $mensaje = '<p>Su documento ha sido firmado por el <b>Jefe inmediato</b>, espere la confirmación del Director/a de talento humano.</p>'; }
            elseif ($duenoFirma == 'validador'){ $mensaje = '<p>Su documento ha sido firmado por el <b>Director/a de talento humano</b>, por lo que su solicitud de permiso ha sido aprobada y esta lista para imprimir.</p>'; }
            
            $mail->Body = '
            <div>
                <img src="cid:cabecera" />

                <p>Estimado/a <b>' . $data['apellidos'] . ' ' . $data['nombres'] . '</b>.</p>
                '. $mensaje .'
                <p>Saludos cordiales.</p>
                
            </div>
            '; // mensaje

            $mail->send();
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
    public static function emailSolicitudAnulada($data)
    {
        try {
            $mail = self::conexionSMTP(); // Obtenemos la instancia de PHPMailer
            $mail->setFrom(self::$email, 'G.A.D. El Guabo - Municipio de El Guabo'); // Dirección de correo del remitente
            $mail->addAddress($data['email']); // Dirección de correo del destinatario

            $mail->isHTML(true); // Formato de correo en HTML
            $mail->Subject = 'Solicitud de permiso No. '.$data['numero_solicitud']; // asunto
            $mail->addEmbeddedImage('../../public/images/cabecera.png', 'cabecera'); // inserta la imagen

            $mail->Body = '
            <div>
                <img src="cid:cabecera" />

                <p>Estimado/a <b>' . $data['apellidos'] . ' ' . $data['nombres'] . '</b>.</p>
                <p>Su solicitud de permiso con ID '.$data['numero_solicitud'].' ha sido anulado.</p>
                <p>Saludos cordiales.</p>
                
            </div>
            '; // mensaje

            $mail->send();
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}
