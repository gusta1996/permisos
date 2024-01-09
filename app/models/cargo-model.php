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
            $sql = "SELECT cargo.id_cargo, cargo.detalle AS cargo_detalle, cargo.estado AS cargo_estado, 
                            seccion.detalle AS seccion_detalle, seccion.estado AS seccion_estado
                    FROM cargo
                    INNER JOIN seccion ON cargo.id_seccion_fk = seccion.id_seccion
                    WHERE cargo.estado != 'anulado'
                    ORDER BY id_cargo DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['cargo_detalle']) && isset($item['seccion_detalle'])) {
                    $resultado[$i]['cargo_detalle'] = ucfirst($item['cargo_detalle']);
                    $resultado[$i]['seccion_detalle'] = ucfirst($item['seccion_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM cargo WHERE cargo.estado != 'anulado'";
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
            $sql = "SELECT cargo.id_cargo, cargo.detalle AS cargo_detalle, cargo.estado AS cargo_estado, 
                            seccion.detalle AS seccion_detalle, seccion.estado AS seccion_estado
                    FROM cargo
                    INNER JOIN seccion ON cargo.id_seccion_fk = seccion.id_seccion
                    WHERE cargo.detalle ILIKE '%$busqueda%' AND cargo.estado != 'anulado'
                    ORDER BY id_cargo DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['cargo_detalle']) && isset($item['seccion_detalle'])) {
                    $resultado[$i]['cargo_detalle'] = ucfirst($item['cargo_detalle']);
                    $resultado[$i]['seccion_detalle'] = ucfirst($item['seccion_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM cargo 
                        WHERE cargo.detalle ILIKE '%$busqueda%' AND cargo.estado != 'anulado'";
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
    public static function selectCargoIdSeccion($id_seccion)
    {
        try {
            $sql = "SELECT * FROM cargo
                    WHERE id_seccion_fk=:id_seccion AND estado = 'activo'
                    ORDER BY detalle ASC";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_seccion', $id_seccion);
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
    public static function selectCargo()
    {
        try {
            $sql = "SELECT * FROM cargo 
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
    public static function obtenerCargo($id_cargo)
    {
        try {
            $sql = 'SELECT * FROM cargo WHERE id_cargo=:id_cargo';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_cargo', $id_cargo);
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
    public static function guardarCargo($data)
    {
        try {
            // Consulta que no existe un cargo (activo) igual
            $sql = 'SELECT detalle, estado
                    FROM cargo
                    WHERE detalle=:detalle AND estado=:estado';
            $compruebaCargo = Connection::getConnection()->prepare($sql);
            $compruebaCargo->bindParam(':detalle', $data['detalle']);
            $compruebaCargo->bindParam(':estado', $data['estado']);
            $compruebaCargo->execute();

            if ($compruebaCargo->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe un cargo activo con este nombre.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO cargo (detalle, estado, id_seccion_fk) VALUES (:detalle, :estado, :seccion)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':seccion', $data['seccion']);
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
            // Consulta que no existe un cargo (activo) igual
            $sql = "SELECT detalle, estado, id_seccion_fk 
                    FROM cargo
                    WHERE id_cargo!=:id_cargo 
                    AND detalle=:detalle AND id_seccion_fk=:seccion AND estado=:estado";
            $compruebaCargo = Connection::getConnection()->prepare($sql);
            $compruebaCargo->bindParam(':id_cargo', $data['id_cargo']);
            $compruebaCargo->bindParam(':detalle', $data['detalle']);
            $compruebaCargo->bindParam(':seccion', $data['seccion']);
            $compruebaCargo->bindParam(':estado', $data['estado']);
            $compruebaCargo->execute();
            
            if ($compruebaCargo->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe un cargo activo igual a este.";
                return $comprobacion;
            }

            $sql = 'UPDATE cargo 
                    SET detalle=:detalle, estado=:estado, id_seccion_fk=:seccion 
                    WHERE id_cargo=:id_cargo';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_cargo', $data['id_cargo']);
            $declaracion->bindParam(':detalle', $data['detalle']);
            $declaracion->bindParam(':seccion', $data['seccion']);
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
                    WHERE id_cargo=:id_cargo";
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
