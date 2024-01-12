<?php
require '../config/connection.php';

class Direccion extends Connection
{
    public static function mostrarDirecciones($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT direccion.id_direccion, direccion.detalle AS direccion_detalle, direccion.estado AS direccion_estado, 
                            proceso.detalle AS proceso_detalle, proceso.estado AS proceso_estado
                    FROM direccion
                    INNER JOIN proceso ON direccion.id_proceso_fk = proceso.id_proceso
                    WHERE direccion.estado != 'anulado'
                    ORDER BY id_direccion DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['direccion_detalle']) && isset($item['proceso_detalle'])) {
                    $resultado[$i]['direccion_detalle'] = ucfirst($item['direccion_detalle']);
                    $resultado[$i]['proceso_detalle'] = ucfirst($item['proceso_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM direccion WHERE direccion.estado != 'anulado'";
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
    public static function busquedaDireccion($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT direccion.id_direccion, direccion.detalle AS direccion_detalle, direccion.estado AS direccion_estado, 
                            proceso.detalle AS proceso_detalle, proceso.estado AS proceso_estado
                    FROM direccion
                    INNER JOIN proceso ON direccion.id_proceso_fk = proceso.id_proceso
                    WHERE direccion.detalle ILIKE '%$busqueda%' AND direccion.estado != 'anulado'
                    ORDER BY direccion.id_direccion DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['direccion_detalle']) && isset($item['proceso_detalle'])) {
                    $resultado[$i]['direccion_detalle'] = ucfirst($item['direccion_detalle']);
                    $resultado[$i]['proceso_detalle'] = ucfirst($item['proceso_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM direccion 
                        WHERE direccion.detalle ILIKE '%$busqueda%' AND direccion.estado != 'anulado'";
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
    public static function selectDireccion()
    {
        try {
            $sql = "SELECT * FROM direccion 
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
    public static function obtenerDireccion($id_direccion)
    {
        try {
            $sql = 'SELECT * FROM direccion WHERE id_direccion=:id_direccion';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_direccion', $id_direccion);
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
    public static function guardarDireccion($data)
    {
        try {
            // Consulta que no existe un direccion (activo) igual
            $sql = 'SELECT detalle, estado
                    FROM direccion
                    WHERE detalle=:detalle AND estado=:estado';
            $compruebaDireccion = Connection::getConnection()->prepare($sql);
            $compruebaDireccion->bindParam(':detalle', $data['detalle']);
            $compruebaDireccion->bindParam(':estado', $data['estado']);
            $compruebaDireccion->execute();

            if ($compruebaDireccion->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe un direccion activo con este nombre.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO direccion (detalle, estado, id_proceso_fk) VALUES (:detalle, :estado, :proceso)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':proceso', $data['proceso']);
            $declaracion->execute();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarDireccion($data)
    {
        try {
            // Consulta que no existe un direccion (activo) igual
            $sql = "SELECT detalle, estado , id_proceso_fk
                    FROM direccion
                    WHERE id_direccion!=:id_direccion 
                    AND detalle=:detalle AND id_proceso_fk=:proceso AND estado=:estado";
            $compruebaDireccion = Connection::getConnection()->prepare($sql);
            $compruebaDireccion->bindParam(':id_direccion', $data['id_direccion']);
            $compruebaDireccion->bindParam(':detalle', $data['detalle']);
            $compruebaDireccion->bindParam(':estado', $data['estado']);
            $compruebaDireccion->bindParam(':proceso', $data['proceso']);
            $compruebaDireccion->execute();
            
            if ($compruebaDireccion->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una direccion activa igual a esta.";
                return $comprobacion;
            }

            $sql = 'UPDATE direccion SET detalle=:detalle, estado=:estado, id_proceso_fk=:proceso
                    WHERE id_direccion=:id_direccion';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_direccion', $data['id_direccion']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':proceso', $data['proceso']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarDireccion($data)
    {
        try {
            $sql = "UPDATE direccion SET estado=:estado
            WHERE id_direccion=:id_direccion
            AND (
                id_direccion NOT IN (SELECT id_direccion_fk FROM unidad)
                OR EXISTS ( SELECT 1 FROM unidad WHERE id_direccion_fk=:id_direccion AND estado = 'anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_direccion', $data['id_direccion']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataDireccion = Direccion::obtenerDireccion($data['id_direccion']);
            return $dataDireccion;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
