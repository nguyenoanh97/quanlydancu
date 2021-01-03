import React from 'react';
import {Input, Item, Label} from 'native-base';

export default function InputBase({
  label,
  value,
  onChangeState,
  name,
  onPress,
  keyboardType,
  editable,
  isLastPage,
}) {
  const onChangeText = (text) => {
    let obj = {};
    obj[name] = text;
    onChangeState(obj);
  };

  const onPressItem = () => onPress && onPress();

  return (
    <Item
      floatingLabel
      onPress={onPressItem}
      style={{
        marginBottom: isLastPage ? 24 : 0,
      }}>
      <Label>{label}</Label>
      <Input
        onChangeText={onChangeText}
        value={value.toString()}
        keyboardType={keyboardType || 'default'}
        editable={!onPress && editable}
      />
    </Item>
  );
}
