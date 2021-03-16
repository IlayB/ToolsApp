import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import {useState} from 'react';

function Cat() {
  const [src, setSrc] = useState(true);
  const [pet, setPet] = useState({
    number: 5,
    times: 'Times',
  });

  const [message, setMessage] = useState('Pet the Cat!');

  //pet.number copy for show
  const [showNum, setShowNum] = useState(pet.number);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <TouchableNativeFeedback
        onPressIn={() => {
          setSrc(false);
        }}
        onPressOut={() => {
          setSrc(true);
          setShowNum(pet.number - 1);
          setPet({number: pet.number - 1, times: 'Times'});
          if (pet.number <= 1) {
            setMessage('Congratulations!');
            setPet({times: null, number: pet.number - 1});
          }
          if (pet.number <= 1) {
            setShowNum(null);
          }
        }}>
        <Image
          source={
            pet.number <= 0
              ? require('../img/happy_cat.jpg')
              : src
              ? require('../img/cat.jpg')
              : require('../img/pet_the_cat.jpg')
          }
          fadeDuration={0}
        />
      </TouchableNativeFeedback>
      <Text style={styles.text}>
        {showNum} {pet.times}
      </Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#20B2AA',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});

export default Cat;
