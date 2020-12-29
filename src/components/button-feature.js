import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {width} from '../core/utils/const_value';
import {Text} from 'native-base';

export default function ButtonFeature({imgURL, title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={{
          uri: imgURL,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    width: (width - 32) / 2 - 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 16,
    marginTop: 40,
    resizeMode: 'contain',
  },
  title: {
    marginBottom: 16,
  },
});
