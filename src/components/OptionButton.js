import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function OptionButton({ label, text, disabled, onPress, state }) {
  const styleMap = {
    default: styles.option,
    selected: styles.selected,
    correct: styles.correct,
    incorrect: styles.incorrect,
  };
  return (
    <TouchableOpacity
      style={[styles.base, styleMap[state || 'default']]}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}.</Text>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e9ee',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  option: {},
  selected: { borderColor: '#2b6ef6', backgroundColor: '#eaf0ff' },
  correct: { borderColor: '#16a34a', backgroundColor: 'rgba(16,163,74,0.08)' },
  incorrect: { borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.04)' },
  label: { fontWeight: '700', marginRight: 8, width: 20 },
  text: { flex: 1 },
});