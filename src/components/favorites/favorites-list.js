import React from 'react';
import './favorites-list.css';

const FavoritesList = ({ favorites, onSelectFavorite, onRemoveFavorite }) => {
    if (!favorites || favorites.length === 0) {
        return null;
    }

    return (
        <div className="favorites-container">
            <h3 className="favorites-title">Favorites</h3>
            <div className="favorites-list">
                {favorites.map((city) => (
                    <div key={city.label} className="favorite-item" onClick={() => onSelectFavorite(city)}>
                        <span className="favorite-name">{city.label}</span>
                        <button
                            className="remove-favorite-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFavorite(city);
                            }}
                            title="Remove from favorites"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesList;
