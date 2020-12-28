import React from 'react';
import {
  Container,
  Header,
  Content,
  Icon,
  Left,
  Button,
  Body,
  Title,
  Text,
} from 'native-base';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../../core/utils/async_key';
import {LOGIN} from '../../core/utils/screen_names';
import {toast} from '../../core/utils/funtions';

export default function Profile({navigation}) {
  const onLogout = async () => {
    toast('Đăng xuất thành công!', 'success');
    await AsyncStorage.removeItem(USER);
    navigation.replace(LOGIN);
  };

  return (
    <Container>
      <Header noLeft>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Trang cá nhân</Title>
        </Body>
      </Header>
      <Content>
        <View style={{height: 30}} />

        <Button block>
          <Text>Xem thông tin cá nhân</Text>
        </Button>
        <View style={{height: 30}} />

        <Button block light onPress={onLogout}>
          <Text>Đăng xuất</Text>
        </Button>
      </Content>
    </Container>
  );
}
