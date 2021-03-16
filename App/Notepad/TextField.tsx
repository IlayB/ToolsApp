import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import NoteList from './NoteList';

function TextField(props) {
  const [titleValue, setTitleValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [notes, setNotes] = useState([
    // {title: 'Fignea', input: 'Cacaiata'},
    // {title: 'Third Title', input: 'Third Input'},
  ]);

  function addNote() {
    if (titleValue.trim() !== '' && inputValue.trim() !== '') {
      setNotes([...notes, {title: titleValue, input: inputValue}]);
      setInputValue('');
      setTitleValue('');
    } else {
      alert('All the fields must be filed.');
    }
  }

  if (props.show) {
    return (
      <View style={styles.container}>
        <Text> </Text>
        <Text style={styles.title}>NoteBook</Text>
        <Text> </Text>
        <View>
          <Text style={styles.head}>Title:</Text>
          <View style={styles.input}>
            <TextInput
              style={{
                width: '90%',
                height: 50,
                borderColor: 'white',
                borderWidth: 3,
                color: 'white',
                fontSize: 20,
                padding: 10,
              }}
              onChangeText={(text) => setTitleValue(text)}
              value={titleValue}
            />
          </View>
          <Text style={styles.head}>Note:</Text>
          <View style={styles.input}>
            <TextInput
              style={{
                width: '90%',
                height: 120,
                borderColor: 'white',
                borderWidth: 3,
                color: 'white',
                fontSize: 20,
                padding: 10,
              }}
              onChangeText={(text) => setInputValue(text)}
              value={inputValue}
              multiline
            />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={addNote} color="#CD5C5C" />
          </View>
        </View>
      </View>
    );
  }
  if (String(notes).trim() == '') {
    return (
      <View>
        <Text style={styles.noNotes}>No Notes</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {notes.map((item) => (
          <NoteList title={item.title} input={item.input} key={Math.random()} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BDB76B',
    // justifyContent: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    color: 'white',
    padding: 15,
    alignSelf: 'center',
    fontSize: 50,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  head: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
  },
  List: {
    backgroundColor: 'yellow',
    textAlign: 'center',
    paddingHorizontal: 0,
  },
  button: {
    alignSelf: 'center',
    width: '90%',
    padding: 15,
  },
  noNotes: {
    color: 'white',
    padding: 15,
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default TextField;
