import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';

import TextField from './TextField';
import Icon from 'react-native-vector-icons/FontAwesome';

function Notepad() {
  const [showContent, setShowContent] = useState(false);
  return (
    <View style={styles.principal}>
      <View>
        <ScrollView>
          <TextField show={showContent} />
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowContent(!showContent)}>
        {showContent ? (
          <Icon name="list" size={30} color="#464420" />
        ) : (
          <Icon name="plus" size={30} color="#464420" />
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    borderColor: '#d7d4a7',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 0,
    right: 10,
    height: 70,
    backgroundColor: '#d0cc95',
    borderRadius: 100,
    alignSelf: 'flex-end',
  },
  table: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 50,
  },
  principal: {
    backgroundColor: '#BDB76B',
    flex: 1,
  },
});
export default Notepad;
