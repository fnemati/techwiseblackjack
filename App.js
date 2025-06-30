import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [games, setGames] = useState([]);
  const [player, setPlayer] = useState('');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const res = await axios.get('http://localhost:5000/api/games');
    setGames(res.data);
  };

  const createGame = async () => {
    await axios.post('http://localhost:5000/api/games', { player, status: 'ongoing' });
    setPlayer('');
    fetchGames();
  };

  const deleteGame = async (id) => {
    await axios.delete(`http://localhost:5000/api/games/${id}`);
    fetchGames();
  };

  return (
    <div>
      <h1>Blackjack Games</h1>
      <input value={player} onChange={e => setPlayer(e.target.value)} placeholder="Player name"/>
      <button onClick={createGame}>Start Game</button>
      <ul>
        {games.map(g => (
          <li key={g._id}>
            {g.player} - {g.status}
            <button onClick={() => deleteGame(g._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
