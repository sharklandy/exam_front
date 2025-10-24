import { Link } from 'react-router-dom';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.image} alt={user.firstName} width={50} />
      <div>
        <h3>{user.firstName} {user.lastName}</h3>
        <p>{user.email}</p>
        <Link to={`/user/${user.id}`}>Voir détails</Link>
      </div>
    </div>
  );
}

export default UserCard;