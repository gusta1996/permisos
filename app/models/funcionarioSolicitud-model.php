<?php
require '../config/connection.php';
require 'email.php';


class funcionarioSolicitud extends Connection
{
    // Lista de solicitudes completo (para usuarios con permisos)
    public static function listaFuncionarioSolicitudCompleto($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, 
                    funcionario_solicitud.estado AS fs_estado, 
                    funcionario_solicitud.firma_estandar, 
                    funcionario_solicitud.firma_autorizador, 
                    funcionario_solicitud.firma_validador, 
                    funcionario_estructura.id_funcionario_fk,
                    funcionario.nombres, funcionario.apellidos, funcionario.cedula,
                    solicitud.numero, solicitud.fecha,
                    razon.descripcion AS razon
                    FROM funcionario_solicitud
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    ORDER BY funcionario_solicitud.id_funcionario_solicitud DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Capitalizar
            foreach ($resultado as $i => $item) {
                if (
                    isset($item['nombres']) || isset($item['apellidos']) ||
                    isset($item['razon'])
                ) {
                    $resultado[$i]['nombres'] = ucwords($item['nombres']);
                    $resultado[$i]['apellidos'] = ucwords($item['apellidos']);
                    $resultado[$i]['razon'] = ucfirst($item['razon']);
                }
            }

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario_solicitud";
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
    // Lista de solicitudes simple (para usuario estandar)
    public static function listaFuncionarioSolicitudSimple($page, $id)
    {
        try {
            $id_funcionario = isset($id) ? $id : null; // Si $id esta vacio, entonces es null
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos 

            // Consulta para obtener los datos
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado AS fs_estado,
                        funcionario_solicitud.firma_estandar, 
                        funcionario_solicitud.firma_autorizador, 
                        funcionario_solicitud.firma_validador, 
                        funcionario_estructura.id_funcionario_fk,
                        funcionario.id_funcionario, funcionario.nombres, funcionario.apellidos,
                        solicitud.id_solicitud, solicitud.numero, solicitud.fecha,
                        razon.descripcion AS razon
                    FROM funcionario_solicitud
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    WHERE funcionario.id_funcionario = :id_funcionario
                    ORDER BY funcionario_solicitud.id_funcionario_solicitud DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $id_funcionario);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Capitalizar
            foreach ($resultado as $i => $item) {
                if (
                    isset($item['nombres']) || isset($item['apellidos']) ||
                    isset($item['razon'])
                ) {
                    $resultado[$i]['nombres'] = ucwords($item['nombres']);
                    $resultado[$i]['apellidos'] = ucwords($item['apellidos']);
                    $resultado[$i]['razon'] = ucfirst($item['razon']);
                }
            }

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario_solicitud
                        INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                        INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                        WHERE funcionario.id_funcionario = :id_funcionario";
            $declaracion = Connection::getConnection()->prepare($sqlTotal);
            $declaracion->bindParam(':id_funcionario', $id_funcionario);
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
    // Busqueda de solicitudes
    public static function busquedaFuncionarioSolicitud($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $tipoBusqueda = $data['tipo'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado AS fs_estado, 
                    funcionario_solicitud.firma_estandar, 
                    funcionario_solicitud.firma_autorizador, 
                    funcionario_solicitud.firma_validador, 
                    funcionario_estructura.id_funcionario_fk,
                    funcionario.nombres, funcionario.apellidos, funcionario.cedula,
                    solicitud.numero, solicitud.fecha,
                    razon.descripcion AS razon
                    FROM funcionario_solicitud
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%'
                    ORDER BY funcionario_solicitud.id_funcionario_solicitud DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Capitalizar
            foreach ($resultado as $i => $item) {
                if (
                    isset($item['nombres']) || isset($item['apellidos']) ||
                    isset($item['razon'])
                ) {
                    $resultado[$i]['nombres'] = ucwords($item['nombres']);
                    $resultado[$i]['apellidos'] = ucwords($item['apellidos']);
                    $resultado[$i]['razon'] = ucfirst($item['razon']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario_solicitud
                        INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                        INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                        WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%'";
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
    // Lista de solicitudes para genera PDF
    public static function ListadoGenerarCompleto($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado AS fs_estado, funcionario_estructura.id_funcionario_fk,
                    funcionario.nombres, funcionario.apellidos, funcionario.cedula,
                    solicitud.numero, solicitud.fecha,
                    razon.descripcion AS razon
                    FROM funcionario_solicitud
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    WHERE funcionario_solicitud.estado = 'aprobado'
                    ORDER BY funcionario_solicitud.id_funcionario_solicitud DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Capitalizar
            foreach ($resultado as $i => $item) {
                if (
                    isset($item['nombres']) || isset($item['apellidos']) ||
                    isset($item['razon'])
                ) {
                    $resultado[$i]['nombres'] = ucwords($item['nombres']);
                    $resultado[$i]['apellidos'] = ucwords($item['apellidos']);
                    $resultado[$i]['razon'] = ucfirst($item['razon']);
                }
            }

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario_solicitud WHERE funcionario_solicitud.estado = 'aprobado'";
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
    public static function ListadoGenerarSimple($page, $id)
    {
        try {
            $id_funcionario = isset($id) ? $id : null; // Si $id esta vacio, entonces es null
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado AS fs_estado, funcionario_estructura.id_funcionario_fk,
                    funcionario.nombres, funcionario.apellidos,
                    solicitud.numero, solicitud.fecha,
                    razon.descripcion AS razon
                    FROM funcionario_solicitud
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    WHERE funcionario_solicitud.estado = 'aprobado' AND funcionario.id_funcionario = :id_funcionario
                    ORDER BY funcionario_solicitud.id_funcionario_solicitud DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $id_funcionario);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Capitalizar
            foreach ($resultado as $i => $item) {
                if (
                    isset($item['nombres']) || isset($item['apellidos']) ||
                    isset($item['razon'])
                ) {
                    $resultado[$i]['nombres'] = ucwords($item['nombres']);
                    $resultado[$i]['apellidos'] = ucwords($item['apellidos']);
                    $resultado[$i]['razon'] = ucfirst($item['razon']);
                }
            }

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario_solicitud
                        INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                        INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                        WHERE funcionario_solicitud.estado = 'aprobado' AND funcionario.id_funcionario = :id_funcionario";
            $declaracion = Connection::getConnection()->prepare($sqlTotal);
            $declaracion->bindParam(':id_funcionario', $id_funcionario);
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
    // Busqueda de solicitudes para generar PFD
    public static function busquedaGenerarPDF($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $tipoBusqueda = $data['tipo'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado AS fs_estado, funcionario_estructura.id_funcionario_fk,
                    funcionario.nombres, funcionario.apellidos, funcionario.cedula,
                    solicitud.numero, solicitud.fecha,
                    razon.descripcion AS razon
                    FROM funcionario_solicitud
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%'
                    AND funcionario_solicitud.estado = 'aprobado'
                    ORDER BY funcionario_solicitud.id_funcionario_solicitud DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Capitalizar
            foreach ($resultado as $i => $item) {
                if (
                    isset($item['nombres']) || isset($item['apellidos']) ||
                    isset($item['razon'])
                ) {
                    $resultado[$i]['nombres'] = ucwords($item['nombres']);
                    $resultado[$i]['apellidos'] = ucwords($item['apellidos']);
                    $resultado[$i]['razon'] = ucfirst($item['razon']);
                }
            }

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario_solicitud
                        INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                        INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                        WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%'
                        AND funcionario_solicitud.estado = 'aprobado'";
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
    // Obtener datos para generar PDF
    public static function obtenerDatosPDF($id_funcionario_solicitud)
    {
        try {
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado,
                            funcionario_solicitud.firma_estandar, 
                            funcionario_solicitud.firma_autorizador, 
                            funcionario_solicitud.firma_validador,
                            funcionario.nombres, funcionario.apellidos, funcionario.direccion,
                            solicitud.numero, solicitud.observacion, solicitud.fecha,
                            tiempo.fecha_salida, tiempo.fecha_entrada, 
                            tiempo.hora_salida,
                            tiempo.hora_entrada,
                            razon.id_razon, razon.descripcion,
                            cargo.detalle
                FROM funcionario_solicitud 
                INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                INNER JOIN tiempo ON solicitud.id_tiempo_fk = tiempo.id_tiempo
                INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                INNER JOIN estructura ON funcionario_estructura.id_estructura_fk = estructura.id_estructura
                INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                WHERE id_funcionario_solicitud=:id_funcionario_solicitud";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario_solicitud', $id_funcionario_solicitud);
            $declaracion->execute();
            $resultado = $declaracion->fetch();

            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    // Lista de solicitudes para ver reporte (contiene paginacion)
    public static function mostrarReporte($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado AS fs_estado,
                            funcionario.nombres, funcionario.apellidos, funcionario.cedula,
                            solicitud.numero, solicitud.observacion, solicitud.fecha,
                            tiempo.fecha_salida, tiempo.fecha_entrada, tiempo.hora_salida, tiempo.hora_entrada,
                            razon.id_razon, razon.descripcion AS razon,
                            cargo.detalle
                    FROM funcionario_solicitud 
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN tiempo ON solicitud.id_tiempo_fk = tiempo.id_tiempo
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN estructura ON funcionario_estructura.id_estructura_fk = estructura.id_estructura
                    INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                    ORDER BY funcionario_solicitud.id_funcionario_solicitud DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Capitalizar
            foreach ($resultado as $i => $item) {
                if (
                    isset($item['nombres']) || isset($item['apellidos']) ||
                    isset($item['razon'])
                ) {
                    $resultado[$i]['nombres'] = ucwords($item['nombres']);
                    $resultado[$i]['apellidos'] = ucwords($item['apellidos']);
                    $resultado[$i]['razon'] = ucfirst($item['razon']);
                }
            }

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario_solicitud";
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
    // Extraer meses con años de los registros de solicitudes
    public static function filtrosReporte()
    {
        try {
            // CONSULTA MES
            $sql = "SELECT LPAD(CAST(EXTRACT(MONTH FROM fecha) AS TEXT), 2, '0') AS mes
                    FROM funcionario_solicitud
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    ORDER BY fecha DESC
                    LIMIT 1";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $mes = $declaracion->fetchAll();

            // CONSULTA AÑO
            $sql = "SELECT DISTINCT EXTRACT(YEAR FROM fecha) AS ano
                    FROM funcionario_solicitud
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    ORDER BY ano DESC";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $ano = $declaracion->fetchAll();

            // CONSULTA FUNCIONARIO
            $sql2 = "SELECT funcionario.id_funcionario, funcionario.nombres, funcionario.apellidos
                FROM funcionario
                WHERE funcionario.estado = 'activo'
                ORDER BY funcionario.apellidos ASC";
            $declaracion2 = Connection::getConnection()->prepare($sql2);
            $declaracion2->execute();
            $funcionario = $declaracion2->fetchAll();
            // Capitalizar nombre y apellido
            foreach ($funcionario as $i => $item) {
                if (isset($item['nombres']) || isset($item['apellidos'])) {
                    $funcionario[$i]['nombres'] = ucwords($item['nombres']);
                    $funcionario[$i]['apellidos'] = ucwords($item['apellidos']);
                }
            }

            // CONSULTA DIRECCION
            $sql3 = "SELECT direccion.id_direccion, direccion,detalle AS direccion
                FROM direccion
                WHERE direccion.estado = 'activo'
                ORDER BY direccion.detalle ASC";
            $declaracion3 = Connection::getConnection()->prepare($sql3);
            $declaracion3->execute();
            $direccion = $declaracion3->fetchAll();
            // Capitalizar direccion
            foreach ($direccion as $i => $item) {
                if (isset($item['direccion'])) {
                    $direccion[$i]['direccion'] = ucfirst($item['direccion']);
                }
            }
            return array(
                'mes' => $mes,
                'ano' => $ano,
                'funcionario' => $funcionario,
                'direccion' => $direccion
            );
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    // Lista de solicitudes para descargar reporte mensual (no contiene paginacion)
    public static function mostrarReporteMensual($data)
    {
        try {
            if ($data['funcionario'] == 'todos') {
                $funcionario = "";
            } else {
                $funcionario = " AND funcionario_estructura.id_funcionario_fk=" . $data['funcionario'] . " AND funcionario.id_funcionario=" . $data['funcionario'];
            }

            if ($data['direccion'] == 'todos') {
                $direccion = "";
            } else {
                $direccion = "  AND direccion.id_direccion=" . $data['direccion'];
            }
            // primera consulta
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado AS fs_estado,
                            funcionario_estructura.estado AS fe_estado,
                            funcionario.nombres, funcionario.apellidos, funcionario.cedula,
                            direccion.detalle AS direccion,
                            solicitud.fecha,
                            tiempo.fecha_salida, tiempo.fecha_entrada, tiempo.hora_salida, tiempo.hora_entrada,
                            razon.descripcion AS razon
                    FROM funcionario_solicitud 
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN tiempo ON solicitud.id_tiempo_fk = tiempo.id_tiempo
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN estructura ON funcionario_estructura.id_estructura_fk = estructura.id_estructura
                    INNER JOIN direccion ON estructura.id_direccion_fk = direccion.id_direccion
                    WHERE TO_CHAR(solicitud.fecha, 'MM')=:fecha_mes 
                        AND TO_CHAR(solicitud.fecha, 'YYYY')=:fecha_ano 
                        $funcionario
                        $direccion
                    ORDER BY funcionario_solicitud.id_funcionario_solicitud DESC ";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':fecha_mes', $data['fecha_mes']);
            $declaracion->bindParam(':fecha_ano', $data['fecha_ano']);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // segunda consulta


            // Capitalizar
            foreach ($resultado as $i => $item) {
                if (
                    isset($item['nombres']) || isset($item['apellidos']) ||
                    isset($item['direccion']) || isset($item['razon'])
                ) {
                    $resultado[$i]['nombres'] = ucwords($item['nombres']);
                    $resultado[$i]['apellidos'] = ucwords($item['apellidos']);
                    $resultado[$i]['direccion'] = ucfirst($item['direccion']);
                    $resultado[$i]['razon'] = ucfirst($item['razon']);
                }
            }
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    // Busqueda de solicitudes para generar PFD
    public static function busquedaReporte($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $tipoBusqueda = $data['tipo'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado AS fs_estado,
                            funcionario.nombres, funcionario.apellidos, funcionario.cedula,
                            solicitud.numero, solicitud.observacion, solicitud.fecha,
                            tiempo.fecha_salida, tiempo.fecha_entrada, tiempo.hora_salida, tiempo.hora_entrada,
                            razon.id_razon, razon.descripcion AS razon,
                            cargo.detalle
                    FROM funcionario_solicitud 
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN tiempo ON solicitud.id_tiempo_fk = tiempo.id_tiempo
                    INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN estructura ON funcionario_estructura.id_estructura_fk = estructura.id_estructura
                    INNER JOIN cargo ON estructura.id_cargo_fk = cargo.id_cargo
                    WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%'
                    ORDER BY funcionario_solicitud.id_funcionario_solicitud DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            // Capitalizar
            foreach ($resultado as $i => $item) {
                if (
                    isset($item['nombres']) || isset($item['apellidos']) ||
                    isset($item['razon'])
                ) {
                    $resultado[$i]['nombres'] = ucwords($item['nombres']);
                    $resultado[$i]['apellidos'] = ucwords($item['apellidos']);
                    $resultado[$i]['razon'] = ucfirst($item['razon']);
                }
            }
            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario_solicitud
                        INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                        INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                        WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%'";
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
    public static function obtenerFuncionarioSolicitud($id_funcionario_solicitud)
    {
        try {
            $sql = 'SELECT funcionario_estructura.id_funcionario_estructura, funcionario_estructura.id_funcionario_fk, 
                            funcionario_solicitud.id_funcionario_solicitud, funcionario_solicitud.estado,
                            funcionario,id_funcionario, funcionario.nombres, funcionario.apellidos,
                            solicitud.id_solicitud, solicitud.observacion,
                            tiempo.id_tiempo, tiempo.fecha_salida, tiempo.fecha_entrada, tiempo.hora_salida, tiempo.hora_entrada,
                            razon.id_razon, razon.descripcion
            FROM funcionario_solicitud 
            INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
            INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
            INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
            INNER JOIN tiempo ON solicitud.id_tiempo_fk = tiempo.id_tiempo
            INNER JOIN razon ON solicitud.id_razon_fk = razon.id_razon
            WHERE id_funcionario_solicitud=:id_funcionario_solicitud';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario_solicitud', $id_funcionario_solicitud);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            // capitalizar nombres
            if (isset($resultado['nombres']) || isset($resultado['apellidos'])) {
                $resultado['nombres'] = ucwords($resultado['nombres']);
                $resultado['apellidos'] = ucwords($resultado['apellidos']);
            }
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarFuncionarioSolicitud($data)
    {
        try {
            $conn = new PDO("pgsql:host=localhost;dbname=permisos", "postgres", "Gusta_1996");
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Comenzar una transacción
            $conn->beginTransaction();

            // Declarar las variables
            $obt_id_razon = null;
            $obt_id_tiempo = null;
            $obt_id_solicitud = null;
            $obt_id_funcionario_solicitud = null;

            // Primera inserción
            $declaracion = $conn->prepare("INSERT INTO razon (descripcion) 
            VALUES (:razon) RETURNING id_razon");
            $declaracion->bindParam(':razon', $data['razon']);
            $declaracion->execute();
            $obt_id_razon = $declaracion->fetchColumn();

            // Segunda inserción
            $declaracion = $conn->prepare("INSERT INTO tiempo (fecha_salida, fecha_entrada, hora_salida, hora_entrada) 
            VALUES (:fecha_salida, :fecha_entrada, :hora_salida, :hora_entrada) RETURNING id_tiempo");
            $declaracion->bindParam(':fecha_salida', $data['fechaSalida']);
            $declaracion->bindParam(':fecha_entrada', $data['fechaEntrada']);
            $declaracion->bindParam(':hora_salida', $data['horaSalida']);
            $declaracion->bindParam(':hora_entrada', $data['horaEntrada']);
            $declaracion->execute();
            $obt_id_tiempo = $declaracion->fetchColumn();

            // Tercera inserción
            $declaracion = $conn->prepare("INSERT INTO solicitud (fecha, observacion, id_razon_fk, id_tiempo_fk) 
            VALUES (:fecha, :observacion, :id_razon, :id_tiempo) RETURNING id_solicitud");
            $declaracion->bindParam(':fecha', $data['fecha']);
            $declaracion->bindParam(':observacion', $data['observacion']);
            $declaracion->bindParam(':id_razon', $obt_id_razon);
            $declaracion->bindParam(':id_tiempo', $obt_id_tiempo);
            $declaracion->execute();
            $obt_id_solicitud = $declaracion->fetchColumn();

            // Cuarta inserción
            $declaracion = $conn->prepare("INSERT INTO funcionario_solicitud (estado, id_funcionario_estructura_fk, id_solicitud_fk, firma_estandar, firma_autorizador, firma_validador) 
            VALUES (:estado, :id_funcionario_estructura, :id_solicitud, :firma_estandar, :firma_autorizador, :firma_validador)
            RETURNING id_funcionario_solicitud");
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':id_funcionario_estructura', $data['id_funcionario_estructura']);
            $declaracion->bindParam(':id_solicitud', $obt_id_solicitud);
            $declaracion->bindValue(':firma_estandar', 'false');
            $declaracion->bindValue(':firma_autorizador', 'false');
            $declaracion->bindValue(':firma_validador', 'false');
            $declaracion->execute();
            $obt_id_funcionario_solicitud = $declaracion->fetchColumn();

            // Obtener
            $declaracion = $conn->prepare("SELECT funcionario_solicitud.id_funcionario_solicitud, 
                                            solicitud.numero AS numero_solicitud,
                                            funcionario.nombres,
                                            funcionario.apellidos,
                                            funcionario.email
                FROM funcionario_solicitud
                INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                WHERE id_funcionario_solicitud=:id_funcionario_solicitud
            ");
            $declaracion->bindParam(':id_funcionario_solicitud', $obt_id_funcionario_solicitud);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            // Capitalizar
            if (isset($resultado['nombres']) || isset($resultado['apellidos'])) {
                $resultado['nombres'] = ucwords($resultado['nombres']);
                $resultado['apellidos'] = ucwords($resultado['apellidos']);
            }

            // Confirmar la transacción
            $conn->commit();

            if ($resultado) {
                $mail = new email();
                $mail::emailSolicitudCreada($resultado);
            }

            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarFuncionarioSolicitud($data)
    {
        try {
            $sqlSolicitud = 'UPDATE solicitud
                    SET observacion=:observacion
                    WHERE id_solicitud=:id_solicitud;               
                    ';
            $decSolicitud = Connection::getConnection()->prepare($sqlSolicitud);
            $decSolicitud->bindParam(':observacion', $data['observacion']);
            $decSolicitud->bindParam(':id_solicitud', $data['id_solicitud']);
            $decSolicitud->execute();

            // actualiza la tabla tiempo
            $sqlTiempo = 'UPDATE tiempo
                    SET fecha_salida=:fecha_salida,
                        fecha_entrada=:fecha_entrada, 
                        hora_salida=:hora_salida,
                        hora_entrada=:hora_entrada
                    WHERE id_tiempo=:id_tiempo;                  
                    ';
            $decTiempo = Connection::getConnection()->prepare($sqlTiempo);
            $decTiempo->bindParam(':fecha_salida', $data['fecha_salida']);
            $decTiempo->bindParam(':fecha_entrada', $data['fecha_entrada']);
            $decTiempo->bindParam(':hora_salida', $data['hora_salida']);
            $decTiempo->bindParam(':hora_entrada', $data['hora_entrada']);
            $decTiempo->bindParam(':id_tiempo', $data['id_tiempo']);
            $decTiempo->execute();

            // actualiza la tabla razon
            $sqlRazon = 'UPDATE razon
                    SET descripcion=:razon
                    WHERE id_razon=:id_razon;                   
                    ';
            $decRazon = Connection::getConnection()->prepare($sqlRazon);
            $decRazon->bindParam(':id_razon', $data['id_razon']);
            $decRazon->bindParam(':razon', $data['razon']);
            $decRazon->execute();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarDocumentoFirmado($data)
    {
        try {
            // PRIMERA PARTE: consultar las firmas y estado para su actualizacion
            $sql = "SELECT estado, firma_estandar, firma_autorizador, firma_validador
                    FROM funcionario_solicitud
                    WHERE id_funcionario_solicitud=:id_funcionario_solicitud";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam('id_funcionario_solicitud', $data['id_funcionario_solicitud']);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            // verifica que firma se debe convertir en true
            if (
                $resultado['firma_estandar'] == false &&
                $resultado['firma_autorizador'] == false &&
                $resultado['firma_autorizador'] == false
            ) {
                // firma con usuario estandar
                $firma_rol = 'firma_estandar=true';
            } elseif (
                $resultado['firma_estandar'] == true &&
                $resultado['firma_autorizador'] == false &&
                $resultado['firma_validador'] == false
            ) {
                // firma con usuario autorizador
                $firma_rol = 'firma_autorizador=true';
            } elseif (
                $resultado['firma_estandar'] == true &&
                $resultado['firma_autorizador'] == true &&
                $resultado['firma_validador'] == false
            ) {
                // firma con usuario validador
                $firma_rol = "firma_validador=true, estado='aprobado'";
            }

            // SEGUNDA PARTE: Confirmar la firma que se ha enviado y actualizar estado si se consigue las 3 firmas
            $sql = "UPDATE funcionario_solicitud
                    SET $firma_rol
                    WHERE id_funcionario_solicitud=:id_funcionario_solicitud";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam('id_funcionario_solicitud', $data['id_funcionario_solicitud']);
            $declaracion->execute();

            // TERCERA PARTE: consultar de nuevo las firmas y estado para enviar email
            $sql = "SELECT funcionario_solicitud.estado, 
                            funcionario_solicitud.firma_estandar, funcionario_solicitud.firma_autorizador, funcionario_solicitud.firma_validador,
                            solicitud.numero AS numero_solicitud,
                            funcionario.nombres, funcionario.apellidos, funcionario.email
                    FROM funcionario_solicitud                    
                    INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                    INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                    INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                    WHERE id_funcionario_solicitud=:id_funcionario_solicitud";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam('id_funcionario_solicitud', $data['id_funcionario_solicitud']);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            // Capitalizar
            if (isset($resultado['nombres']) || isset($resultado['apellidos'])) {
                $resultado['nombres'] = ucwords($resultado['nombres']);
                $resultado['apellidos'] = ucwords($resultado['apellidos']);
            }

            // objeto para enviar email
            $email = new email();

            // verifica que firma se debe convertir en true
            if (
                $resultado['firma_estandar'] == true &&
                $resultado['firma_autorizador'] == false &&
                $resultado['firma_autorizador'] == false
            ) {
                // enviar email a funcionario y a autorizador
                $email::emailSolicitudFirmada($resultado, 'estandar');
            } elseif (
                $resultado['firma_estandar'] == true &&
                $resultado['firma_autorizador'] == true &&
                $resultado['firma_validador'] == false
            ) {
                // enviar email a funcionario y a validador
                $email::emailSolicitudFirmada($resultado, 'autorizador');
            } elseif (
                $resultado['firma_estandar'] == true &&
                $resultado['firma_autorizador'] == true &&
                $resultado['firma_validador'] == true && $resultado['estado'] == 'aprobado'
            ) {
                // enviar email a funcionario
                $email::emailSolicitudFirmada($resultado, 'validador');
            }

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarFuncionarioSolicitud($data)
    {
        try {
            $sql = "UPDATE funcionario_solicitud 
                    SET estado=:estado, 
                        firma_estandar=false, firma_autorizador=false, firma_validador=false
                    WHERE id_funcionario_solicitud=:id_funcionario_solicitud";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario_solicitud', $data['id_funcionario_solicitud']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            $sql = "SELECT funcionario_solicitud.estado, funcionario_solicitud.estado, 
                    funcionario_solicitud.firma_estandar, funcionario_solicitud.firma_autorizador, funcionario_solicitud.firma_validador,
                    solicitud.numero AS numero_solicitud,
                    funcionario.nombres, funcionario.apellidos, funcionario.email
                FROM funcionario_solicitud                    
                INNER JOIN solicitud ON funcionario_solicitud.id_solicitud_fk = solicitud.id_solicitud
                INNER JOIN funcionario_estructura ON funcionario_solicitud.id_funcionario_estructura_fk = funcionario_estructura.id_funcionario_estructura
                INNER JOIN funcionario ON funcionario_estructura.id_funcionario_fk = funcionario.id_funcionario
                WHERE id_funcionario_solicitud=:id_funcionario_solicitud";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam('id_funcionario_solicitud', $data['id_funcionario_solicitud']);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            // Capitalizar
            if (isset($resultado['nombres']) || isset($resultado['apellidos'])) {
                $resultado['nombres'] = ucwords($resultado['nombres']);
                $resultado['apellidos'] = ucwords($resultado['apellidos']);
            }

            // objeto para enviar email
            $email = new email();
            // enviar email
            $email::emailSolicitudAnulada($resultado);

            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
