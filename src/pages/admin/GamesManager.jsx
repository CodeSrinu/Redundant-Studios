import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const labelStyle = { display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' };
const inputStyle = { padding: '0.8rem', backgroundColor: '#0a0a0a', border: '1px solid #262626', borderRadius: '4px', color: '#fff', fontFamily: 'inherit' };
const btnStyle = { padding: '0.8rem 1.5rem', backgroundColor: '#e10600', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '2px' };

const EMPTY_GAME = {
  title: '',
  description: '',
  genre: '',
  platform: '',
  thumbnailUrl: '',
  trailerUrl: '',
  playstoreUrl: '',
  status: 'Released',
  category: 'latest',
  order: 0,
  featured: false,
};

const GamesManager = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGame, setEditingGame] = useState(null);
  const [newGame, setNewGame] = useState({ ...EMPTY_GAME });

  const fetchGames = async () => {
    setLoading(true);
    const q = query(collection(db, 'games'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const gamesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setGames(gamesData);
    setLoading(false);
  };

  useEffect(() => { fetchGames(); }, []);

  const handleAddGame = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'games'), newGame);
      setNewGame({ ...EMPTY_GAME });
      await fetchGames();
    } catch (err) { alert('Error adding game'); }
  };

  const handleUpdateGame = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'games', editingGame.id);
      const { id, ...updateData } = editingGame;
      await updateDoc(docRef, updateData);
      setEditingGame(null);
      await fetchGames();
    } catch (err) { alert('Error updating game'); }
  };

  const handleDeleteGame = async (id) => {
    if (!window.confirm('Delete this game?')) return;
    try {
      await deleteDoc(doc(db, 'games', id));
      await fetchGames();
    } catch (err) { alert('Error deleting game'); }
  };

  if (loading) return <div style={{ color: '#fff' }}>Loading...</div>;

  const featuredCount = games.filter(g => g.featured).length;
  const nonFeaturedCount = games.filter(g => !g.featured).length;

  return (
    <div>
      <h2 style={{ color: '#fff', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Games Manager</h2>
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>
        {games.length} total games · <span style={{ color: '#e10600' }}>{featuredCount} featured</span> · {nonFeaturedCount} in latest/previous grid
      </p>

      {/* Add New Game */}
      <div style={{ backgroundColor: '#141414', padding: '1.5rem', borderRadius: '4px', border: '1px solid #262626', marginBottom: '3rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Add New Game</h3>
        <form onSubmit={handleAddGame} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Title</label>
            <input placeholder="e.g. DeadZone" value={newGame.title} onChange={e => setNewGame({...newGame, title: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Genre</label>
            <input placeholder="e.g. Top-down Shooter" value={newGame.genre} onChange={e => setNewGame({...newGame, genre: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Platform</label>
            <input placeholder="e.g. Android, PC" value={newGame.platform} onChange={e => setNewGame({...newGame, platform: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Order</label>
            <input type="number" value={newGame.order} onChange={e => setNewGame({...newGame, order: parseInt(e.target.value) || 0})} style={inputStyle} />
            <span style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.3rem' }}>Lower number = appears first</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Status</label>
            <select value={newGame.status} onChange={e => setNewGame({...newGame, status: e.target.value})} style={inputStyle}>
              <option value="Released">Released</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="In Development">In Development</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Category</label>
            <select value={newGame.category || 'latest'} onChange={e => setNewGame({...newGame, category: e.target.value})} style={inputStyle}>
              <option value="latest">Latest</option>
              <option value="previous">Previous</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '1px' }}>
              <input type="checkbox" checked={newGame.featured} onChange={e => setNewGame({...newGame, featured: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: '#e10600' }} />
              Featured
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Thumbnail URL</label>
            <input placeholder="https://..." value={newGame.thumbnailUrl} onChange={e => setNewGame({...newGame, thumbnailUrl: e.target.value})} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Trailer URL (YouTube)</label>
            <input placeholder="https://youtube.com/..." value={newGame.trailerUrl} onChange={e => setNewGame({...newGame, trailerUrl: e.target.value})} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Play Store URL</label>
            <input placeholder="https://play.google.com/..." value={newGame.playstoreUrl} onChange={e => setNewGame({...newGame, playstoreUrl: e.target.value})} style={inputStyle} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Description</label>
            <textarea placeholder="Describe the game..." value={newGame.description} onChange={e => setNewGame({...newGame, description: e.target.value})} style={{...inputStyle, minHeight: '80px'}} required />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" style={btnStyle}>Add Game</button>
          </div>
        </form>
      </div>

      {/* List existing games */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {games.map(game => (
          <div key={game.id} style={{ backgroundColor: '#141414', padding: '1rem', borderRadius: '4px', border: '1px solid #262626', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
              <div style={{ width: '36px', height: '36px', backgroundColor: '#0a0a0a', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', color: '#888', fontWeight: 700, border: '1px solid #262626' }}>{game.order}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>{game.title}</div>
                <div style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '0.2rem' }}>
                  {game.status} · {game.genre} · {game.platform}
                </div>
              </div>
              {game.featured && <span style={{ backgroundColor: '#e10600', color: '#fff', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, whiteSpace: 'nowrap' }}>Featured</span>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setEditingGame(game)} style={{ padding: '0.5rem 1rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Edit</button>
              <button onClick={() => handleDeleteGame(game.id)} style={{ padding: '0.5rem 1rem', backgroundColor: 'transparent', color: '#e10600', border: '1px solid #5a1a1a', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editingGame && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '2rem' }}>
          <form onSubmit={handleUpdateGame} style={{ backgroundColor: '#141414', padding: '2rem', borderRadius: '4px', border: '1px solid #e10600', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <h3 style={{ color: '#fff', gridColumn: '1 / -1', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '2px' }}>Edit: {editingGame.title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Title</label>
              <input value={editingGame.title} onChange={e => setEditingGame({...editingGame, title: e.target.value})} style={inputStyle} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Genre</label>
              <input value={editingGame.genre} onChange={e => setEditingGame({...editingGame, genre: e.target.value})} style={inputStyle} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Platform</label>
              <input value={editingGame.platform} onChange={e => setEditingGame({...editingGame, platform: e.target.value})} style={inputStyle} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Order</label>
              <input type="number" value={editingGame.order} onChange={e => setEditingGame({...editingGame, order: parseInt(e.target.value) || 0})} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Status</label>
              <select value={editingGame.status} onChange={e => setEditingGame({...editingGame, status: e.target.value})} style={inputStyle}>
                <option value="Released">Released</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="In Development">In Development</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Category</label>
              <select value={editingGame.category || 'latest'} onChange={e => setEditingGame({...editingGame, category: e.target.value})} style={inputStyle}>
                <option value="latest">Latest</option>
                <option value="previous">Previous</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '1px' }}>
                <input type="checkbox" checked={editingGame.featured || false} onChange={e => setEditingGame({...editingGame, featured: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: '#e10600' }} />
                Featured
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Thumbnail URL</label>
              <input value={editingGame.thumbnailUrl || ''} onChange={e => setEditingGame({...editingGame, thumbnailUrl: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Trailer URL</label>
              <input value={editingGame.trailerUrl || ''} onChange={e => setEditingGame({...editingGame, trailerUrl: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Play Store URL</label>
              <input value={editingGame.playstoreUrl || ''} onChange={e => setEditingGame({...editingGame, playstoreUrl: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Description</label>
              <textarea value={editingGame.description} onChange={e => setEditingGame({...editingGame, description: e.target.value})} style={{...inputStyle, minHeight: '80px'}} required />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setEditingGame(null)} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Cancel</button>
              <button type="submit" style={btnStyle}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GamesManager;