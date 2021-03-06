import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import FastImage from 'react-native-fast-image';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  ShineOverlay,
} from 'rn-placeholder';

const win = Dimensions.get('window');

export default function ImageView(props) {
  const [modalVisible, setModalVisible] = useState(false);

  if (props.placeholder) {
    return (
      <Placeholder Animation={Fade}>
        <View style={styles.container}>
          <PlaceholderLine
            width={90}
            style={{
              marginTop: 10,
              marginBottom: 0,
              backgroundColor: '#c2adeb',
            }}
          />
          <PlaceholderMedia
            style={{
              height: 100,
              width: '100%',
              borderRadius: 20,
              margin: 5,
              backgroundColor: '#c2adeb',
            }}
          />
          <PlaceholderLine width={50} style={{backgroundColor: '#c2adeb'}} />
        </View>
      </Placeholder>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.boxTitle}>{props.name}</Text>
          <FastImage
            source={{
              uri: props.url,
            }}
            key={props.id} // Important to set a key for list items
            style={{
              width: '100%',
              height: 100,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.boxInfo}>{props.id}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        style={styles.modal}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{props.name}</Text>
          <FastImage
            style={{
              width: win.width,
              height: win.width,
              alignSelf: 'center',
            }}
            source={{
              uri: props.url,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Button onPress={() => setModalVisible(false)} title="Close" />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  boxTitle: {
    padding: 3,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  boxInfo: {
    fontSize: 10,
    alignSelf: 'center',
  },
  modalBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  modal: {
    flex: 1,
    backgroundColor: 'black',
  },
  modalTitle: {
    color: 'white',
  },
});
