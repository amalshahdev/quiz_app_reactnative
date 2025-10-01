import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OptionButton from './OptionButton';

export default function QuestionCard({ question, options, correctAnswerKey, selectedKey, disabled, onSelect, showResult }) {
  const keys = Object.keys(options || {});
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
      <View style={{ marginTop: 8 }}>
        {keys.map((k) => {
          let state = 'default';
          if (showResult || selectedKey) {
            if (k === correctAnswerKey) state = 'correct';
            else if (k === selectedKey && selectedKey !== correctAnswerKey) state = 'incorrect';
          } else if (k === selectedKey) state = 'selected';
          return (
            <OptionButton
              key={k}
              label={k}
              text={options[k]}
              disabled={disabled}
              onPress={() => onSelect(k)}
              state={state}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, elevation: 2 },
  question: { fontSize: 16, fontWeight: '700' },
});