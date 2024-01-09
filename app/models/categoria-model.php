<?php
require '../config/connection.php';

class Categoria extends Connection
{
    public static function mostrarCategorias($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT *
                    FROM categoria
                    WHERE categoria.estado != 'anulado'
                    ORDER BY id_categoria DESC
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
            $sqlTotal = "SELECT COUNT(*) FROM categoria WHERE categoria.estado != 'anulado'";
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
    public static function busquedaCategoria($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT *
                    FROM categoria
                    WHERE detalle ILIKE '%$busqueda%' AND estado != 'anulado'
                    ORDER BY id_categoria DESC
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
            $sqlTotal = "SELECT COUNT(*) FROM categoria 
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
    public static function selectCategoria()
    {
        try {
            $sql = "SELECT * FROM categoria 
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
    public static function obtenerCategoria($id_categoria)
    {
        try {
            $sql = 'SELECT * FROM categoria WHERE id_categoria=:id_categoria';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_categoria', $id_categoria);
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
    public static function guardarCategoria($data)
    {
        try {
            // Consulta que no existe un categoria (activo) igual
            $sql = 'SELECT detalle, estado
                    FROM categoria
                    WHERE detalle=:detalle AND estado=:estado';
            $compruebaCategoria = Connection::getConnection()->prepare($sql);
            $compruebaCategoria->bindParam(':detalle', $data['detalle']);
            $compruebaCategoria->bindParam(':estado', $data['estado']);
            $compruebaCategoria->execute();

            if ($compruebaCategoria->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una categoria activa con este nombre.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO categoria (detalle, estado) VALUES (:detalle, :estado)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarCategoria($data)
    {
        try {
            // Consulta que no existe una categoria (activo) igual
            $sql = "SELECT detalle, estado 
                    FROM categoria
                    WHERE id_categoria!=:id_categoria 
                    AND detalle=:detalle AND estado=:estado";
            $compruebaCategoria = Connection::getConnection()->prepare($sql);
            $compruebaCategoria->bindParam(':id_categoria', $data['id_categoria']);
            $compruebaCategoria->bindParam(':detalle', $data['detalle']);
            $compruebaCategoria->bindParam(':estado', $data['estado']);
            $compruebaCategoria->execute();
            
            if ($compruebaCategoria->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una categoria activa igual a esta.";
                return $comprobacion;
            }

            $sql = 'UPDATE categoria SET detalle=:detalle, estado=:estado 
                    WHERE id_categoria=:id_categoria';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_categoria', $data['id_categoria']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarCategoria($data)
    {
        try {
            $sql = "UPDATE categoria SET estado=:estado
            WHERE id_categoria=:id_categoria
            AND (
                id_categoria NOT IN (SELECT id_categoria_fk FROM area)
                OR EXISTS ( SELECT 1 FROM area WHERE id_categoria_fk=:id_categoria AND estado = 'anulado' )
            )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_categoria', $data['id_categoria']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataCategoria = Categoria::obtenerCategoria($data['id_categoria']);
            return $dataCategoria;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
}
