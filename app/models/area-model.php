<?php
require '../config/connection.php';

class Area extends Connection
{
    public static function mostrarAreas($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT area.id_area, area.detalle AS area_detalle, area.estado AS area_estado, 
                            categoria.detalle AS categoria_detalle, categoria.estado AS categoria_estado
                    FROM area
                    INNER JOIN categoria ON area.id_categoria_fk = categoria.id_categoria
                    WHERE area.estado != 'anulado'
                    ORDER BY id_area DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['area_detalle']) && isset($item['categoria_detalle'])) {
                    $resultado[$i]['area_detalle'] = ucfirst($item['area_detalle']);
                    $resultado[$i]['categoria_detalle'] = ucfirst($item['categoria_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM area WHERE area.estado != 'anulado'";
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
    public static function busquedaArea($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT area.id_area, area.detalle AS area_detalle, area.estado AS area_estado, 
                            categoria.detalle AS categoria_detalle, categoria.estado AS categoria_estado
                    FROM area
                    INNER JOIN categoria ON area.id_categoria_fk = categoria.id_categoria
                    WHERE area.detalle ILIKE '%$busqueda%' AND area.estado != 'anulado'
                    ORDER BY area.id_area DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['area_detalle']) && isset($item['categoria_detalle'])) {
                    $resultado[$i]['area_detalle'] = ucfirst($item['area_detalle']);
                    $resultado[$i]['categoria_detalle'] = ucfirst($item['categoria_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM area 
                        WHERE area.detalle ILIKE '%$busqueda%' AND area.estado != 'anulado'";
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
    public static function selectArea()
    {
        try {
            $sql = "SELECT * FROM area 
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
    public static function obtenerArea($id_area)
    {
        try {
            $sql = 'SELECT * FROM area WHERE id_area=:id_area';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_area', $id_area);
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
    public static function guardarArea($data)
    {
        try {
            // Consulta que no existe un area (activo) igual
            $sql = 'SELECT detalle, estado
                    FROM area
                    WHERE detalle=:detalle AND estado=:estado';
            $compruebaArea = Connection::getConnection()->prepare($sql);
            $compruebaArea->bindParam(':detalle', $data['detalle']);
            $compruebaArea->bindParam(':estado', $data['estado']);
            $compruebaArea->execute();

            if ($compruebaArea->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe un area activo con este nombre.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO area (detalle, estado, id_categoria_fk) VALUES (:detalle, :estado, :categoria)';
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
    public static function actualizarArea($data)
    {
        try {
            // Consulta que no existe un area (activo) igual
            $sql = "SELECT detalle, estado , id_categoria_fk
                    FROM area
                    WHERE id_area!=:id_area 
                    AND detalle=:detalle AND id_categoria_fk=:categoria AND estado=:estado";
            $compruebaArea = Connection::getConnection()->prepare($sql);
            $compruebaArea->bindParam(':id_area', $data['id_area']);
            $compruebaArea->bindParam(':detalle', $data['detalle']);
            $compruebaArea->bindParam(':estado', $data['estado']);
            $compruebaArea->bindParam(':categoria', $data['categoria']);
            $compruebaArea->execute();
            
            if ($compruebaArea->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una area activa igual a esta.";
                return $comprobacion;
            }

            $sql = 'UPDATE area SET detalle=:detalle, estado=:estado, id_categoria_fk=:categoria
                    WHERE id_area=:id_area';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_area', $data['id_area']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':categoria', $data['categoria']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarArea($data)
    {
        try {
            $sql = "UPDATE area SET estado=:estado
            WHERE id_area=:id_area
            AND (
                id_area NOT IN (SELECT id_area_fk FROM departamento)
                OR EXISTS ( SELECT 1 FROM departamento WHERE id_area_fk=:id_area AND estado = 'anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_area', $data['id_area']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataArea = Area::obtenerArea($data['id_area']);
            return $dataArea;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
