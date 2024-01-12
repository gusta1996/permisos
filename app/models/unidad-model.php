<?php
require '../config/connection.php';

class Unidad extends Connection
{
    public static function mostrarUnidades($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT unidad.id_unidad, unidad.detalle AS unidad_detalle, unidad.estado AS unidad_estado, 
                            direccion.detalle AS direccion_detalle, direccion.estado AS direccion_estado
                    FROM unidad
                    INNER JOIN direccion ON unidad.id_direccion_fk = direccion.id_direccion
                    WHERE unidad.estado != 'anulado'
                    ORDER BY id_unidad DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['unidad_detalle']) && isset($item['direccion_detalle'])) {
                    $resultado[$i]['unidad_detalle'] = ucfirst($item['unidad_detalle']);
                    $resultado[$i]['direccion_detalle'] = ucfirst($item['direccion_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM unidad WHERE unidad.estado != 'anulado'";
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
    public static function busquedaUnidad($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT unidad.id_unidad, unidad.detalle AS unidad_detalle, unidad.estado AS unidad_estado, 
                            direccion.detalle AS direccion_detalle, direccion.estado AS direccion_estado
                    FROM unidad
                    INNER JOIN direccion ON unidad.id_direccion_fk = direccion.id_direccion
                    WHERE unidad.detalle ILIKE '%$busqueda%' AND unidad.estado != 'anulado'
                    ORDER BY id_unidad DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            foreach ($resultado as $i => $item) {
                if (isset($item['unidad_detalle']) && isset($item['direccion_detalle'])) {
                    $resultado[$i]['unidad_detalle'] = ucfirst($item['unidad_detalle']);
                    $resultado[$i]['direccion_detalle'] = ucfirst($item['direccion_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM unidad 
                        WHERE unidad.detalle ILIKE '%$busqueda%' AND unidad.estado != 'anulado'";
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
    public static function selectUnidadIdDireccion($id_direccion)
    {
        try {
            $sql = "SELECT * FROM unidad
                    WHERE id_direccion_fk=:id_direccion AND estado = 'activo'
                    ORDER BY detalle ASC";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_direccion', $id_direccion);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['detalle'])) {
                    $resultado[$i]['detalle'] = ucfirst($item['detalle']);
                }
            }
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function selectUnidad()
    {
        try {
            $sql = "SELECT * FROM unidad 
                    WHERE estado = 'activo'
                    ORDER BY detalle ASC";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['detalle'])) {
                    $resultado[$i]['detalle'] = ucfirst($item['detalle']);
                }
            }
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerUnidad($id_unidad)
    {
        try {
            $sql = 'SELECT * FROM unidad WHERE id_unidad=:id_unidad';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_unidad', $id_unidad);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            if (isset($resultado['detalle'])) {
                $resultado['detalle'] = ucfirst($resultado['detalle']);
            }
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarUnidad($data)
    {
        try {
            // Consulta que no existe un unidad (activo) igual
            $sql = 'SELECT detalle, estado
                    FROM unidad
                    WHERE detalle=:detalle AND estado=:estado';
            $compruebaUnidad = Connection::getConnection()->prepare($sql);
            $compruebaUnidad->bindParam(':detalle', $data['detalle']);
            $compruebaUnidad->bindParam(':estado', $data['estado']);
            $compruebaUnidad->execute();

            if ($compruebaUnidad->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe un unidad activo con este nombre.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO unidad (detalle, estado, id_direccion_fk) VALUES (:detalle, :estado, :direccion)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':direccion', $data['direccion']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarUnidad($data)
    {
        try {
            // Consulta que no existe un unidad (activo) igual
            $sql = "SELECT detalle, estado, id_direccion_fk 
                    FROM unidad
                    WHERE id_unidad!=:id_unidad 
                    AND detalle=:detalle AND id_direccion_fk=:direccion AND estado=:estado";
            $compruebaUnidad = Connection::getConnection()->prepare($sql);
            $compruebaUnidad->bindParam(':id_unidad', $data['id_unidad']);
            $compruebaUnidad->bindParam(':detalle', $data['detalle']);
            $compruebaUnidad->bindParam(':estado', $data['estado']);
            $compruebaUnidad->bindParam(':direccion', $data['direccion']);
            $compruebaUnidad->execute();
            
            if ($compruebaUnidad->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe un unidad activo igual a este.";
                return $comprobacion;
            }

            $sql = 'UPDATE unidad SET detalle=:detalle, estado=:estado, id_direccion_fk=:direccion 
                    WHERE id_unidad=:id_unidad';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_unidad', $data['id_unidad']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':direccion', $data['direccion']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarUnidad($data)
    {
        try {
            $sql = "UPDATE unidad SET estado=:estado
            WHERE id_unidad=:id_unidad
            AND (
                id_unidad NOT IN (SELECT id_unidad_fk FROM seccion)
                OR EXISTS ( SELECT 1 FROM seccion WHERE id_unidad_fk=:id_unidad AND estado = 'anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_unidad', $data['id_unidad']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataUnidad = Unidad::obtenerUnidad($data['id_unidad']);
            return $dataUnidad;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
