import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import {Dimensions} from 'react-native';

import ImageView from './ImageView';

import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';

var width = Dimensions.get('window').width;
const window = Dimensions.get('window');

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

//DISABLE WARNINGS ON SCREEN
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(true);

function Images() {
  const [isLoading, setLoading] = useState(true);

  const [database, setDatabase] = useState<any>([]);

  const [error, setError] = useState(false);

  //10 placeholders
  const [placeholder, setPlaceholder] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const [spinner, setSpinner] = useState(
    <View style={styles.spiner}>
      <ActivityIndicator size={80} color="#6633cc" />
    </View>,
  );

  function beginCountdown() {
    const interval = setTimeout(() => {
      // console.log('This will run only once after 5 seconds');
      setSpinner(<FlashMessage position="bottom" icon="warning" />);
      showMessage({
        message: 'No Connection',
        backgroundColor: '#855cd6',
        duration: 8000,
      });
    }, 5000);
  }

  function onRefresh() {
    setRefreshing(true);

    checkConnection();

    wait(1000).then(() => setRefreshing(false));
  }

  useEffect(() => {
    checkConnection();
    beginCountdown();
    setSpinner(
      <View style={styles.spiner}>
        <ActivityIndicator size={80} color="#6633cc" />
      </View>,
    );
  }, []);

  function checkConnection() {
    try {
      fetch('https://api.imgflip.com/get_memes')
        .then((response) => response.json())
        .then((json) => {
          setDatabase(json);
          setError(false);
        })
        .catch(() => setError(true))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } catch (e) {
      console.log(e);
    }
  }
  function placeholderpage() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <FlatList
              numColumns={2}
              data={placeholder}
              renderItem={() => (
                <View style={styles.box}>
                  <ImageView url={''} id={''} name={''} placeholder={true} />
                </View>
              )}
            />
          </View>
        </ScrollView>
        {spinner}
      </SafeAreaView>
    );
  }

  if (error) {
    return placeholderpage();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          {isLoading ? (
            placeholderpage()
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.toptitle}>Memes:</Text>
              <FlatList
                numColumns={2}
                data={database.data.memes}
                keyExtractor={({id}, index) => id}
                renderItem={({item, index}) => (
                  <View style={styles.box}>
                    <ImageView url={item.url} id={item.id} name={item.name} />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7547d1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  box: {
    borderWidth: 2,
    borderColor: '#855cd6',
    backgroundColor: '#a385e0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  toptitle: {
    color: 'white',
  },
  boxTitle: {
    padding: 3,
    fontWeight: 'bold',
  },
  boxInfo: {
    fontSize: 10,
  },
  spiner: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinerbox: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: '10%',
    flex: 1,
    alignItems: 'center',
  },
  noconnectiontext: {
    position: 'absolute',
    paddingBottom: 500,
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    paddingTop: '70%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  noconnection: {
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Images;
