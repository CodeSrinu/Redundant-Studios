import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const DEFAULT_GAMES = [
  {
    id: 'seed-1',
    title: 'DeadZone',
    genre: 'Top-down Shooter',
    platform: 'Android',
    description: 'A 2D top-down zombie shooter — survive waves of the undead.',
    status: 'Released',
    thumbnailUrl: 'https://via.placeholder.com/400x225',
    trailerUrl: 'https://www.youtube.com/watch?v=ppCIV9tVjYk',
    playstoreUrl: '#',
    order: 0,
    featured: true
  },
  {
    id: 'seed-2',
    title: 'Project Neon',
    genre: 'Cyberpunk Action',
    platform: 'Android',
    description: 'Explore a neon-drenched city in this high-octane action game.',
    status: 'Coming Soon',
    thumbnailUrl: 'https://via.placeholder.com/400x225',
    trailerUrl: '',
    playstoreUrl: null,
    order: 1,
    featured: false
  }
];

export const useGames = () => {
  const [games, setGames] = useState(DEFAULT_GAMES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'games'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        if (!snapshot.empty) {
          const gamesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setGames(gamesData);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { games, loading, error };
};
