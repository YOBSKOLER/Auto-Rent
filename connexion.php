<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "auto_rent");

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $mysqli->prepare("SELECT id, nom, password FROM clients WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['nom'] = $user['nom'];
    echo "Connexion réussie";
    header("Location: Accueil.html");
} else {
    echo "Email ou mot de passe incorrect.";
}
