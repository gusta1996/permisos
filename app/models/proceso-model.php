<?php
require '../config/connection.php';

class Proceso extends Connection
{
    public static function mostrarProcesos($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT *
                    FROM proceso
                    WHERE proceso.estado != 'anulado'
                    ORDER BY id_proceso DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['detalle'])) {
                    $resultado[$i]['detalle'] = ucfirst($item['detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM proceso WHERE proceso.estado != 'anulado'";
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
    public static function busquedaProceso($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT *
                    FROM proceso
                    WHERE detalle ILIKE '%$busqueda%' AND estado != 'anulado'
                    ORDER BY id_proceso DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['detalle'])) {
                    $resultado[$i]['detalle'] = ucfirst($item['detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM proceso 
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
    public static function selectProceso()
    {
        try {
            $sql = "SELECT * FROM proceso 
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
    public static function obtenerProceso($id_proceso)
    {
        try {
            $sql = 'SELECT * FROM proceso WHERE id_proceso=:id_proceso';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_proceso', $id_proceso);
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
    public static function guardarProceso($data)
    {
        try {
            // Consulta que no existe un proceso (activo) igual
            $sql = 'SELECT detalle, estado
                    FROM proceso
                    WHERE detalle=:detalle AND estado=:estado';
            $compruebaProceso = Connection::getConnection()->prepare($sql);
            $compruebaProceso->bindParam(':detalle', $data['detalle']);
            $compruebaProceso->bindParam(':estado', $data['estado']);
            $compruebaProceso->execute();

            if ($compruebaProceso->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una proceso activa con este nombre.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO proceso (detalle, estado) VALUES (:detalle, :estado)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarProceso($data)
    {
        try {
            // Consulta que no existe una proceso (activo) igual
            $sql = "SELECT detalle, estado 
                    FROM proceso
                    WHERE id_proceso!=:id_proceso 
                    AND detalle=:detalle AND estado=:estado";
            $compruebaProceso = Connection::getConnection()->prepare($sql);
            $compruebaProceso->bindParam(':id_proceso', $data['id_proceso']);
            $compruebaProceso->bindParam(':detalle', $data['detalle']);
            $compruebaProceso->bindParam(':estado', $data['estado']);
            $compruebaProceso->execute();
            
            if ($compruebaProceso->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una proceso activa igual a esta.";
                return $comprobacion;
            }

            $sql = 'UPDATE proceso SET detalle=:detalle, estado=:estado 
                    WHERE id_proceso=:id_proceso';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_proceso', $data['id_proceso']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarProceso($data)
    {
        try {
            $sql = "UPDATE proceso SET estado=:estado
            WHERE id_proceso=:id_proceso
            AND (
                id_proceso NOT IN (SELECT id_proceso_fk FROM direccion)
                OR EXISTS ( SELECT 1 FROM direccion WHERE id_proceso_fk=:id_proceso AND estado = 'anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_proceso', $data['id_proceso']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataProceso = Proceso::obtenerProceso($data['id_proceso']);
            return $dataProceso;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
}
