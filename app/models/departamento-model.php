<?php
require '../config/connection.php';

class Departamento extends Connection
{
    public static function mostrarDepartamentos($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT *
                    FROM departamento
                    WHERE departamento.estado != 'anulado'
                    ORDER BY id_departamento DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM departamento WHERE departamento.estado != 'anulado'";
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
    public static function busquedaDepartamento($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT *
                    FROM departamento
                    WHERE detalle ILIKE '%$busqueda%' AND estado != 'anulado'
                    ORDER BY id_departamento DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM departamento 
                        WHERE detalle ILIKE '%$busqueda%' AND estado != 'anulado'";
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
    public static function selectDepartamento()
    {
        try {
            $sql = 'SELECT * FROM departamento 
                    ORDER BY detalle ASC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerDepartamento($id_departamento)
    {
        try {
            $sql = 'SELECT * FROM departamento WHERE id_departamento=:id_departamento';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_departamento', $id_departamento);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarDepartamento($data)
    {
        try {
            // Consulta que no existe un departamento (activo) igual
            $sql = 'SELECT detalle, estado
                    FROM departamento
                    WHERE detalle=:detalle AND estado=:estado';
            $compruebaDepa = Connection::getConnection()->prepare($sql);
            $compruebaDepa->bindParam(':detalle', $data['detalle']);
            $compruebaDepa->bindParam(':estado', $data['estado']);
            $compruebaDepa->execute();

            if ($compruebaDepa->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe un departamento activo con este nombre.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO departamento (detalle, estado) VALUES (:detalle, :estado)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarDepartamento($data)
    {
        try {
            $sql = 'UPDATE departamento SET detalle=:detalle, estado=:estado WHERE id_departamento=:id_departamento';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_departamento', $data['id_departamento']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarDepartamento($data)
    {
        try {
            $sql = "UPDATE departamento SET estado=:estado
            WHERE id_departamento=:id_departamento
            AND (
                id_departamento NOT IN (SELECT id_departamento_fk FROM estructura)
                OR EXISTS ( SELECT 1 FROM estructura WHERE id_departamento_fk=:id_departamento AND estado = 'anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_departamento', $data['id_departamento']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataDepartamento = Departamento::obtenerDepartamento($data['id_departamento']);
            return $dataDepartamento;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
