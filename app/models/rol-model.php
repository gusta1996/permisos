<?php
require '../config/connection.php';

class Rol extends Connection {
    public static function mostrarRoles() {
        try {
            $sql = 'SELECT * FROM rol ORDER BY id_rol ASC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerRol($id_rol) {
        try {
            $sql = 'SELECT * FROM rol WHERE id_rol=:id_rol';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_rol', $id_rol);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarRol($data) {
        try {
            $sql = 'INSERT INTO rol (detalle, estado) VALUES (:detalle, :estado)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarRol($data) {
        try {
            $sql = 'UPDATE rol SET detalle=:detalle, estado=:estado WHERE id_rol=:id_rol';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_rol', $data['id_rol']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarRol($data) {
        try {
            $sql = "UPDATE rol SET estado=:estado
            WHERE id_rol=:id_rol
            AND (
                id_rol NOT IN (SELECT id_rol_fk FROM estructura)
                OR EXISTS ( SELECT 1 FROM estructura WHERE id_rol_fk=:id_rol AND estado = 'Anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_rol', $data['id_rol']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataRol = Rol::obtenerRol($data['id_rol']);
            return $dataRol;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}