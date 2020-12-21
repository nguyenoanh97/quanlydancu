import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

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
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});
