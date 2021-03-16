import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import Task from './Task';

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
      console.log(inputValue.length);
      setTodos([...todos, {todo: inputValue, completed: false}]);
      setInputValue('');
    } else {
      alert('Task must be filled out');
    }
  }

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

  const completedTodos = todos.filter((item) => item.completed).length;
  const activeTodos = todos.filter((item) => !item.completed).length;
  const allTodos = todos.filter((item) => !item.completed).length;

  return (
    <View>
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
        <Button title="ADD" onPress={addTodo} />
      </View>
      <Text>{'\n'}</Text>
      <View>
        {filteredTodos.length > 0
          ? //   show filtered todos if a button is pressed
            filteredTodos.map((item, key) => (
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
        <Button title="All Todos " onPress={showAllTodos} />
        <Button title="Active" onPress={showNotCompletedTodos} />
        <Button title="Completed" onPress={showCompletedTodos} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
});

export default Add;
