import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

function NoteList(props) {
  return (
    <View style={styles.principal}>
      <View style={styles.box}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <Text style={styles.input}>{props.input}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  principal: {
    padding: 10,
  },
  box: {
    borderWidth: 2,
    borderColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  input: {
    color: 'white',
    fontSize: 15,
    padding: 10,
  },
});

export default NoteList;
