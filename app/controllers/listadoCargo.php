<?php
require_once '../models/cargo-model.php';
echo json_encode(Cargo::mostrarCargos( $_GET['page'] ));