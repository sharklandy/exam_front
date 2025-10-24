import { useEffect, useState } from 'react';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name'); // 'name' ou 'age'
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Erreur de chargement</p>;

  // Filtrage
  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Tri
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sort === 'name') return a.firstName.localeCompare(b.firstName);
    if (sort === 'age') return a.age - b.age;
    return 0;
  });

  // Pagination
  const startIndex = (page - 1) * usersPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  return (
    <div>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom ou email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tri */}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="name">Trier par nom</option>
        <option value="age">Trier par âge</option>
      </select>

      {/* Liste */}
      {paginatedUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}

      {/* Pagination */}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button>
        <span>Page {page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Suivant</button>
      </div>
    </div>
  );
}

export default UserList;