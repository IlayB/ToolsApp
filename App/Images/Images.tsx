import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Text, View} from 'react-native';

import {ImageGallery} from '@nlabs/react-native-image-gallery';

console.disableYellowBox = true;

//Number of images
const imagesLength = 20;
const closeText = 20;

const images = new Array(imagesLength).fill(null).map(() => ({
  url: `https://picsum.photos/500?random=${Math.floor(Math.random() * 100)}`,
  id: String(Math.random()),
  thumbnail: '',
  title: 'Random image',
  description: 'Random image that was obtained from https://picsum.photos',
  closeText: 'Close',
}));

class Images extends React.PureComponent {
  render() {
    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <ImageGallery images={images} closeText="ASDDSDA" />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9370DB',
  },
});

export default Images;
