<?php
require '../config/connection.php';

class usuario extends Connection
{
    public static function actualizarContrasena($data)
    {
        try {
            $comprobacion = array();

            // Comprobrar la contraseña actual
            $sql = "SELECT clave 
                    FROM usuario
                    WHERE id_funcionario_fk=:id_funcionario";
            $passActual = Connection::getConnection()->prepare($sql);
            $passActual->bindParam(':id_funcionario', $data['id_funcionario']);
            $passActual->execute();
            $passGuardada = $passActual->fetch();
            $passIngresada = md5($data['actualContrasena']); // se encrypta contraseña con MD5
            if ($passGuardada[0] != $passIngresada) {
                // Si la contraseña no es correcta enviar mensaje de error
                $comprobacion[] = "Contraseña incorrecta.";
            }

            // Comprobar que la nueva contraseña no sea igual a la contraseña actual
            $passNuevaIngresada = md5($data['nuevaContrasena']); // se encrypta contraseña con MD5
            if ($passGuardada[0] == $passNuevaIngresada) {
                // Si la nueva contraseña es igual a la anterior
                $comprobacion[] = "La nueva contraseña debe ser diferente a la actual.";
            }

            // Confirmar nueva contraseña
            if ($data['nuevaContrasena'] != $data['confirmarContrasena']) {
                // Si la comprobacion falla enviar mensaje de error
                $comprobacion[] = "Error al confirmar la nueva contraseña, vuelva a intentarlo.";
            }

            // Si existe duplicados retorna mensajes
            if ($comprobacion) {
                return $comprobacion;
            }

            // Actualiza contraseña
            $sql = "UPDATE usuario
                    SET clave=:nuevaContrasena
                    WHERE id_funcionario_fk=:id_funcionario AND clave=:actualContrasena";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
            $passActualMD5 = md5($data['actualContrasena']); // se encrypta contraseña actual con MD5
            $declaracion->bindParam(':actualContrasena', $passActualMD5);
            $passNuevaMD5 = md5($data['nuevaContrasena']); // se encrypta contraseña nueva con MD5
            $declaracion->bindParam(':nuevaContrasena', $passNuevaMD5);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
