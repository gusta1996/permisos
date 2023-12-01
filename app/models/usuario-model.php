<?php
require '../config/connection.php';

class usuario extends Connection
{
    public static function obtenerRolUsuario( $id_funcionario )
    {
        try {
            $sql = 'SELECT rol.detalle AS rol
                    FROM usuario
                    INNER JOIN rol ON usuario.id_rol_fk = rol.id_rol
                    WHERE usuario.id_funcionario_fk=:id_funcionario';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $id_funcionario);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
