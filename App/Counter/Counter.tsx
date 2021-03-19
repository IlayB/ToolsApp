import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

function Counter() {
  const [num, SetNum] = useState({
    number: 0,
    status: 'zero',
  });

  useEffect(() => {
    if (num.number < 0) {
      SetNum({...num, status: 'negative'});
    }
    if (num.number > 0) {
      SetNum({...num, status: 'positive'});
    }
    if (num.number == 0) {
      SetNum({...num, status: 'zero'});
    }
  }, [num.number]);

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          SetNum({...num, number: num.number + 1});
        }}>
        <View style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </View>
      </TouchableNativeFeedback>
      <Text style={styles.text}>{num.number}</Text>
      <TouchableNativeFeedback
        onPress={() => {
          SetNum({...num, number: num.number - 1});
        }}>
        <View style={styles.minusButton}>
          <Text style={styles.buttonText}>-</Text>
        </View>
      </TouchableNativeFeedback>
      <Text style={styles.status}>{num.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A52A2A',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 80,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 69,
    textAlign: 'center',
    color: 'white',
  },
  addButton: {
    backgroundColor: 'green',
    width: 100,
    height: 100,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  minusButton: {
    backgroundColor: '#ff3333',
    width: 100,
    height: 100,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  status: {
    fontSize: 20,
    color: 'white',
  },
});

export default Counter;
