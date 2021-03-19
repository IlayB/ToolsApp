import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';

import NoteList from './NoteList';

import AsyncStorage from '@react-native-async-storage/async-storage';

function TextField(props) {
  const [titleValue, setTitleValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [notes, setNotes] = useState([
    // {title: 'Fignea', input: 'Cacaiata', id: 90},
    // {title: 'Third Title', input: 'Third Input', id: 50},
  ]);

  const addNote = async () => {
    if (titleValue.trim() !== '' && inputValue.trim() !== '') {
      setNotes([
        ...notes,
        {title: titleValue, input: inputValue, id: Math.random()},
      ]);
      setInputValue('');
      setTitleValue('');
    } else {
      alert('All the fields must be filed.');
    }
  };

  // ON SCREEN LOAD read values an write them inside "notes"
  useEffect(() => {
    const values = async () => {
      try {
        //GET DATA
        let jsonValue = await AsyncStorage.getItem('@Notes_Data');
        let Value = JSON.parse(jsonValue);
        if (Value) {
          setNotes(Value);
        }
        // console.log('Datele luate');
        // console.log(Value);
        // console.log('.................');
        //SET DATA
        const NotesJson = JSON.stringify(Value);
        await AsyncStorage.setItem('@Notes_Data', NotesJson);
        // console.log('Datele injectate');
        // console.log(NotesJson);
        // console.log('.................');
      } catch (error) {
        console.log(error);
      }
    };
    values();
  }, []);

  //Function for inserting new values into database
  const rewriteDB = async () => {
    const NotesJson = JSON.stringify(notes);
    await AsyncStorage.setItem('@Notes_Data', NotesJson);
    // console.log('Datele noi inscrise');
    // console.log(NotesJson);
    // console.log('.................');
  };

  //when the notes change - sync with database
  useEffect(() => {
    rewriteDB();
  }, [notes]);

  //Delete values
  function removeTodo(noteName) {
    setNotes(notes.filter((item) => item.id !== noteName));
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
          <NoteList
            title={item.title}
            input={item.input}
            key={Math.random()}
            remove={() => removeTodo(item.id)}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BDB76B',
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
    fontSize: 45,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    // fontStyle: 'italic',
    textShadowColor: 'red',
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
