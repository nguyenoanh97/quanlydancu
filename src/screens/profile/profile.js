import React from 'react';
import {Container} from 'native-base';
import {Alert, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../../core/utils/async_key';
import {DETAIL_PROFILE, LOGIN} from '../../core/utils/screen_names';
import {toast} from '../../core/utils/funtions';
import ButtonFeature from '../../components/button-feature';
import HeaderNoLeft from '../../components/header-noleft';
import {logOut, profileFeature} from '../../../assets/images';

const data = [
  {
    id: '0',
    title: 'Xem thông tin',
    icon: profileFeature,
  },
  {
    id: '1',
    title: 'Đăng xuất',
    icon: logOut,
  },
];

export default function Profile({navigation}) {
  const logOut = async () => {
    toast('Đăng xuất thành công!', 'success');
    await AsyncStorage.removeItem(USER);
    navigation.replace(LOGIN);
  };

  const renderItem = ({item}) => {
    const onPressItem = () => {
      switch (item.id) {
        case '0':
          navigation.navigate(DETAIL_PROFILE);
          break;
        case '1':
          Alert.alert('Thông báo!', 'Bạn có muốn đăng xuất?', [
            {text: 'Đồng ý', onPress: logOut},
            {
              text: 'Hủy',
              onPress: () => null,
              style: 'cancel',
            },
          ]);
          break;
        default:
          return null;
      }
    };
    return (
      <ButtonFeature
        icon={item.icon}
        title={item.title}
        onPress={onPressItem}
      />
    );
  };

  return (
    <Container>
      <HeaderNoLeft title="Trang cá nhân" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
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
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 32,
  },
});
