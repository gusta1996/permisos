<?php
require '../config/connection.php';

class Estructura extends Connection
{
    public static function mostrarEstructuras($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT estructura.id_estructura, estructura.estado AS estruc_estado, 
                        cargo.detalle AS cargo_detalle, cargo.estado AS cargo_estado,
                        seccion.detalle AS seccion_detalle, seccion.estado AS seccion_estado,
                        unidad.detalle AS unidad_detalle, unidad.estado AS unidad_estado,
                        direccion.detalle AS direccion_detalle, direccion.estado AS direccion_estado
                    FROM estructura
                    INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                    INNER JOIN seccion ON estructura.id_seccion_fk = seccion.id_seccion
                    INNER JOIN unidad ON estructura.id_unidad_fk = unidad.id_unidad
                    INNER JOIN direccion ON estructura.id_direccion_fk = direccion.id_direccion
                    WHERE estructura.estado != 'anulado'
                    ORDER BY id_estructura DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['direccion_detalle']) && isset($item['unidad_detalle']) &&
                    isset($item['seccion_detalle']) && isset($item['cargo_detalle']) ) {
                    $resultado[$i]['direccion_detalle'] = ucwords($item['direccion_detalle']);
                    $resultado[$i]['unidad_detalle'] = ucwords($item['unidad_detalle']);
                    $resultado[$i]['seccion_detalle'] = ucwords($item['seccion_detalle']);
                    $resultado[$i]['cargo_detalle'] = ucwords($item['cargo_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM estructura WHERE estructura.estado != 'anulado'";
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
    public static function busquedaEstructura($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $tipoBusqueda = $data['tipo'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT estructura.id_estructura, estructura.estado AS estruc_estado, 
                cargo.detalle AS cargo_detalle, cargo.estado AS cargo_estado,
                seccion.detalle AS seccion_detalle, seccion.estado AS seccion_estado,
                unidad.detalle AS unidad_detalle, unidad.estado AS unidad_estado,
                direccion.detalle AS direccion_detalle, direccion.estado AS direccion_estado
            FROM estructura
            INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
            INNER JOIN seccion ON estructura.id_seccion_fk = seccion.id_seccion
            INNER JOIN unidad ON estructura.id_unidad_fk = unidad.id_unidad
            INNER JOIN direccion ON estructura.id_direccion_fk = direccion.id_direccion
            WHERE  $tipoBusqueda.detalle ILIKE '%$busqueda%' AND estructura.estado != 'anulado'
            ORDER BY id_estructura DESC
            LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['direccion_detalle']) && isset($item['unidad_detalle']) &&
                    isset($item['seccion_detalle']) && isset($item['cargo_detalle']) ) {
                    $resultado[$i]['direccion_detalle'] = ucwords($item['direccion_detalle']);
                    $resultado[$i]['unidad_detalle'] = ucwords($item['unidad_detalle']);
                    $resultado[$i]['seccion_detalle'] = ucwords($item['seccion_detalle']);
                    $resultado[$i]['cargo_detalle'] = ucwords($item['cargo_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) 
                        FROM estructura 
                        INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                        INNER JOIN seccion ON estructura.id_seccion_fk = seccion.id_seccion
                        INNER JOIN unidad ON estructura.id_unidad_fk = unidad.id_unidad
                        INNER JOIN direccion ON estructura.id_direccion_fk = direccion.id_direccion
                        WHERE $tipoBusqueda.detalle ILIKE '%$busqueda%' AND estructura.estado != 'anulado'";
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
    public static function selectEstructura()
    {
        try {
            $sql = "SELECT estructura.id_estructura, estructura.estado AS estruc_estado, 
                        cargo.detalle AS cargo_detalle, cargo.estado AS cargo_estado,
                        seccion.detalle AS seccion_detalle, seccion.estado AS seccion_estado,
                        unidad.detalle AS unidad_detalle, unidad.estado AS unidad_estado,
                        direccion.detalle AS direccion_detalle, direccion.estado AS direccion_estado
                    FROM estructura
                    INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                    INNER JOIN seccion ON estructura.id_seccion_fk = seccion.id_seccion
                    INNER JOIN unidad ON estructura.id_unidad_fk = unidad.id_unidad
                    INNER JOIN direccion ON estructura.id_direccion_fk = direccion.id_direccion
                    WHERE estructura.estado = 'activo'
                    ORDER BY cargo.detalle ASC";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['direccion_detalle']) && isset($item['unidad_detalle']) &&
                    isset($item['seccion_detalle']) && isset($item['cargo_detalle']) ) {
                    $resultado[$i]['direccion_detalle'] = ucwords($item['direccion_detalle']);
                    $resultado[$i]['unidad_detalle'] = ucwords($item['unidad_detalle']);
                    $resultado[$i]['seccion_detalle'] = ucwords($item['seccion_detalle']);
                    $resultado[$i]['cargo_detalle'] = ucwords($item['cargo_detalle']);
                }
            }
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerEstructura($id_estructura)
    {
        try {
            $sql = 'SELECT estructura.id_estructura, estructura.estado AS estructura_estado, 
                        estructura.id_direccion_fk, estructura.id_unidad_fk, estructura.id_seccion_fk, estructura.id_cargo_fk, 
                        direccion.estado AS direccion_estado,
                        unidad.estado AS unidad_estado,
                        seccion.estado AS seccion_estado,
                        cargo.estado AS cargo_estado
                    FROM estructura 
                    INNER JOIN direccion on estructura.id_direccion_fk = direccion.id_direccion
                    INNER JOIN unidad ON estructura.id_unidad_fk = unidad.id_unidad
                    INNER JOIN seccion ON estructura.id_seccion_fk = seccion.id_seccion
                    INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                    WHERE id_estructura=:id_estructura';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_estructura', $id_estructura);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarEstructura($data)
    {
        try {
            // Consulta que no existe un estructura (activo) igual
            $sql = 'SELECT id_cargo_fk, id_seccion_fk, id_unidad_fk, id_direccion_fk, estado
                    FROM estructura
                    WHERE id_cargo_fk=:cargo AND id_seccion_fk=:seccion 
                    AND id_unidad_fk=:unidad AND id_direccion_fk=:direccion AND estado=:estado';
            $compruebaEstructura = Connection::getConnection()->prepare($sql);
            $compruebaEstructura->bindParam(':cargo', $data['cargo']);
            $compruebaEstructura->bindParam(':seccion', $data['seccion']);
            $compruebaEstructura->bindParam(':unidad', $data['unidad']);
            $compruebaEstructura->bindParam(':direccion', $data['direccion']);
            $compruebaEstructura->bindParam(':estado', $data['estado']);
            $compruebaEstructura->execute();

            if ($compruebaEstructura->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una estructura activa igual a esta.";
                return $comprobacion;
            }

            $sql = 'INSERT INTO estructura (id_cargo_fk, id_seccion_fk, id_unidad_fk, id_direccion_fk, estado)
                    VALUES (:cargo, :seccion, :unidad, :direccion, :estado)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':cargo', $data['cargo']);
            $declaracion->bindParam(':seccion', $data['seccion']);
            $declaracion->bindParam(':unidad', $data['unidad']);
            $declaracion->bindParam(':direccion', $data['direccion']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarEstructura($data)
    {
        try {
            // Consulta que no existe un estructura (activo) igual
            $sql = "SELECT id_cargo_fk, id_seccion_fk, id_unidad_fk, id_direccion_fk, estado
                    FROM estructura
                    WHERE id_estructura!=:id_estructura AND id_cargo_fk=:cargo AND id_seccion_fk=:seccion 
                    AND id_unidad_fk=:unidad AND id_direccion_fk=:direccion AND estado=:estado";
            $compruebaEstructura = Connection::getConnection()->prepare($sql);
            $compruebaEstructura->bindParam(':id_estructura', $data['id_estructura']);
            $compruebaEstructura->bindParam(':cargo', $data['cargo']);
            $compruebaEstructura->bindParam(':seccion', $data['seccion']);
            $compruebaEstructura->bindParam(':unidad', $data['unidad']);
            $compruebaEstructura->bindParam(':direccion', $data['direccion']);
            $compruebaEstructura->bindParam(':estado', $data['estado']);
            $compruebaEstructura->execute();

            if ($compruebaEstructura->rowCount() > 0) {
                // Si existe duplicados retorna mensajes
                $comprobacion = "Ya existe una estructura activa igual a esta.";
                return $comprobacion;
            }

            $sql = 'UPDATE estructura
                    SET id_cargo_fk=:cargo, id_seccion_fk=:seccion, id_unidad_fk=:unidad, id_direccion_fk=:direccion, estado=:estado
                    WHERE id_estructura=:id_estructura';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_estructura', $data['id_estructura']);
            $declaracion->bindParam(':cargo', $data['cargo']);
            $declaracion->bindParam(':seccion', $data['seccion']);
            $declaracion->bindParam(':unidad', $data['unidad']);
            $declaracion->bindParam(':direccion', $data['direccion']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarEstructura($data)
    {
        try {
            $sql = "UPDATE estructura SET estado=:estado
                    WHERE id_estructura=:id_estructura
                    AND (
                        id_estructura NOT IN (SELECT id_estructura_fk FROM funcionario_estructura)
                        OR EXISTS ( SELECT 1 FROM funcionario_estructura WHERE id_estructura_fk=:id_estructura AND estado = 'anulado' )
                    )";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_estructura', $data['id_estructura']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $dataEstructura = Estructura::obtenerEstructura($data['id_estructura']);
            return $dataEstructura;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
