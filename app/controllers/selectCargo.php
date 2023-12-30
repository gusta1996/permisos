<?php
require_once '../models/cargo-model.php';

if ( isset($_GET['id_seccion'])) {
    // Muestra las secciones de 1 area
    echo json_encode(Cargo::selectCargoIdSeccion($_GET['id_seccion']));
} else {
    // Muestra todas las secciones
    echo json_encode(Cargo::selectCargo());
}