<?php
require '../config/connection.php';

class Contrato extends Connection
{
    public static function mostrarContratos($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT *
                    FROM contrato
                    WHERE contrato.estado != 'anulado'
                    ORDER BY id_contrato DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['detalle']) && isset($item['tipo'])) {
                    $resultado[$i]['detalle'] = ucfirst($item['detalle']);
                    $resultado[$i]['tipo'] = ucfirst($item['tipo']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM contrato WHERE contrato.estado != 'anulado'";
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
    public static function busquedaContrato($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT *
                    FROM contrato
                    WHERE detalle ILIKE '%$busqueda%' AND estado != 'anulado'
                    ORDER BY id_contrato DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['detalle']) && isset($item['tipo'])) {
                    $resultado[$i]['detalle'] = ucfirst($item['detalle']);
                    $resultado[$i]['tipo'] = ucfirst($item['tipo']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM contrato 
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
    public static function selectContrato()
    {
        try {
            $sql = "SELECT * FROM contrato 
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
    public static function obtenerContrato($id_contrato)
    {
        try {
            $sql = 'SELECT * FROM contrato WHERE id_contrato=:id_contrato';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_contrato', $id_contrato);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            if (isset($resultado['detalle']) && isset($resultado['tipo'])) {
                $resultado['detalle'] = ucfirst($resultado['detalle']);
                $resultado['tipo'] = ucfirst($resultado['tipo']);
            }
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarContrato($data)
    {
        try {
            // Consulta que no existe un contrato (activo) igual
            $sql = 'SELECT detalle, estado
                    FROM contrato
                    WHERE detalle=:detalle AND estado=:estado';
            $compruebaContrato = Connection::getConnection()->prepare($sql);
            $compruebaContrato->bindParam(':detalle', $data['detalle']);
            $compruebaContrato->bindParam(':estado', $data['estado']);
            $compruebaContrato->execute();

            if ($compruebaContrato->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe un contrato activo con este nombre.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO contrato (detalle, tipo, estado) VALUES (:detalle, :tipo, :estado)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':tipo', $data['tipo']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarContrato($data)
    {
        try {
            // Consulta que no existe un contrato (activo) igual
            $sql = "SELECT detalle, tipo, estado 
                    FROM contrato
                    WHERE id_contrato!=:id_contrato 
                    AND detalle=:detalle AND tipo=:tipo AND estado=:estado";
            $compruebaContrato = Connection::getConnection()->prepare($sql);
            $compruebaContrato->bindParam(':id_contrato', $data['id_contrato']);
            $compruebaContrato->bindParam(':detalle', $data['detalle']);
            $compruebaContrato->bindParam(':tipo', $data['tipo']);
            $compruebaContrato->bindParam(':estado', $data['estado']);
            $compruebaContrato->execute();
            
            if ($compruebaContrato->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe un contrato activo igual a este.";
                return $comprobacion;
            }

            $sql = 'UPDATE contrato 
                    SET detalle=:detalle, tipo=:tipo, estado=:estado 
                    WHERE id_contrato=:id_contrato';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_contrato', $data['id_contrato']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':tipo', $data['tipo']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarContrato($data)
    {
        try {
            $sql = "UPDATE contrato SET estado=:estado
            WHERE id_contrato=:id_contrato
            AND (
                id_contrato NOT IN (SELECT id_contrato_fk FROM funcionario_estructura)
                OR EXISTS ( SELECT 1 FROM funcionario_estructura WHERE id_contrato_fk=:id_contrato AND estado != 'activo' )
            )";

            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_contrato', $data['id_contrato']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataContrato = Contrato::obtenerContrato($data['id_contrato']);
            return $dataContrato;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
