// components/GameCard.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

const GameCard = ({ nome, plataforma, genero }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{nome}</Text>
      <Text style={styles.cardText}>{plataforma} — {genero}</Text>
    </View>
  );
};

export default GameCard;