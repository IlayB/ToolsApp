import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

function NoteList(props) {
  return (
    <View style={styles.principal}>
      <View style={styles.box}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View>
          <Text style={styles.input}>{props.input}</Text>
        </View>
        <View style={styles.box2}>
          <TouchableOpacity onPress={props.remove}>
            <Icon
              name="trash"
              size={20}
              color="#A52A2A"
              style={{paddingRight: 10, paddingBottom: 10}}
            />
          </TouchableOpacity>
        </View>
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
    borderColor: '#d7d4a7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#c8c384',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#121108',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  input: {
    color: '#121108',
    fontSize: 15,
    padding: 10,
  },
  insideBox: {
    backgroundColor: 'blue',
  },
  box2: {
    alignItems: 'flex-end',
  },
});

export default NoteList;
