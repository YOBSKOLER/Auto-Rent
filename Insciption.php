<?php
$mysqli = new mysqli("localhost", "root", "", "auto_rent");
if ($mysqli->connect_error) {
    die("Échec connexion BDD: " . $mysqli->connect_error);
}

$nom = $_POST['nom'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $mysqli->prepare("INSERT INTO clients (nom, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nom, $email, $password);

if ($stmt->execute()) {
    echo "Inscription réussie !";
} else {
    echo "Erreur: " . $stmt->error;
}
