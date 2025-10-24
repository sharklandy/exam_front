function UserDetail({ user }) {
  return (
    <div className="user-detail">
      <img src={user.image} alt={user.firstName} width={100} />
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email : {user.email}</p>
      <p>Âge : {user.age}</p>
      <p>Entreprise : {user.company.name}</p>
      <p>Ville : {user.address.city}</p>
    </div>
  );
}

export default UserDetail;