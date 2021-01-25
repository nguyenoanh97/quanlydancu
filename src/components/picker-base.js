import React from 'react';
import {Icon, Item, Label, Picker} from 'native-base';
import {StyleSheet, View} from 'react-native';

export default function PickerBase({
  label,
  value,
  onChangeState,
  data,
  name,
  editable,
  isLastPage,
  placeholder,
}) {
  const onValueChange = (text) => {
    let obj = {};
    obj[name] = text;
    onChangeState(obj);
  };

  const renderPickerItem = (item) => (
    <Picker.Item key={item.label} label={item.label} value={item.value} />
  );

  return (
    <View style={styles.viewPicker}>
      <Label style={styles.label}>{label}</Label>
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder={placeholder}
          placeholderStyle={{color: '#bfc6ea'}}
          placeholderIconColor="#007aff"
          selectedValue={value}
          onValueChange={onValueChange}>
          {data.map(renderPickerItem)}
        </Picker>
      </Item>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPicker: {
    marginLeft: 16,
    marginTop: 10,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
});
