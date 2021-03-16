import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';

function Task(props) {
  return (
    <View>
      <View style={styles.container}>
        <View>
          <CheckBox
            onPress={props.completeTodo}
            checked={props.completed}
            checkedColor="#7FFF00"
          />
        </View>
        <View>
          <Text style={styles.text}>{props.todo}</Text>
        </View>
        <View>
          <CheckBox
            iconRight
            iconType="material"
            onPress={props.remove}
            uncheckedIcon="clear"
            uncheckedColor="red"
          />
        </View>
      </View>

      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: 1,
        }}
      />
      <Text>{'\n'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  XButton: {
    color: '#DC143C',
  },
});

export default Task;