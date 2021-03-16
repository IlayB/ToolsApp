import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, ScrollView} from 'react-native';
import Add from './Add';

function Todo() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.table}>
            <View>
              <Text style={styles.title}>Todos</Text>
            </View>
            <View>
              <Add />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#008B8B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  title: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 50,
  },
});

export default Todo;
