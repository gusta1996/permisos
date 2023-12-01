<?php
require_once '../models/categoria-model.php';
echo json_encode(Categoria::mostrarCategorias( $_GET['page'] ));