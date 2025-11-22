const API_URL = 'http://localhost:8080'; // Mude para seu IP local se testar no celular físico (ex: http://192.168.1.100:8080)

export const getJogos = () => fetch(`${API_URL}/jogos`).then(r => r.json());
export const getJogo = (id) => fetch(`${API_URL}/jogos/${id}`).then(r => r.json());
export const createJogo = (data) => fetch(`${API_URL}/jogos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
export const updateJogo = (id, data) => fetch(`${API_URL}/jogos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
export const deleteJogo = (id) => fetch(`${API_URL}/jogos/${id}`, { method: 'DELETE' });

export const getTipos = () => fetch(`${API_URL}/tipojogos`).then(r => r.json());
export const createTipo = (tipo) => fetch(`${API_URL}/tipojogos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tipo }) }).then(r => r.json());

export const getPlataformas = () => fetch(`${API_URL}/plataforma`).then(r => r.json());
export const createPlataforma = (plataforma) => fetch(`${API_URL}/plataforma`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plataforma }) }).then(r => r.json());

export const searchJogosByNome = (letra) => fetch(`${API_URL}/jogos/search/nome?letra=${encodeURIComponent(letra)}`).then(r => r.json());
export const searchJogosByNomeAndTipo = (letra, tipo) => fetch(`${API_URL}/jogos/search/nome-tipo?letra=${encodeURIComponent(letra)}&tipo=${encodeURIComponent(tipo)}`).then(r => r.json());