<?php
require '../config/connection.php';

class Cargo extends Connection
{
    public static function mostrarCargos($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT *
                    FROM cargo
                    ORDER BY id_cargo DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM cargo";
            $declaracion = Connection::getConnection()->prepare($sqlTotal);
            $declaracion->execute();
            $totalRegistros = $declaracion->fetchColumn();

            $totalPaginas = ceil($totalRegistros / $limit); // Redondea hacia arriba para obtener el número total de páginas
            return array(
                'resultado' => $resultado,
                'totalPaginas' => $totalPaginas
            );
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function busquedaCargo($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT *
                    FROM cargo
                    WHERE detalle ILIKE '%$busqueda%'
                    ORDER BY id_cargo DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM cargo 
                        WHERE detalle ILIKE '%$busqueda%'";
            $declaracion = Connection::getConnection()->prepare($sqlTotal);
            $declaracion->execute();
            $totalRegistros = $declaracion->fetchColumn();

            $totalPaginas = ceil($totalRegistros / $limit); // Redondea hacia arriba para obtener el número total de páginas
            return array(
                'resultado' => $resultado,
                'totalPaginas' => $totalPaginas
            );
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function selectCargo()
    {
        try {
            $sql = 'SELECT * FROM cargo 
                    ORDER BY detalle ASC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerCargo($id_cargo)
    {
        try {
            $sql = 'SELECT * FROM cargo WHERE id_cargo=:id_cargo';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_cargo', $id_cargo);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarCargo($data)
    {
        try {
            $sql = 'INSERT INTO cargo (detalle, estado) VALUES (:detalle, :estado)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarCargo($data)
    {
        try {
            $sql = 'UPDATE cargo SET detalle=:detalle, estado=:estado WHERE id_cargo=:id_cargo';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_cargo', $data['id_cargo']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarCargo($data)
    {
        try {
            $sql = "UPDATE cargo SET estado=:estado
            WHERE id_cargo=:id_cargo
            AND (
                id_cargo NOT IN (SELECT id_cargo_fk FROM estructura)
                OR EXISTS ( SELECT 1 FROM estructura WHERE id_cargo_fk=:id_cargo AND estado = 'Anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_cargo', $data['id_cargo']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataCargo = Cargo::obtenerCargo($data['id_cargo']);
            return $dataCargo;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
