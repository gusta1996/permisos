<?php
require_once '../models/rolPermisos-model.php';
echo json_encode(rolPermisos::obtenerPermisos());