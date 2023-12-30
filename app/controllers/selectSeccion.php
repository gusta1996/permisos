<?php
require_once '../models/seccion-model.php';

if ( isset($_GET['id_departamento'])) {
    // Muestra las secciones de 1 area
    echo json_encode(Seccion::selectSeccionIdDepartamento($_GET['id_departamento']));
} else {
    // Muestra todas las secciones
    echo json_encode(Seccion::selectSeccion());
}