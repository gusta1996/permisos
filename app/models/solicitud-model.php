<?php
require '../config/connection.php';

class Solicitud extends Connection {
    public static function mostrarSolicitudes() {
        try {
            $sql = 'SELECT solicitud.id_solicitud, solicitud.numero, solicitud.estado, solicitud.fecha,
                    tiempo.fecha_salida, tiempo.fecha_entrada, tiempo.hora_salida, tiempo.hora_entrada,
                    razon.descripcion
                    FROM solicitud
                    INNER JOIN tiempo ON solicitud.id_tiempo_fk = tiempo.id_tiempo
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    ORDER BY id_solicitud DESC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerSolicitud($id_solicitud) {
        try {
            $sql = 'SELECT * FROM solicitud WHERE id_solicitud=:id_solicitud';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_solicitud', $id_solicitud);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarSolicitud($data) {
        try {
            $sql = 'INSERT INTO solicitud (detalle, estado, id_categoria_fk) VALUES (:detalle, :estado, :categoria)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':categoria', $data['categoria']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarSolicitud($data) {
        try {
            $sql = 'UPDATE solicitud SET detalle=:detalle, estado=:estado, id_categoria_fk=:categoria
                    WHERE id_solicitud=:id_solicitud';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_solicitud', $data['id_solicitud']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':categoria', $data['categoria']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarSolicitud($data) {
        try {
            $sql = "UPDATE solicitud SET estado=:estado
            WHERE id_solicitud=:id_solicitud
            AND (
                id_solicitud NOT IN (SELECT id_solicitud_fk FROM estructura)
                OR EXISTS ( SELECT 1 FROM estructura WHERE id_solicitud_fk=:id_solicitud AND estado = 'anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_solicitud', $data['id_solicitud']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataSolicitud = Solicitud::obtenerSolicitud($data['id_solicitud']);
            return $dataSolicitud;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}