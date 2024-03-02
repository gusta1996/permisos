<?php
class Connection
{
    public $host = 'localhost';
    public $dbname = 'permisos';
    public $port = '5432';
    public $user = 'postgres';
    public $password = 'Gusta_1996';
    public $driver = 'pgsql';
    public $connect;

    public static function getConnection() {
        try {
            $connection = new Connection();
            $connection->connect = new PDO("{$connection->driver}:host={$connection->host};port={$connection->port};dbname={$connection->dbname}", $connection->user, $connection->password);
            $connection->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $connection->connect;
            // echo 'conexion exitosa';
        } catch (PDOException $e) {
            echo 'Error: '. $e->getMessage();
        }
    }

}

// Connection::getConnection();