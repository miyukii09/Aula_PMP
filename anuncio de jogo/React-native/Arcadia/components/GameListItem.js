// components/GameListItem.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/styles';

const GameListItem = ({ nome, plataforma, genero, onEdit, onDelete }) => {
  return (
    <View style={styles.itemJogo}>
      <Text style={styles.itemText}>{`${nome} — ${plataforma} — ${genero}`}</Text>
      <View style={styles.actions}>
        <Button title="Editar" color="#a64dff" onPress={onEdit} />
        <Button title="Excluir" color="#ff4d4d" onPress={onDelete} />
      </View>
    </View>
  );
};

export default GameListItem;