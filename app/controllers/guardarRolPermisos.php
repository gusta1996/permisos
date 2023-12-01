<?php
require_once '../models/rolPermisos-model.php';

$arrayName = array(
    'moduloEstado' => 'Activo',
    'reporteGeneral' => $_POST['reporteGeneral'],
    'usuarios' => $_POST['usuarios'],
    'solicitudDePermisos' => $_POST['solicitudDePermisos'],

    'permisosEstado' => 'Activo',
    'emisionDeReportes' => $_POST['emisionDeReportes'],
    'registrarNuevaSolicitudDePermiso' => $_POST['registrarNuevaSolicitudDePermiso'],
    'actualizarSolicitudDePermiso' => $_POST['actualizarSolicitudDePermiso'],
    'anularSolicitudDePermiso' => $_POST['anularSolicitudDePermiso'],
    'verEstadoDePermiso' => $_POST['verEstadoDePermiso'],
    'autorizacionDePermiso' => $_POST['autorizacionDePermiso'],
    'registroDeNuevoUsuario' => $_POST['registroDeNuevoUsuario'],
    'actualizarUsuario' => $_POST['actualizarUsuario'],
    'activarUsuario' => $_POST['activarUsuario'],
    'desactivarUsuario' => $_POST['desactivarUsuario'],

    'rol_permisosEstado' => 'Activo'
);

echo json_encode(rolPermisos::guardarRolPermisos($arrayName));