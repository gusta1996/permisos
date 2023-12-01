<?php
require '../config/connection.php';

class User extends Connection
{
    private $idUser;
    private $idFuncionario;
    private $username;
    private $imagen;
    private $nombres;
    private $apellidos;
    private $cedula;
    private $telefono;
    private $direccion;
    private $email;
    private $rol;

    public function userExists($user, $pass)
    {
        $md5pass = md5($pass);

        $sql = "SELECT * FROM usuario WHERE nick=:user AND clave=:pass";
        $declaracion = $this->getConnection()->prepare($sql);
        $declaracion->bindParam(':user', $user);
        $declaracion->bindParam(':pass', $md5pass);
        $declaracion->execute();

        if ($declaracion->rowCount()) {
            return true;
        } else {
            return false;
        }
    }
    public function setUser($user)
    {
        $sql = 'SELECT  usuario.id_usuario, usuario.nick,
                        funcionario.id_funcionario, funcionario.nombres, funcionario.apellidos, funcionario.cedula,
                        funcionario.telefono, funcionario.direccion, funcionario.email, funcionario.imagen,
                        rol.detalle AS rol_detalle, rol.estado AS rol_estado
                FROM usuario 
                INNER JOIN funcionario ON usuario.id_funcionario_fk = funcionario.id_funcionario
                INNER JOIN rol ON usuario.id_rol_fk = rol.id_rol
                WHERE usuario.nick=:user';
    
        $declaracion = $this->getConnection()->prepare($sql);
        $declaracion->bindParam(':user', $user);
        $declaracion->execute();
    
        foreach ($declaracion as $currentUser) {
            $this->idUser = $currentUser['id_usuario'];
            $this->idFuncionario = $currentUser['id_funcionario'];
            $this->username = $currentUser['nick'];
            // Comprueba si la imagen existe y no está vacía
            if (isset($currentUser['imagen']) && !empty($currentUser['imagen'])) {
                // Lee el recurso en una cadena de texto
                $imageData = stream_get_contents($currentUser['imagen']);
                // Convierte la cadena de texto a una imagen
                $this->imagen = base64_encode($imageData);
            } 
            $this->nombres = $currentUser['nombres'];
            $this->apellidos = $currentUser['apellidos'];
            $this->cedula = strval($currentUser['cedula']);
            $this->telefono = strval($currentUser['telefono']);
            $this->direccion = $currentUser['direccion'];
            $this->email = $currentUser['email'];
            $this->rol = $currentUser['rol_detalle'];
        }
    }
    public function getImagen()
    {
        return $this->imagen;
    }
    
    public function getIdUser()
    {
        return $this->idUser;
    }
    public function getIdFuncionario()
    {
        return $this->idFuncionario;
    }
    public function getUserName()
    {
        return $this->username;
    }

    public function getNombres()
    {
        return $this->nombres;
    }
    public function getApellidos()
    {
        return $this->apellidos;
    }
    public function getCedula()
    {
        return $this->cedula;
    }
    public function getTelefono()
    {
        return $this->telefono;
    }
    public function getDireccion()
    {
        return $this->direccion;
    }
    public function getEmail()
    {
        return $this->email;
    }
    public function getRol()
    {
        return $this->rol;
    }
}