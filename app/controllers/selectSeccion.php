<?php
require_once '../models/seccion-model.php';

if ( isset($_GET['id_unidad'])) {
    // Muestra las secciones de 1 area
    echo json_encode(Seccion::selectSeccionIdUnidad($_GET['id_unidad']));
} else {
    // Muestra todas las secciones
    echo json_encode(Seccion::selectSeccion());
}