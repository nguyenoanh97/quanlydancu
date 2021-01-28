import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {width} from '../../../core/utils/const_value';

export default function InputLogin({
  value,
  placeHolderText,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <View style={styles.inputView}>
      <TextInput
        value={value}
        style={styles.TextInput}
        placeholder={placeHolderText}
        placeholderTextColor="#003f5c"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    borderRadius: 30,
    width: width - 64,
    height: 45,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 4,
  },
});
