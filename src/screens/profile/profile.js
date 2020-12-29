import React from 'react';
import {Container, Header, Icon, Left, Button, Body, Title} from 'native-base';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../../core/utils/async_key';
import {DETAIL_PROFILE, LOGIN} from '../../core/utils/screen_names';
import {toast} from '../../core/utils/funtions';
import ButtonFeature from '../../components/button-feature';

export default function Profile({navigation}) {
  const onLogout = async () => {
    toast('Đăng xuất thành công!', 'success');
    await AsyncStorage.removeItem(USER);
    navigation.replace(LOGIN);
  };

  const onViewProfile = () => {
    navigation.navigate(DETAIL_PROFILE);
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
      <View style={styles.viewButton}>
        <ButtonFeature
          imgURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_VnUVPYd2yW8dEYfNqqkYEehqC0uJ-dGwjA&usqp=CAU"
          title="Xem thông tin"
          onPress={onViewProfile}
        />
        <ButtonFeature
          imgURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmILJ36vyWg9lmCEFlaqXOVis0lmWxRCO-Ag&usqp=CAU"
          title="Đăng xuất"
          onPress={onLogout}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  viewButton: {
    marginTop: 50,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
