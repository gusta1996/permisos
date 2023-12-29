<?php
require '../config/connection.php';

class Seccion extends Connection
{
    public static function mostrarSecciones($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT seccion.id_seccion, seccion.detalle AS seccion_detalle, seccion.estado AS seccion_estado, 
                            departamento.detalle AS departamento_detalle, departamento.estado AS departamento_estado
                    FROM seccion
                    INNER JOIN departamento ON seccion.id_departamento_fk = departamento.id_departamento
                    WHERE seccion.estado != 'anulado'
                    ORDER BY id_seccion DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM seccion WHERE seccion.estado != 'anulado'";
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
    public static function busquedaSeccion($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT seccion.id_seccion, seccion.detalle AS seccion_detalle, seccion.estado AS seccion_estado, 
                            departamento.detalle AS departamento_detalle, departamento.estado AS departamento_estado
                    FROM seccion
                    INNER JOIN departamento ON seccion.id_departamento_fk = departamento.id_departamento
                    WHERE seccion.detalle ILIKE '%$busqueda%' AND seccion.estado != 'anulado'
                    ORDER BY id_seccion DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM seccion 
                        WHERE seccion.detalle ILIKE '%$busqueda%' AND seccion.estado != 'anulado'";
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
    public static function selectSeccion()
    {
        try {
            $sql = 'SELECT * FROM seccion 
                    ORDER BY detalle ASC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerSeccion($id_seccion)
    {
        try {
            $sql = 'SELECT * FROM seccion WHERE id_seccion=:id_seccion';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_seccion', $id_seccion);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarSeccion($data)
    {
        try {
            // Consulta que no existe un seccion (activo) igual
            $sql = 'SELECT detalle, estado
                    FROM seccion
                    WHERE detalle=:detalle AND estado=:estado';
            $compruebaSeccion = Connection::getConnection()->prepare($sql);
            $compruebaSeccion->bindParam(':detalle', $data['detalle']);
            $compruebaSeccion->bindParam(':estado', $data['estado']);
            $compruebaSeccion->execute();

            if ($compruebaSeccion->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una sección activo con este nombre.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO seccion (detalle, estado, id_departamento_fk) VALUES (:detalle, :estado, :departamento)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':departamento', $data['departamento']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarSeccion($data)
    {
        try {
            $sql = 'UPDATE seccion SET detalle=:detalle, estado=:estado, id_departamento_fk=:departamento 
                    WHERE id_seccion=:id_seccion';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_seccion', $data['id_seccion']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':departamento', $data['departamento']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarSeccion($data)
    {
        try {
            $sql = "UPDATE seccion SET estado=:estado
            WHERE id_seccion=:id_seccion
            AND (
                id_seccion NOT IN (SELECT id_seccion_fk FROM cargo)
                OR EXISTS ( SELECT 1 FROM cargo WHERE id_seccion_fk=:id_seccion AND estado = 'anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_seccion', $data['id_seccion']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataSeccion = Seccion::obtenerSeccion($data['id_seccion']);
            return $dataSeccion;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
