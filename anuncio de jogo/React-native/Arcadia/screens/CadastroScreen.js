// screens/CadastroScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../styles/styles';
import GameCard from '../components/GameCard';

const API_URL = 'http://localhost:8080'; // Ajuste para a URL do seu backend

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [genero, setGenero] = useState('');
  const [jogos, setJogos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const editId = route.params?.editId;
    if (editId) {
      fetchGameForEdit(editId);
      setIsEditing(true);
      setEditId(editId);
    }
    fetchGamesPreview();
  }, [route.params]);

  const fetchGameForEdit = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/jogos/${id}`);
      const jogo = response.data;
      setNome(jogo.nome);
      setPlataforma(jogo.plataforma.plataforma);
      setGenero(jogo.tipoJogos.tipo);
    } catch (error) {
      console.error('Erro ao carregar jogo para edição:', error);
    }
  };

  const fetchGamesPreview = async () => {
    try {
      const response = await axios.get(`${API_URL}/jogos`);
      setJogos(response.data);
    } catch (error) {
      console.error('Erro ao carregar prévia:', error);
    }
  };

  const getOrCreateTipoJogos = async (tipo) => {
    const tipos = await axios.get(`${API_URL}/tipojogos`).then(res => res.data);
    let tipoJogos = tipos.find(t => t.tipo.toLowerCase() === tipo.toLowerCase());
    if (!tipoJogos) {
      tipoJogos = await axios.post(`${API_URL}/tipojogos`, { tipo }).then(res => res.data);
    }
    return tipoJogos;
  };

  const getOrCreatePlataforma = async (plataformaName) => {
    const plataformas = await axios.get(`${API_URL}/plataforma`).then(res => res.data);
    let plataforma = plataformas.find(p => p.plataforma.toLowerCase() === plataformaName.toLowerCase());
    if (!plataforma) {
      plataforma = await axios.post(`${API_URL}/plataforma`, { plataforma: plataformaName }).then(res => res.data);
    }
    return plataforma;
  };

  const handleSubmit = async () => {
    if (!nome.trim() || !plataforma.trim() || !genero.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const tipoJogos = await getOrCreateTipoJogos(genero);
      const plataformaObj = await getOrCreatePlataforma(plataforma);

      const jogoData = {
        nome,
        tipoJogos: { id: tipoJogos.id },
        plataforma: { id: plataformaObj.id },
      };

      if (isEditing) {
        jogoData.id = editId;
        await axios.put(`${API_URL}/jogos/${editId}`, jogoData);
      } else {
        await axios.post(`${API_URL}/jogos`, jogoData);
      }

      setNome('');
      setPlataforma('');
      setGenero('');
      setIsEditing(false);
      setEditId(null);
      navigation.navigate('Consulta');
    } catch (error) {
      console.error('Erro ao salvar jogo:', error);
      Alert.alert('Erro', 'Falha ao salvar o jogo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>{isEditing ? 'Editar Jogo' : 'Cadastro de Jogos'}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do jogo"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Plataforma (ex.: PC, PS5)"
          placeholderTextColor="#888"
          value={plataforma}
          onChangeText={setPlataforma}
        />
        <TextInput
          style={styles.input}
          placeholder="Gênero (ex.: Ação, Corrida)"
          placeholderTextColor="#888"
          value={genero}
          onChangeText={setGenero}
        />
        <Button
          title={isEditing ? 'Atualizar' : 'Salvar'}
          color="#a64dff"
          onPress={handleSubmit}
        />
      </View>
      <View style={styles.previewLista}>
        <Text style={styles.h3}>Prévia: jogos cadastrados</Text>
        <FlatList
          data={jogos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <GameCard
              nome={item.nome}
              plataforma={item.plataforma.plataforma}
              genero={item.tipoJogos.tipo}
            />
          )}
          ListEmptyComponent={<Text style={styles.text}>Nenhum jogo cadastrado ainda.</Text>}
        />
      </View>
    </View>
  );
};

export default CadastroScreen;