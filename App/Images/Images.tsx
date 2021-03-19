import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import {Dimensions} from 'react-native';

import ImageView from './ImageView';

var width = Dimensions.get('window').width;
const window = Dimensions.get('window');

//DISABLE WARNINGS ON SCREEN
console.disableYellowBox = true;

function Images() {
  const [isLoading, setLoading] = useState(true);

  const [database, setDatabase] = useState<any>([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      fetch('https://api.imgflip.com/get_memes')
        .then((response) => response.json())
        .then((json) => setDatabase(json))
        .catch(() => setError(true))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 18, color: 'red', fontWeight: 'bold'}}>
          <Text>NO DATA</Text>
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
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
  );

  // MEME GENERATOR
  /////////////////////////////////////////////////////////
  // CAMERA ROLL VIEW
  // <CameraRollGallery
  //Back button
  // enableModal
  // backgroundColor="#a385e0"
  // imagesPerRow={parseInt('2')}
  // imageContainerStyle={{
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   borderBottomLeftRadius: 20,
  //   borderBottomRightRadius: 20,
  // }}
  // imageMargin={parseInt('0')}
  // containerWidth={width}
  // enableCameraRoll={false}
  //   onGetData={(resolve) => {
  //     resolve({
  //       // assets: database.data.memes.map((item) => ({URL: item.url})),
  //       assets: test.data.memes.map((item) => ({URL: item.url})),
  //     });
  //   }}
  // />
  ///////////////////////////////////////////////////////
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
});
export default Images;
