import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserDetail from '../components/UserDetail';

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();
      // Ajout d'un délai artificiel de 1.5 secondes
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUser(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) return <div className="spinner"></div>;
  if (error) return (
    <div className="error-box">
      <p>Erreur de chargement</p>
      <button onClick={fetchUser}>Réessayer</button>
    </div>
  );

  return <UserDetail user={user} />;
}

export default UserPage;