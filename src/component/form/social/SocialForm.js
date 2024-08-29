import React from 'react';

const SocialForm = ({ social, onChange, onRemove }) => {
    return (
        <div>
            <select
                value={social.plateforme}
                onChange={(e) => onChange('plateforme', e.target.value)}
            >
                <option value="">Choisir une plateforme</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                {/* Ajoutez d'autres options selon vos besoins */}
            </select>
            <input
                type="url"
                value={social.url}
                onChange={(e) => onChange('url', e.target.value)}
                placeholder="URL du profil"
            />

        </div>
    );
};

export default SocialForm;