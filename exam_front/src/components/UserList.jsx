import { useEffect, useState, useMemo } from 'react';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://dummyjson.com/users');
      const data = await res.json();
      setUsers(data.users);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (sort === 'name') return a.firstName.localeCompare(b.firstName);
      if (sort === 'age') return a.age - b.age;
      return 0;
    });
  }, [filteredUsers, sort]);

  const startIndex = (page - 1) * usersPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  if (loading) return <div className="spinner"></div>;
  if (error) return (
    <div className="error-box">
      <p>Erreur de chargement</p>
      <button onClick={fetchUsers}>Réessayer</button>
    </div>
  );

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher par nom ou email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Trier par nom</option>
          <option value="age">Trier par âge</option>
        </select>
      </div>

      {paginatedUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button>
        <span>Page {page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Suivant</button>
      </div>
    </div>
  );
}

export default UserList;