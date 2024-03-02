<?php
class UserSession {
    public function __construct(){
        session_start();
    }
    public function setCurrentUser($username){
        $_SESSION['user'] = $username;
    }
    public function getCurrentUser(){
        return $_SESSION['user'];
    }
    public function userLoggedIn() {
        if (isset($_SESSION['user'])) {
            return true;
        }
    }
    public function closeSession(){
        session_unset();
        session_destroy();
    }
}
