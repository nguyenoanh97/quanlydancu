import React, {useState, useEffect, Fragment} from 'react';
import {StyleSheet, FlatList, UIManager, LayoutAnimation} from 'react-native';
import {Container, H2} from 'native-base';
import {
  ADD_HOUSEHOLD,
  ADD_RESIDENT,
  MANAGEMENT,
  SEARCH,
} from '../../core/utils/screen_names';
import ButtonFeature from '../../components/button-feature';
import {
  addHousehold,
  addPeople,
  findHousehold,
  findPeople,
  managementPeople,
} from '../../../assets/images';
import HeaderNoLeft from '../../components/header-noleft';

const dataRankLow = [
  {
    id: '0',
    title: 'Thêm cư dân',
    icon: addPeople,
  },
  {
    id: '1',
    title: 'Thêm hộ khẩu',
    icon: addHousehold,
  },
  {
    id: '2',
    title: 'Tìm kiếm cư dân',
    icon: findPeople,
  },
  {
    id: '3',
    title: 'Tìm kiếm hộ khẩu',
    icon: findHousehold,
  },
];

const dataRankHigh = [
  {
    id: '2',
    title: 'Tìm kiếm cư dân',
    icon: findPeople,
  },
  {
    id: '3',
    title: 'Tìm kiếm hộ khẩu',
    icon: findHousehold,
  },
  {
    id: '4',
    title: 'Quản lý cán bộ',
    icon: managementPeople,
  },
];

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Home({navigation}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (global.user) {
      LayoutAnimation.easeInEaseOut();
      setUser(global.user);
    }
  }, []);

  const renderItem = ({item}) => {
    const onPressItem = () => {
      switch (item.id) {
        case '0':
          navigation.navigate(ADD_RESIDENT);
          break;
        case '1':
          navigation.navigate(ADD_HOUSEHOLD);
          break;
        case '2':
          navigation.navigate(SEARCH);
          break;
        case '3':
          navigation.navigate(SEARCH);
          break;
        case '4':
          navigation.navigate(MANAGEMENT);
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

  const renderListHeaderComponent = () => (
    <Fragment>
      {user && <H2 style={styles.textListHeader}>Xin chào, {user?.name}!</H2>}
    </Fragment>
  );

  return (
    <Container>
      <HeaderNoLeft title="Trang chủ" />
      <FlatList
        data={user?.rank === '1' ? dataRankLow : dataRankHigh}
        ListHeaderComponent={renderListHeaderComponent}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  textListHeader: {
    marginVertical: 32,
    marginLeft: 16,
  },
});
