import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from '../components/styles';
import { getJogo, createJogo, updateJogo, getTipos, createTipo, getPlataformas, createPlataforma, getJogos } from '../services/api';
import { useRoute } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const route = useRoute();
  const editId = route.params?.editId;

  const [nome, setNome] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [genero, setGenero] = useState('');
  const [jogos, setJogos] = useState([]);
  const [title, setTitle] = useState('Cadastro de Jogos');
  const [btnText, setBtnText] = useState('Salvar');

  useEffect(() => {
    loadPreview();
    if (editId) {
      loadForEdit(editId);
      setTitle('Editar Jogo');
      setBtnText('Atualizar');
    }
  }, [editId]);

  const loadForEdit = async (id) => {
    const jogo = await getJogo(id);
    setNome(jogo.nome);
    setPlataforma(jogo.plataforma.plataforma);
    setGenero(jogo.tipoJogos.tipo);
  };

  const loadPreview = async () => {
    const data = await getJogos();
    setJogos(data);
  };

  const getOrCreate = async (list, createFn, field, value) => {
    let item = list.find(i => i[field].toLowerCase() === value.toLowerCase());
    if (!item) item = await createFn(value);
    return item;
  };

  const handleSubmit = async () => {
    if (!nome || !plataforma || !genero) return Alert.alert('Erro', 'Preencha todos os campos');

    try {
      const tipos = await getTipos();
      const tipoJogo = await getOrCreate(tipos, createTipo, 'tipo', genero);

      const plats = await getPlataformas();
      const plat = await getOrCreate(plats, createPlataforma, 'plataforma', plataforma);

      const data = {
        nome,
        tipoJogos: { id: tipoJogo.id },
        plataforma: { id: plat.id },
      };

      if (editId) await updateJogo(editId, data);
      else await createJogo(data);

      setNome(''); setPlataforma(''); setGenero('');
      navigation.navigate('Consulta');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>

      <TextInput style={styles.input} placeholder="Nome do jogo" placeholderTextColor="#888" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Plataforma (PC, PS5...)" placeholderTextColor="#888" value={plataforma} onChangeText={setPlataforma} />
      <TextInput style={styles.input} placeholder="Gênero (Ação, RPG...)" placeholderTextColor="#888" value={genero} onChangeText={setGenero} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{btnText}</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Prévia</Text>
      <FlatList
        data={jogos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.nome} — {item.plataforma.plataforma} — {item.tipoJogos.tipo}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum jogo cadastrado</Text>}
      />

      <Text style={styles.footer}>© 2025 Arcadia - Todos os direitos reservados</Text>
    </View>
  );
}