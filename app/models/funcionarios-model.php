<?php
require '../config/connection.php';

class Funcionario extends Connection
{
    public static function mostrarFuncionarios($page)
    {
        try {
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($page) ? $page : 1; // Si $page esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos  
            // Consulta para obtener los datos
            $sql = "SELECT usuario.nick,
                        funcionario.id_funcionario, funcionario.nombres, funcionario.apellidos,
                        funcionario.cedula, funcionario.email,
                        funcionario.estado AS f_estado,
                        rol.detalle AS rol
                    FROM usuario 
                    INNER JOIN funcionario ON usuario.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN rol ON usuario.id_rol_fk = rol.id_rol
                    ORDER BY funcionario.id_funcionario DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario";
            $declaracion = Connection::getConnection()->prepare($sqlTotal);
            $declaracion->execute();
            $totalRegistros = $declaracion->fetchColumn();

            $totalPaginas = ceil($totalRegistros / $limit); // Redondea hacia arriba para obtener el número total de páginas
            return array(
                'resultado' => $resultado,
                'totalPaginas' => $totalPaginas
            );
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function busquedaFuncionarios($data)
    {
        try {
            $busqueda = $data['busqueda'];
            $tipoBusqueda = $data['tipo'];
            $limit = 10; // Número de registros a mostrar por página
            $page = isset($data['pagina']) ? $data['pagina'] : 1; // Si $data['page'] esta vacio, entonces es 1
            $start = ($page - 1) * $limit; // Punto de inicio para la consulta de la base de datos
            // Hacer busqueda
            $sql = "SELECT usuario.nick,
                        funcionario.*,
                        rol.detalle AS rol
                    FROM usuario 
                    INNER JOIN funcionario ON usuario.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN rol ON usuario.id_rol_fk = rol.id_rol
                    WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%'
                    ORDER BY funcionario.id_funcionario DESC
                    LIMIT :limit OFFSET :start";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':limit', $limit);
            $declaracion->bindParam(':start', $start);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();

            // Consulta para obtener el número total de registros
            $sqlTotal = "SELECT COUNT(*) FROM funcionario 
                        WHERE funcionario.$tipoBusqueda ILIKE '%$busqueda%'";
            $declaracion = Connection::getConnection()->prepare($sqlTotal);
            $declaracion->execute();
            $totalRegistros = $declaracion->fetchColumn();

            $totalPaginas = ceil($totalRegistros / $limit); // Redondea hacia arriba para obtener el número total de páginas
            return array(
                'resultado' => $resultado,
                'totalPaginas' => $totalPaginas
            );
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function selectFuncionarios()
    {
        try {
            $sql = 'SELECT id_funcionario, nombres, apellidos
                    FROM funcionario 
                    ORDER BY apellidos ASC';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->execute();
            $resultado = $declaracion->fetchAll();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function obtenerFuncionarios($id_funcionario)
    {
        try {
            $sql = 'SELECT usuario.nick,
                        funcionario.*,
                        rol.id_rol, rol.detalle AS rol
                    FROM usuario 
                    INNER JOIN funcionario ON usuario.id_funcionario_fk = funcionario.id_funcionario
                    INNER JOIN rol ON usuario.id_rol_fk = rol.id_rol
                    WHERE funcionario.id_funcionario=:id_funcionario';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $id_funcionario);
            $declaracion->execute();
            $resultado = $declaracion->fetch();
            return $resultado;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function guardarFuncionarios($data)
    {
        try {
            $comprobacion = array();

            // Consulta que Cedula no existe
            $sql = 'SELECT cedula
                    FROM funcionario
                    WHERE cedula=:cedula';
            $compruebaCedula = Connection::getConnection()->prepare($sql);
            $compruebaCedula->bindParam(':cedula', $data['cedula']);
            $compruebaCedula->execute();

            if ($compruebaCedula->rowCount() > 0) {
                $comprobacion[] = "Ya existe un usuario con la misma cédula ingresada.";
            }

            // Consulta que email no existe
            $sql = 'SELECT email
                    FROM funcionario
                    WHERE email=:email';
            $compruebaEmail = Connection::getConnection()->prepare($sql);
            $compruebaEmail->bindParam(':email', $data['email']);
            $compruebaEmail->execute();

            if ($compruebaEmail->rowCount() > 0) {
                $comprobacion[] = "Ya existe un usuario con el mismo email ingresado.";
            }

            // Consulta que usuario no existe
            $sql = 'SELECT nick
                    FROM usuario
                    WHERE nick=:usuario';
            $compruebaUsuario = Connection::getConnection()->prepare($sql);
            $compruebaUsuario->bindParam(':usuario', $data['usuario']);
            $compruebaUsuario->execute();

            if ($compruebaUsuario->rowCount() > 0) {
                $comprobacion[] = "El nombre usuario ya existe, pruebe con otro.";
            }

            // Si existe duplicados retorna mensajes
            if ($comprobacion) {
                return $comprobacion;
            }

            // Declarar las variables
            $obt_id_funcionario = null;

            // Inserta funcionario
            $sql = 'INSERT INTO funcionario (nombres, apellidos, cedula, telefono, direccion, email, estado)
                    VALUES (:nombres, :apellidos, :cedula, :telefono, :direccion, :email, :estado) RETURNING id_funcionario';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':nombres', $data['nombres']);
            $declaracion->bindParam(':apellidos', $data['apellidos']);
            $declaracion->bindParam(':cedula', $data['cedula']);
            $declaracion->bindParam(':telefono', $data['telefono']);
            $declaracion->bindParam(':direccion', $data['direccion']);
            $declaracion->bindParam(':email', $data['email']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            $obt_id_funcionario = $declaracion->fetchColumn();

            // Inserta usuario
            $sql = 'INSERT INTO usuario (nick, clave, estado, id_funcionario_fk, id_rol_fk)
                    VALUES (:usuario, :password, :estado, :id_funcionario_fk, :id_rol_fk)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':usuario', $data['usuario']);
            $md5pass = md5($data['password']); // se encrypta contraseña con MD5
            $declaracion->bindParam(':password', $md5pass);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->bindParam(':id_funcionario_fk', $obt_id_funcionario);
            $declaracion->bindParam(':id_rol_fk', $data['id_rol']);
            $declaracion->execute();

            // Inserta funcionario_estructura
            $sql = 'INSERT INTO funcionario_estructura (id_funcionario_fk, id_contrato_fk, id_estructura_fk, estado)
           VALUES (:id_funcionario_fk, :id_contrato_fk, :id_estructura_fk, :estado)';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario_fk', $obt_id_funcionario);
            $declaracion->bindParam(':id_contrato_fk', $data['id_contrato']);
            $declaracion->bindParam(':id_estructura_fk', $data['id_estructura']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarFuncionarios($data)
    {
        try {
            $comprobacion = array();

            // Consulta Cedula repetidas
            $sql = 'SELECT cedula
                    FROM funcionario
                    WHERE cedula=:cedula AND id_funcionario!=:id_funcionario';
            $compruebaCedula = Connection::getConnection()->prepare($sql);
            $compruebaCedula->bindParam(':cedula', $data['cedula']);
            $compruebaCedula->bindParam(':id_funcionario', $data['id_funcionario']);
            $compruebaCedula->execute();
            if ($compruebaCedula->rowCount() > 0) {
                $comprobacion[] = "Ya existe un usuario con la misma cédula ingresada.";
            }

            // Consulta email repetidos
            $sql = 'SELECT email
                    FROM funcionario
                    WHERE email=:email AND id_funcionario!=:id_funcionario';
            $compruebaEmail = Connection::getConnection()->prepare($sql);
            $compruebaEmail->bindParam(':email', $data['email']);
            $compruebaEmail->bindParam(':id_funcionario', $data['id_funcionario']);
            $compruebaEmail->execute();
            if ($compruebaEmail->rowCount() > 0) {
                $comprobacion[] = "Ya existe un usuario con el mismo email ingresado.";
            }

            // Consulta username repetidos
            $sql = 'SELECT nick
                    FROM usuario
                    INNER JOIN funcionario ON usuario.id_funcionario_fk = funcionario.id_funcionario
                    WHERE nick=:nick AND id_funcionario!=:id_funcionario';
            $compruebaUsername = Connection::getConnection()->prepare($sql);
            $compruebaUsername->bindParam(':nick', $data['username']);
            $compruebaUsername->bindParam(':id_funcionario', $data['id_funcionario']);
            $compruebaUsername->execute();
            if ($compruebaUsername->rowCount() > 0) {
                $comprobacion[] = "Ya existe una cuenta con el mismo nombre de usuario ingresado.";
            }

            // Si existe duplicados retorna mensajes
            if ($comprobacion) {
                return $comprobacion;
            }

            // Actualiza tabla funcionario
            $sql = 'UPDATE funcionario 
                    SET nombres=:nombres, apellidos=:apellidos, cedula=:cedula, 
                        telefono=:telefono, direccion=:direccion, email=:email, 
                        estado=:estado
                    WHERE id_funcionario=:id_funcionario';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
            $declaracion->bindParam(':nombres', $data['nombres']);
            $declaracion->bindParam(':apellidos', $data['apellidos']);
            $declaracion->bindParam(':cedula', $data['cedula']);
            $declaracion->bindParam(':telefono', $data['telefono']);
            $declaracion->bindParam(':direccion', $data['direccion']);
            $declaracion->bindParam(':email', $data['email']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            // Actualiza tabla usuario
            $sql = 'UPDATE usuario 
                    SET nick=:nick, id_rol_fk=:id_rol
                    WHERE id_funcionario_fk=:id_funcionario';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':nick', $data['username']);
            $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
            $declaracion->bindParam(':id_rol', $data['id_rol']);
            $declaracion->execute();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function actualizarPerfil($data)
    {
        try {
            $comprobacion = array();

            // Consulta Cedula repetidas
            $sql = 'SELECT cedula
                    FROM funcionario
                    WHERE cedula=:cedula AND id_funcionario!=:id_funcionario';
            $compruebaCedula = Connection::getConnection()->prepare($sql);
            $compruebaCedula->bindParam(':cedula', $data['cedula']);
            $compruebaCedula->bindParam(':id_funcionario', $data['id_funcionario']);
            $compruebaCedula->execute();
            // Si existe duplicados retorna texto
            if ($compruebaCedula->rowCount() > 0) {
                $comprobacion[] = "Ya existe un usuario con la misma cédula ingresada.";
            }

            // Consulta email repetidos
            $sql = 'SELECT email
                    FROM funcionario
                    WHERE email=:email AND id_funcionario!=:id_funcionario';
            $compruebaEmail = Connection::getConnection()->prepare($sql);
            $compruebaEmail->bindParam(':email', $data['email']);
            $compruebaEmail->bindParam(':id_funcionario', $data['id_funcionario']);
            $compruebaEmail->execute();
            // Si existe duplicados retorna texto
            if ($compruebaEmail->rowCount() > 0) {
                $comprobacion[] = "Ya existe un usuario con el mismo email ingresado.";
            }

            // Si existe duplicados retorna mensajes
            if ($comprobacion) {
                return $comprobacion;
            }

            // Si $data['imagen'] no esta vacio, agregar ", imagen=:imagen" a la consulta sql
            // $setImagen = $data['imagen'] != null ? ', imagen=:imagen' : ', imagen=null';
            /* if (isset($data['imagen'])) {
                $setImagen = ', imagen=:imagen';
            } 
            if ($data['eliminarImagen'] == true) {
                $setImagen = ', imagen=:imagen';
            } 
            if ($data['eliminarImagen'] == false) {
                $setImagen = '';
            }*/

            // Actualiza tabla funcionario
            $sql = "UPDATE funcionario 
                    SET nombres=:nombres, apellidos=:apellidos, cedula=:cedula, 
                        telefono=:telefono, direccion=:direccion, email=:email
                    WHERE id_funcionario=:id_funcionario";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
            $declaracion->bindParam(':nombres', $data['nombres']);
            $declaracion->bindParam(':apellidos', $data['apellidos']);
            $declaracion->bindParam(':cedula', $data['cedula']);
            $declaracion->bindParam(':telefono', $data['telefono']);
            $declaracion->bindParam(':direccion', $data['direccion']);
            $declaracion->bindParam(':email', $data['email']);
            $declaracion->execute();

            $sql = "UPDATE funcionario 
                    SET imagen=:imagen
                    WHERE id_funcionario=:id_funcionario";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
            if (isset($data['imagen'])) {
                // subir imagen
                $imagen = file_get_contents($data['imagen']['tmp_name']);
                $declaracion->bindParam(':imagen', $imagen, PDO::PARAM_LOB);
            }
            if (isset($data['eliminarImagen'])) {
                // Establecer la imagen por defecto
                $imagen = file_get_contents('../../public/images/imagen-perfil.png');
                $declaracion->bindParam(':imagen', $imagen, PDO::PARAM_LOB);
            }
            $declaracion->execute();

            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function eliminarFuncionarios($data)
    {
        try {
            // Actualiza funcionario
            $sql = "UPDATE funcionario
                    SET estado=:f_estado
                    WHERE id_funcionario=:id_funcionario";
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
            $declaracion->bindParam(':f_estado', $data['estado']);
            $declaracion->execute();
            // Actualiza usuario
            $sql = 'UPDATE usuario SET estado=:estado
                    WHERE id_funcionario_fk=:id_funcionario';
            $declaracion = Connection::getConnection()->prepare($sql);
            $declaracion->bindParam(':id_funcionario', $data['id_funcionario']);
            $declaracion->bindParam(':estado', $data['estado']);
            $declaracion->execute();

            // Obtener el estado del usuario anulado
            $dataFuncionario = Funcionario::obtenerFuncionarios($data['id_funcionario']);
            return $dataFuncionario;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
