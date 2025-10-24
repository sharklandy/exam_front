import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserDetail from '../components/UserDetail';

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !user) return <p>Erreur ou utilisateur introuvable</p>;

  return <UserDetail user={user} />;
}

export default UserPage;