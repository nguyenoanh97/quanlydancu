import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Body, Left, ListItem, Right, Text, Thumbnail} from 'native-base';
import {avatarDefault} from '../../assets/images';

export default function ItemSearch({
  thumbnail,
  name,
  description,
  actionView,
  titleView = 'Chi tiết',
  titleOther,
  actionOther,
}) {
  return (
    <ListItem thumbnail>
      <Left>
        <Thumbnail square source={avatarDefault} />
      </Left>
      <Body>
        <Text>{name}</Text>
        <Text note numberOfLines={2}>
          {description}
        </Text>
      </Body>
      <Right style={styles.right}>
        <TouchableOpacity onPress={actionView}>
          <Text style={styles.textView}>{titleView}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={actionOther} style={styles.buttonOther}>
          <Text style={styles.textOther}>{titleOther}</Text>
        </TouchableOpacity>
      </Right>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  right: {
    flexDirection: 'row',
  },
  textView: {
    color: 'blue',
  },
  textOther: {
    color: 'red',
  },
  buttonOther: {
    marginLeft: 16,
  },
});
