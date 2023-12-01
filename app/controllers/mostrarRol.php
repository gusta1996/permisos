<?php
require_once '../models/usuario-model.php';
echo json_encode(usuario::obtenerRolUsuario( $_POST['id_funcionario'] ));