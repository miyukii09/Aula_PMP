import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../components/styles';
import { getJogos, deleteJogo, getTipos, searchJogosByNome, searchJogosByNomeAndTipo } from '../services/api';

export default function ConsultaScreen({ navigation }) {
  const [jogos, setJogos] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [generos, setGeneros] = useState([]);

  const loadGeneros = async () => {
    const tipos = await getTipos();
    const uniq = [...new Set(tipos.map(t => t.tipo))].sort();
    setGeneros(uniq);
  };

  const loadJogos = async () => {
    let data;
    if (filtroGenero) data = await searchJogosByNomeAndTipo(filtroNome, filtroGenero);
    else if (filtroNome) data = await searchJogosByNome(filtroNome);
    else data = await getJogos();
    setJogos(data);
  };

  useEffect(() => {
    loadGeneros();
    loadJogos();
  }, [filtroNome, filtroGenero]);

  const excluir = (id) => {
    Alert.alert('Excluir', 'Tem certeza?', [
      { text: 'Cancelar' },
      { text: 'Excluir', onPress: async () => {
        await deleteJogo(id);
        loadJogos();
        loadGeneros();
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consultar Jogos</Text>

      <View style={styles.filterRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Filtrar por nome..."
          placeholderTextColor="#888"
          value={filtroNome}
          onChangeText={setFiltroNome}
        />
        <View style={{ flex: 1 }}>
          <Picker selectedValue={filtroGenero} onValueChange={setFiltroGenero} style={styles.picker}>
            <Picker.Item label="Todos os gêneros" value="" />
            {generos.map(g => <Picker.Item key={g} label={g} value={g} />)}
          </Picker>
        </View>
      </View>

      <FlatList
        data={jogos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              {item.nome} — {item.plataforma.plataforma} — {item.tipoJogos.tipo}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.navigate('Início', { editId: item.id })}>
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDelete} onPress={() => excluir(item.id)}>
                <Text style={styles.btnText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum jogo encontrado</Text>}
      />

      <Text style={styles.footer}>© 2025 Arcadia - Todos os direitos reservados</Text>
    </View>
  );
}