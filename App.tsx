import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Cat from './App/Cat/Cat';
import Notepad from './App/Notepad/Notepad';
import Counter from './App/Counter/Counter';
import Todo from './App/Todo/Todo';
import Images from './App/Images/Images';

import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator backBehavior="history">
        <Tab.Screen
          name="Images"
          component={Images}
          options={{
            tabBarColor: '#9370DB',
            tabBarIcon: () => <Icon name="image" size={20} color="white" />,
          }}
        />
        <Tab.Screen
          name="Cat"
          component={Cat}
          options={{
            tabBarColor: '#20B2AA',
            tabBarIcon: () => <Icon name="smile-o" size={20} color="white" />,
          }}
        />
        <Tab.Screen
          name="Notepad"
          component={Notepad}
          options={{
            tabBarColor: '#BDB76B',
            tabBarIcon: () => (
              <Icon name="file-text-o" size={20} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Counter"
          component={Counter}
          options={{
            tabBarColor: '#A52A2A',
            tabBarIcon: () => <Icon name="sort" size={20} color="white" />,
          }}
        />
        <Tab.Screen
          name="Todo"
          component={Todo}
          options={{
            tabBarColor: '#008B8B',
            tabBarIcon: () => (
              <Icon name="check-circle" size={20} color="white" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
