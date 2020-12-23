import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Header,
  Left,
  Icon,
  Body,
  Title,
} from 'native-base';
import {ADD_RESIDENT} from '../../core/utils/screen_names';

export default function Home({navigation}) {
  const onAdd = () => navigation.navigate(ADD_RESIDENT);

  return (
    <Container>
      <Header noLeft>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Trang chủ</Title>
        </Body>
      </Header>
      <Content>
        <View style={{height: 30}} />

        <Button block light>
          <Text>Tìm kiếm</Text>
        </Button>
        <View style={{height: 30}} />

        <Button block onPress={onAdd}>
          <Text>Thêm cư dân</Text>
        </Button>
        <View style={{height: 30}} />

        <Button block success>
          <Text>Sửa cư dân</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({

});
