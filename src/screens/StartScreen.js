import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { QuizContext } from '../context/QuizContext';

export default function StartScreen({ navigation }) {
  const { allQuestions, mode, setMode, setRange } = useContext(QuizContext);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [rangeError, setRangeError] = useState('');

  const applyRange = () => {
    setRangeError('');
    const total = allQuestions.length;
    let s = parseInt(start);
    let e = parseInt(end);
    if (isNaN(s) && isNaN(e)) { setRange(null); return true; }
    if (isNaN(s)) s = 1;
    if (isNaN(e)) e = total;
    if (s < 1) s = 1;
    if (e > total) e = total;
    if (s > e) { setRangeError('Start must be less than or equal to End.'); return false; }
    setRange({ start: s, end: e });
    return true;
  };

  const handleStart = () => { if (!applyRange()) return; navigation.navigate('Quiz'); };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MCQ Quiz</Text>
      <Text style={styles.count}>Total questions: {allQuestions.length}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Mode</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setMode('browse')} style={[styles.modeBtn, mode==='browse' && styles.modeActive]}>
            <Text>Browse</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode('assessment')} style={[styles.modeBtn, mode==='assessment' && styles.modeActive]}>
            <Text>Assessment</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Range (optional)</Text>
        <View style={styles.row}>
          <TextInput value={start} onChangeText={setStart} placeholder="From" keyboardType="numeric" style={styles.input}/>
          <TextInput value={end} onChangeText={setEnd} placeholder="To" keyboardType="numeric" style={styles.input}/>
        </View>
        {rangeError ? <Text style={{ color: '#ef4444' }}>{rangeError}</Text>:null}

        <TouchableOpacity style={styles.startBtn} onPress={handleStart}><Text style={{color:'#fff'}}>Start Quiz</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20,justifyContent:'center',backgroundColor:'#f6f7fb'},
  title:{fontSize:24,fontWeight:'700'},
  count:{marginVertical:8},
  card:{backgroundColor:'#fff',padding:16,borderRadius:12},
  label:{fontWeight:'600',marginTop:12},
  row:{flexDirection:'row',marginVertical:8},
  modeBtn:{padding:10,borderWidth:1,borderColor:'#e6e9ee',borderRadius:8,marginRight:8},
  modeActive:{backgroundColor:'#eaf0ff',borderColor:'#2b6ef6'},
  input:{flex:1,borderWidth:1,borderColor:'#e6e9ee',borderRadius:8,padding:10,marginRight:8},
  startBtn:{marginTop:16,backgroundColor:'#0ea5a4',padding:12,borderRadius:10,alignItems:'center'}
});