import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UserCard({ user }) {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  const isFavorite = favorites.includes(user.id);

  const toggleFavorite = () => {
    const updated = isFavorite
      ? favorites.filter(id => id !== user.id)
      : [...favorites, user.id];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="user-card">
      <img src={user.image} alt={user.firstName} width={50} />
      <div>
        <h3>{user.firstName} {user.lastName}</h3>
        <p>{user.email}</p>
        <Link to={`/user/${user.id}`}>Voir détails</Link>
      </div>
      <span
        onClick={toggleFavorite}
        style={{ cursor: 'pointer', fontSize: '20px', color: isFavorite ? 'gold' : '#ccc' }}
      >
        ★
      </span>
    </div>
  );
}

export default UserCard;
``