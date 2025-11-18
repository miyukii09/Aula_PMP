// screens/ConsultaScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Picker, FlatList, Button, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import GameListItem from '../components/GameListItem';

const API_URL = 'http://localhost:8080'; // Ajuste para a URL do seu backend

const ConsultaScreen = () => {
  const [jogos, setJogos] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [generos, setGeneros] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchGeneros();
    fetchJogos();
  }, []);

  const fetchGeneros = async () => {
    try {
      const response = await axios.get(`${API_URL}/tipojogos`);
      const generosUnicos = [...new Set(response.data.map(t => t.tipo).filter(Boolean))].sort();
      setGeneros(generosUnicos);
    } catch (error) {
      console.error('Erro ao preencher gêneros:', error);
    }
  };

  const fetchJogos = async () => {
    try {
      let url = `${API_URL}/jogos`;
      if (filtroGenero) {
        url = `${API_URL}/jogos/search/nome-tipo?letra=${encodeURIComponent(filtroNome)}&tipo=${encodeURIComponent(filtroGenero)}`;
      } else if (filtroNome) {
        url = `${API_URL}/jogos/search/nome?letra=${encodeURIComponent(filtroNome)}`;
      }
      const response = await axios.get(url);
      setJogos(response.data);
    } catch (error) {
      console.error('Erro ao renderizar lista:', error);
    }
  };

  const handleExcluir = async (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este jogo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/jogos/${id}`);
              fetchJogos();
              fetchGeneros();
            } catch (error) {
              console.error('Erro ao excluir jogo:', error);
              Alert.alert('Erro', 'Falha ao excluir o jogo.');
            }
          },
        },
      ]
    );
  };

  const handleEditar = (id) => {
    navigation.navigate('Cadastro', { editId: id });
  };

  useEffect(() => {
    fetchJogos();
  }, [filtroNome, filtroGenero]);

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Consultar Jogos</Text>
      <View style={styles.filtros}>
        <TextInput
          style={styles.input}
          placeholder="Filtrar por nome..."
          placeholderTextColor="#888"
          value={filtroNome}
          onChangeText={setFiltroNome}
        />
        <Picker
          selectedValue={filtroGenero}
          style={styles.picker}
          onValueChange={(itemValue) => setFiltroGenero(itemValue)}
        >
          <Picker.Item label="Todos os Gêneros" value="" />
          {generos.map((genero, index) => (
            <Picker.Item key={index} label={genero} value={genero} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={jogos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameListItem
            nome={item.nome}
            plataforma={item.plataforma.plataforma}
            genero={item.tipoJogos.tipo}
            onEdit={() => handleEditar(item.id)}
            onDelete={() => handleExcluir(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.text}>Nenhum jogo encontrado.</Text>}
      />
    </View>
  );
};

export default ConsultaScreen;