import { Link } from 'react-router-dom';

function UserCard({ user }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <img src={user.image} alt={user.firstName} width={50} />
      <h3>{user.firstName} {user.lastName}</h3>
      <p>{user.email}</p>
      <Link to={`/user/${user.id}`}>Voir détails</Link>
    </div>
  );
}

export default UserCard;