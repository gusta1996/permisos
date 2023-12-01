<?php
require_once '../models/categoria-model.php';
echo json_encode(Categoria::obtenerCategoria($_POST['id_categoria']));