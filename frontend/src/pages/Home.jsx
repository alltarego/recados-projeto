import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Home() {
  const [recados, setRecados] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setUser(userData ? JSON.parse(userData) : null);
    carregarRecados();
  }, []);

  const carregarRecados = async () => {
    try {
      const res = await api.get('/recados');
      setRecados(res.data);
    } catch (err) {
      console.error('Erro ao carregar recados', err);
    }
  };

  const handleAddRecado = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/recados', { titulo, texto });
      setRecados([...recados, res.data]);
      setTitulo('');
      setTexto('');
    } catch (err) {
      console.error('Erro ao adicionar recado', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recados/${id}`);
      setRecados(recados.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Erro ao deletar recado', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Recados</h1>
        <div>
          <span style={{ marginRight: '10px' }}>Olá, {user?.name}</span>
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <form onSubmit={handleAddRecado} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd' }}>
        <h2>Novo Recado</h2>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <textarea
          placeholder="Texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', minHeight: '100px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Adicionar
        </button>
      </form>

      <div>
        <h2>Seus Recados</h2>
        {recados.length === 0 ? (
          <p>Nenhum recado ainda</p>
        ) : (
          recados.map((recado) => (
            <div key={recado.id} style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '10px' }}>
              <h3>{recado.titulo}</h3>
              <p>{recado.texto}</p>
              <button onClick={() => handleDelete(recado.id)} style={{ backgroundColor: '#ff4444', color: 'white', padding: '5px 10px', cursor: 'pointer' }}>
                Deletar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}