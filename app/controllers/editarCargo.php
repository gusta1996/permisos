<?php
require_once '../models/cargo-model.php';
echo json_encode(Cargo::obtenerCargo($_POST['id_cargo']));