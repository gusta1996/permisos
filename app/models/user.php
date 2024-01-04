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
    private $u_estado;
    private $f_estado;
    private $rol;
    private $idFuncionarioEstructura;

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
        // consulta tabla usurio, funcionario y rol
        $sql = 'SELECT  usuario.id_usuario, usuario.nick, usuario.estado AS u_estado,
                        funcionario.id_funcionario, funcionario.nombres, funcionario.apellidos, funcionario.cedula,
                        funcionario.telefono, funcionario.direccion, funcionario.email,
                        funcionario.estado AS f_estado, funcionario.imagen,
                        rol.detalle AS rol_detalle, rol.estado AS rol_estado
                FROM usuario 
                INNER JOIN funcionario ON usuario.id_funcionario_fk = funcionario.id_funcionario
                INNER JOIN rol ON usuario.id_rol_fk = rol.id_rol
                WHERE usuario.nick=:user';
        $usuario = $this->getConnection()->prepare($sql);
        $usuario->bindParam(':user', $user);
        $usuario->execute();

        foreach ($usuario as $currentUser) {
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
            $this->u_estado = $currentUser['u_estado'];
            $this->f_estado = $currentUser['f_estado'];
            $this->rol = $currentUser['rol_detalle'];
        }

        // consulta tabla funcionario_estructura
        $sql = "SELECT funcionario_estructura.id_funcionario_estructura
                FROM funcionario_estructura 
                WHERE funcionario_estructura.id_funcionario_fk=:id_funcionario
                AND funcionario_estructura.estado = 'activo'
                LIMIT 1";
        $funcionario_estructura = $this->getConnection()->prepare($sql);
        $funcionario_estructura->bindParam(':id_funcionario', $this->idFuncionario);
        $funcionario_estructura->execute();

        if ($funcionario_estructura->rowCount() > 0) {
            $funcionario_estructura = $funcionario_estructura->fetch();
            $this->idFuncionarioEstructura = $funcionario_estructura['id_funcionario_estructura'];
        } else {
            $this->idFuncionarioEstructura = 'sdsd';
        }
    }
    public function getImagen()
    {
        return ($this->imagen != null) ? $this->imagen : null;
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
    public function getUsuarioEstado()
    {
        return $this->u_estado;
    }
    public function getFuncionarioEstado()
    {
        return $this->f_estado;
    }
    public function getRol()
    {
        return $this->rol;
    }
    public function getIdFuncionarioEstructura()
    {
        return $this->idFuncionarioEstructura;
    }
}
