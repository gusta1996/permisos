<?php
require_once '../models/rolPermisos-model.php';
echo json_encode(rolPermisos::permisoActividad($_POST['id_modulo']));