import React from 'react';
import {Input, Item, Label} from 'native-base';

export default function InputBase({
  label,
  value,
  onChangeState,
  name,
  onPress,
  keyboardType,
}) {
  const onChangeText = (text) => {
    let obj = {};
    obj[name] = text;
    console.log('obj', obj);
    onChangeState(obj);
  };

  const onPressItem = () => onPress && onPress();

  return (
    <Item floatingLabel onPress={onPressItem}>
      <Label>{label}</Label>
      <Input
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType || 'default'}
        editable={!onPress}
      />
    </Item>
  );
}
