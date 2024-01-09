<?php
require '../config/connection.php';

class funcionarioEstructura extends Connection
{

    public static function mostrarFuncionarioEstructuras($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT funcionario_estructura.id_funcionario_estructura, funcionario_estructura.estado AS fe_estado,
                        funcionario.nombres, funcionario.apellidos, funcionario.estado AS f_estado,
                        contrato.detalle AS contrato_detalle, contrato.estado AS c_estado,
                        estructura.id_estructura, estructura.estado AS e_estado,
                        cargo.detalle AS cargo_detalle, cargo.estado AS cargo_estado
                    FROM funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN contrato ON funcionario_estructura.id_contrato_fk = contrato.id_contrato
                    INNER JOIN estructura ON funcionario_estructura.id_estructura_fk = estructura.id_estructura
                    INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                    WHERE funcionario.estado != 'anulado'
                    ORDER BY id_funcionario_estructura DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Convertir la primera letra a mayúsculas, solo campo detalle
            foreach ($resultado as $i => $item) {
                if (isset($item['contrato_detalle']) && isset($item['cargo_detalle']) ) {
                    $resultado[$i]['contrato_detalle'] = ucfirst($item['contrato_detalle']);
                    $resultado[$i]['cargo_detalle'] = ucfirst($item['cargo_detalle']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario_estructura
                        INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                        WHERE funcionario.estado != 'anulado'";
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
    public static function busquedaFuncionarioEstructura($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $tipoBusqueda = $data['tipo'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos

            // Hacer busqueda
            $sql = "SELECT funcionario_estructura.id_funcionario_estructura, funcionario_estructura.estado AS fe_estado,
                    funcionario.nombres, funcionario.apellidos, funcionario.cedula, funcionario.estado AS f_estado,
                    contrato.detalle AS contrato_detalle, contrato.estado AS c_estado,
                    estructura.id_estructura, estructura.estado AS e_estado,
                    cargo.detalle AS cargo_detalle
                    FROM funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN contrato ON funcionario_estructura.id_contrato_fk = contrato.id_contrato
                    INNER JOIN estructura ON funcionario_estructura.id_estructura_fk = estructura.id_estructura
                    INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                    WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%' AND funcionario.estado != 'anulado'
                    ORDER BY id_funcionario_estructura DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) 
                        FROM funcionario_estructura 
                        INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                        INNER JOIN contrato ON funcionario_estructura.id_contrato_fk = contrato.id_contrato
                        INNER JOIN estructura ON funcionario_estructura.id_estructura_fk = estructura.id_estructura
                        INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                        WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%' AND funcionario.estado != 'anulado'";
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
    public static function registroFuncionarioEstructura()
    {
        try {
            $sql = 'SELECT funcionario_estructura.id_funcionario_estructura, funcionario_estructura.estado AS fe_estado,
                    funcionario.nombres, funcionario.apellidos, funcionario.estado AS f_estado,
                    contrato.detalle AS contrato_detalle, contrato.estado AS c_estado,
                    estructura.id_estructura, estructura.estado AS e_estado,
                    cargo.detalle AS cargo_detalle
                    FROM funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN contrato ON funcionario_estructura.id_contrato_fk = contrato.id_contrato
                    INNER JOIN estructura ON funcionario_estructura.id_estructura_fk = estructura.id_estructura
                    INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                    ORDER BY funcionario_estructura.id_funcionario_estructura DESC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerFuncionarioEstructura($id_funcionario)
    {
        try {
            $sql = 'SELECT funcionario_estructura.id_funcionario_estructura, funcionario_estructura.estado AS fe_Estado,
                            funcionario.id_funcionario, funcionario.nombres, funcionario.apellidos, funcionario.estado AS f_Estado,
                            contrato.id_contrato, contrato.detalle AS contrato_detalle, contrato.estado AS c_Estado,
                            estructura.id_estructura, estructura.estado AS e_Estado
                    FROM funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN contrato ON funcionario_estructura.id_contrato_fk = contrato.id_contrato
                    INNER JOIN estructura ON funcionario_estructura.id_estructura_fk = estructura.id_estructura
                    WHERE id_funcionario_fk=:id_funcionario
                    ORDER BY id_funcionario_estructura DESC
                    LIMIT 1';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $id_funcionario);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function selectFuncionarioEstructura()
    {
        try {
            $sql = "SELECT funcionario_estructura.id_funcionario_estructura, funcionario_estructura.estado AS fe_estado,
                    funcionario.nombres, funcionario.apellidos, funcionario.estado AS f_estado
                    FROM funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    WHERE funcionario_estructura.estado = 'activo'
                    ORDER BY funcionario.apellidos ASC";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarFuncionarioEstructura($data)
    {
        try {
            // Comprobar si el id_funcionario ya existe (al menos 1)
            $sql = 'SELECT id_funcionario_fk
                    FROM funcionario_estructura 
                    WHERE id_funcionario_fk=:id_funcionario
                    LIMIT 1';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
            $declaracion->execute();

            // Si el id_funcionario ya existe (al menos 1)...
            if ($declaracion->rowCount() > 0) {
                // Comprobar que los datos ingresados no sean igual al ultimo segun funcionario
                $sql = 'SELECT * 
                    FROM funcionario_estructura 
                    WHERE id_funcionario_fk=:id_funcionario
                    ORDER BY id_funcionario_estructura DESC
                    LIMIT 1';
                $declaracion = Connection::getConnection()->prepare($sql);
                $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
                $declaracion->execute();
                $resultado = $declaracion->fetch();

                if ($data['id_contrato'] == $resultado['id_contrato_fk'] && $data['id_estructura'] == $resultado['id_estructura_fk']) {
                    // Si el registro ya existe, mostrar mensaje
                    $resultado = 'No se ha realizado cambios';
                    return $resultado;
                }

                // Actualizar el último registro con el mismo id_funcionario estado="activo" a estado="suspendido"
                $updateSql = "UPDATE funcionario_estructura
                        SET estado = 'suspendido'
                        WHERE id_funcionario_fk=:id_funcionario
                        AND estado = 'activo'";
                $updateDeclaracion = Connection::getConnection()->prepare($updateSql);
                $updateDeclaracion->bindParam(':id_funcionario', $data['id_funcionario']);
                $updateDeclaracion->execute();
            }

            // Insertar un nuevo registro
            $sql = 'INSERT INTO funcionario_estructura (id_funcionario_fk, id_contrato_fk, id_estructura_fk, estado)
                    VALUES (:id_funcionario, :id_contrato, :id_estructura, :estado)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
            $declaracion->bindParam(':id_contrato', $data['id_contrato']);
            $declaracion->bindParam(':id_estructura', $data['id_estructura']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
