<?php
require '../config/connection.php';

class rolPermisos extends Connection
{
    public static function guardarRolPermisos($data)
    {
        try {
            $conn = new PDO("pgsql:host=localhost;dbname=permisos", "postgres", "Gusta_1996");
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Comenzar una transacción
            $conn->beginTransaction();

            // Declarar las variables
            $obt_id_permisos = null;
            $obt_id_rol = null;

            // Inserta rol
            $declaracion = $conn->prepare("INSERT INTO rol (detalle, estado) 
            VALUES (:rolDetalle, :rolEstado) RETURNING id_rol");
            $declaracion->bindParam(':rolDetalle', $data['rolDetalle']);
            $declaracion->bindParam(':rolEstado', $data['rolEstado']);
            $declaracion->execute();
            $obt_id_rol = $declaracion->fetchColumn();

            // prueba
            if (isset($data['emisionDeReportes'])) {
                // Inserta permisos
                $declaracion = $conn->prepare("INSERT INTO permisos (estado, id_modulo_fk, id_actividad_fk) 
                VALUES (:permisosEstado, :id_modulo, :id_actividad) RETURNING id_permisos");
                $declaracion->bindParam(':permisosEstado', $data['permisosEstado']);
                $declaracion->bindParam(':id_modulo', $data['reporteGeneral']);
                $declaracion->bindParam(':id_actividad', $data['emisionDeReportes']);
                $declaracion->execute();
                $obt_id_permisos = $declaracion->fetchColumn();

                // Inserta rol_permiso
                $declaracion = $conn->prepare("INSERT INTO rol_permisos (id_rol_fk, id_permisos_fk, estado) 
                VALUES (:id_rol, :id_permisos, :rol_permisosEstado)");
                $declaracion->bindParam(':id_rol', $obt_id_rol);
                $declaracion->bindParam(':id_permisos', $obt_id_permisos);
                $declaracion->bindParam(':rol_permisosEstado', $data['rol_permisosEstado']);
                $declaracion->execute();
            }


            // Confirmar la transacción
            $conn->commit();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function permisoModulo()
    {
        try {
            $sql = 'SELECT * FROM modulo ORDER BY detalle ASC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function permisoActividad($id_modulo)
    {
        try {
            $sql = 'SELECT permisos.id_permiso, permisos.estado,
                            actividad.id_actividad, actividad.detalle AS detalle_actividad
                    FROM permisos 
                    INNER JOIN actividad ON permisos.id_actividad_fk = actividad.id_actividad
                    WHERE id_modulo_fk=:id_modulo';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_modulo', $id_modulo);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerPermisos()
    {
        try {
            $sql = 'SELECT * FROM rol_permisos ORDER BY id_rol_permisos DESC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    /*
    public static function mostrarRolPermisos() {
        try {
            $sql = 'SELECT * FROM rol_permisos ORDER BY id_rol_permisos DESC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    */
}
