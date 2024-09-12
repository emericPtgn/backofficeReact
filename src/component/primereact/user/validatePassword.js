import React from "react";

const validatePasswords = (newPassword, confirmPassword) => {
    let validationError = '';

    // Si les deux champs sont vides, ne pas déclencher de validation d'erreur
    if (newPassword === '' && confirmPassword === '') {
        return '';
    }

    // Vérification du format du nouveau mot de passe si le champ n'est pas vide
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (newPassword.length > 0 && (newPassword.length < 8 || !passwordRegex.test(newPassword))) {
        validationError = 'Votre mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.';
    }

    // Vérification de la correspondance des mots de passe
    if (newPassword && newPassword !== confirmPassword) {
        validationError = 'Les mots de passe ne correspondent pas.';
    }

    return validationError;
};

export default validatePasswords;
