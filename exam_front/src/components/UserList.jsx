import { useState, useEffect, useMemo } from 'react';
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
      const res = await fetch('https://dummyjson.com/users?limit=0');
      const data = await res.json();
      // Ajout d'un délai artificiel de 1.5 secondes
      await new Promise(resolve => setTimeout(resolve, 1000));
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
    console.log('🔍 Filtrage des utilisateurs en cours...'); // Log pour voir quand le filtrage est exécuté
    const startTime = performance.now();
    
    const result = users.filter(user =>
      `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    
    const endTime = performance.now();
    console.log(`✨ Filtrage terminé ! ${result.length} utilisateurs trouvés en ${(endTime - startTime).toFixed(2)}ms`);
    
    return result;
  }, [users, search]);

  // Récupérer les favoris du localStorage
  const favorites = useMemo(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }, []);

  const sortedUsers = useMemo(() => {
    console.log('📊 Tri des utilisateurs en cours...'); // Log pour voir quand le tri est exécuté
    const startTime = performance.now();
    
    let result = [...filteredUsers];
    
    if (sort === 'favorites') {
      // Séparer les favoris et non-favoris
      const favUsers = result.filter(user => favorites.includes(user.id));
      const nonFavUsers = result.filter(user => !favorites.includes(user.id));
      
      // Trier chaque groupe par nom
      favUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
      nonFavUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
      
      // Combiner les deux groupes
      result = [...favUsers, ...nonFavUsers];
    } else if (sort === 'name') {
      result.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sort === 'age') {
      result.sort((a, b) => a.age - b.age);
    }
    
    const endTime = performance.now();
    console.log(`📈 Tri terminé en ${(endTime - startTime).toFixed(2)}ms ! Critère: ${sort}`);
    
    return result;
  }, [filteredUsers, sort, favorites]);

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
    <div className={sort === 'favorites' ? 'sorting-by-favorites' : ''}>
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
          <option value="favorites">Trier par favoris</option>
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