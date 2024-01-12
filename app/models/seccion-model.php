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
                            unidad.detalle AS unidad_detalle, unidad.estado AS unidad_estado
                    FROM seccion
                    INNER JOIN unidad ON seccion.id_unidad_fk = unidad.id_unidad
                    WHERE seccion.estado != 'anulado'
                    ORDER BY id_seccion DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['seccion_detalle']) && isset($item['unidad_detalle'])) {
                    $resultado[$i]['seccion_detalle'] = ucfirst($item['seccion_detalle']);
                    $resultado[$i]['unidad_detalle'] = ucfirst($item['unidad_detalle']);
                }
            }
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
                            unidad.detalle AS unidad_detalle, unidad.estado AS unidad_estado
                    FROM seccion
                    INNER JOIN unidad ON seccion.id_unidad_fk = unidad.id_unidad
                    WHERE seccion.detalle ILIKE '%$busqueda%' AND seccion.estado != 'anulado'
                    ORDER BY id_seccion DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['seccion_detalle']) && isset($item['unidad_detalle'])) {
                    $resultado[$i]['seccion_detalle'] = ucfirst($item['seccion_detalle']);
                    $resultado[$i]['unidad_detalle'] = ucfirst($item['unidad_detalle']);
                }
            }
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
    public static function selectSeccionIdUnidad($id_unidad)
    {
        try {
            $sql = "SELECT * FROM seccion
                    WHERE id_unidad_fk=:id_unidad AND estado = 'activo'
                    ORDER BY detalle ASC";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_unidad', $id_unidad);
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
    public static function selectSeccion()
    {
        try {
            $sql = "SELECT * FROM seccion 
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
    public static function obtenerSeccion($id_seccion)
    {
        try {
            $sql = 'SELECT * FROM seccion WHERE id_seccion=:id_seccion';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_seccion', $id_seccion);
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

            $sql = 'INSERT INTO seccion (detalle, estado, id_unidad_fk) VALUES (:detalle, :estado, :unidad)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':unidad', $data['unidad']);
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
            // Consulta que no existe una seccion (activo) igual
            $sql = "SELECT detalle, estado, id_unidad_fk 
                    FROM seccion
                    WHERE id_seccion!=:id_seccion 
                    AND detalle=:detalle AND id_unidad_fk=:unidad AND estado=:estado";
            $compruebaSeccion = Connection::getConnection()->prepare($sql);
            $compruebaSeccion->bindParam(':id_seccion', $data['id_seccion']);
            $compruebaSeccion->bindParam(':detalle', $data['detalle']);
            $compruebaSeccion->bindParam(':estado', $data['estado']);
            $compruebaSeccion->bindParam(':unidad', $data['unidad']);
            $compruebaSeccion->execute();
            
            if ($compruebaSeccion->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una seccion activa igual a esta.";
                return $comprobacion;
            }

            $sql = 'UPDATE seccion 
                    SET detalle=:detalle, estado=:estado, id_unidad_fk=:unidad 
                    WHERE id_seccion=:id_seccion';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_seccion', $data['id_seccion']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':unidad', $data['unidad']);
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
