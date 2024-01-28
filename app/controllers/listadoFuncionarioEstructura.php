<?php
require_once '../models/funcionarioEstructura-model.php';
$arrayName = array(
    'pagina' => $_POST['pagina'],
    'registro' => $_POST['registro']
);

echo json_encode(funcionarioEstructura::mostrarFuncionarioEstructuras( $arrayName ));