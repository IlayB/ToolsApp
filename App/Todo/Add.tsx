import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Task from './Task';

import {Dimensions} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

var width = Dimensions.get('window').width; //full width

function Add() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([
    // {todo: 'First Todo', completed: false},
    // {todo: 'Second Todo', completed: true},
    // {todo: 'Third Todo', completed: false},
  ]);

  const [filteredTodos, setFilteredTodos] = useState([]);

  //   add a new todo to the already existing array of todos with the value from inputValue
  function addTodo() {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {todo: inputValue, completed: false}]);
      setInputValue('');
    } else {
      alert('Task must be filled out');
    }
  }

  // ON SCREEN LOAD read values an write them inside "todos"
  useEffect(() => {
    const values = async () => {
      try {
        //GET DATA
        let jsonValue = await AsyncStorage.getItem('@Todo_Data');
        let Value = JSON.parse(jsonValue);
        if (Value) {
          setTodos(Value);
        }
        // console.log('Datele luate');
        // console.log(Value);
        // console.log('.................');

        //SET DATA
        const TodosJson = JSON.stringify(Value);
        await AsyncStorage.setItem('@Todo_Data', TodosJson);
        // console.log('Datele injectate');
        // console.log(TodosJson);
        // console.log('.................');
      } catch (error) {
        console.log(error);
      }
    };
    values();
  }, []);

  //Function for inserting new values into database
  const rewriteDB = async () => {
    const TodosJson = JSON.stringify(todos);
    await AsyncStorage.setItem('@Todo_Data', TodosJson);
    // console.log('Datele noi inscrise');
    // console.log(TodosJson);
    // console.log('.................');
  };

  //when the todos change - sync with database
  useEffect(() => {
    rewriteDB();
  }, [todos]);

  //   remove a todo based on the name we receive as argument
  function removeTodo(todoName) {
    setTodos(todos.filter((item) => item.todo !== todoName));
  }

  function completeTodo(todoName) {
    setTodos(
      todos.map((item) => {
        if (item.todo === todoName) item.completed = !item.completed;
        return item;
      }),
    );
  }

  function showAllTodos() {
    return setFilteredTodos([]);
  }

  function showNotCompletedTodos() {
    return setFilteredTodos(todos.filter((item) => !item.completed));
  }

  function showCompletedTodos() {
    return setFilteredTodos(todos.filter((item) => item.completed));
  }

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={{
            width: '80%',
            height: 55,
            borderColor: 'white',
            borderWidth: 3,
            color: 'white',
            fontSize: 20,
          }}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
        />
        <TouchableOpacity onPress={addTodo} style={styles.buttons}>
          <Text style={styles.buttonsText}>ADD</Text>
        </TouchableOpacity>
      </View>
      <Text>{'\n'}</Text>
      <View>
        {filteredTodos.length > 0
          ? //   show filtered todos if a button is pressed
            filteredTodos.map((item) => (
              <Task
                todo={item.todo}
                completed={item.completed}
                remove={() => removeTodo(item.todo)}
                completeTodo={() => completeTodo(item.todo)}
                key={item.todo}
              />
            ))
          : //   otherwise show all todos
            todos.map((item) => (
              <Task
                todo={item.todo}
                completed={item.completed}
                remove={() => removeTodo(item.todo)}
                completeTodo={() => completeTodo(item.todo)}
                key={item.todo}
              />
            ))}
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={showAllTodos} style={styles.buttons}>
          <Text style={styles.buttonsText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showNotCompletedTodos}
          style={styles.buttons}>
          <Text style={styles.buttonsText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showCompletedTodos} style={styles.buttons}>
          <Text style={styles.buttonsText}>Completed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    alignSelf: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    backgroundColor: '#00b3b3',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#00cccc',
  },
  buttonsText: {
    padding: 10,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Add;
