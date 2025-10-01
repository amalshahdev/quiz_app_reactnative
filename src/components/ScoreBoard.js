import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScoreBoard({ correct = 0, wrong = 0 }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✅ Correct: {correct}   |   ❌ Wrong: {wrong}   |   🏆 Points: {correct}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, marginTop: 12, borderRadius: 10, backgroundColor: '#f8fafb', alignItems: 'center' },
  text: { color: '#374151', fontWeight: '600' },
});