import React, {useState, Fragment, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Spinner,
} from 'native-base';
import {
  getImage,
  searchByHousehold,
  searchByPeopleCode,
} from '../../core/services/api';
import {toast} from '../../core/utils/funtions';
import {avatarDefault, household} from '../../../assets/images';
import {ADD_RESIDENT} from '../../core/utils/screen_names';
import HeaderBase from '../../components/header';
import FooterBase from '../../components/footer';
import {useFocusEffect} from '@react-navigation/native';

export default function Search({navigation, route}) {
  const [text, setText] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [typeSearch, setTypeSearch] = useState('people');
  const [isLoadingSearch, setLoadingSearch] = useState(false);

  const onChangeText = (value) => setText(value);

  useEffect(() => {
    if (route?.params?.type) {
      const {type} = route?.params;
      setTypeSearch(type);
    }
  }, [route.params]);

  const handleError = (e) => {
    setLoadingSearch(false);
    toast(`Xảy ra lỗi: ${e}`, 'danger');
    console.error(e);
  };

  const onBlur = () => {
    if (text !== '') {
      setLoadingSearch(true);
      if (typeSearch === 'people') {
        searchByPeopleCode('peopleCode', text)
          .then((value) => {
            getImage()
              .then((valueImage) => {
                const dataWithImage = value.map((item) => {
                  const img = valueImage.find(
                    (_item) => item.imageId === _item.id,
                  );
                  if (img) {
                    return {...item, ...img};
                  } else {
                    return item;
                  }
                });
                setDataSearch(dataWithImage);
              })
              .catch((e) => {
                toast(`Xảy ra lỗi: ${e}`, 'danger');
                console.error(e);
              })
              .finally(() => {
                setLoadingSearch(false);
              });
          })
          .catch(handleError);
      } else {
        searchByHousehold('householdId', text)
          .then((value) => {
            setLoadingSearch(false);
            setDataSearch(value);
          })
          .catch(handleError);
      }
    }
  };

  // useFocusEffect(
  //   useCallback(function () {
  //     onBlur();
  //   }, []),
  // );

  const isSearchHousehold = typeSearch === 'household';

  const renderItemData = (item, index) => {
    const onViewInfo = () => {
      navigation.navigate(ADD_RESIDENT, {data: item});
    };

    return (
      <ListItem thumbnail key={index.toString()}>
        <Left>
          <Thumbnail
            square
            source={
              isSearchHousehold
                ? household
                : item.urlImage
                ? {uri: item.urlImage}
                : avatarDefault
            }
          />
        </Left>
        <Body>
          <Text>
            {isSearchHousehold
              ? `Id chủ hộ: ${item.householdHeadId}`
              : item?.name}
          </Text>
          <Text note numberOfLines={2}>
            {isSearchHousehold
              ? `Số thành viên: ${item.numMember}\nGhi chú: ${item.note}`
              : item.nativeLand}
          </Text>
        </Body>
        <Right>
          {!isSearchHousehold && (
            <Button transparent onPress={onViewInfo}>
              <Text>Chi tiết</Text>
            </Button>
          )}
        </Right>
      </ListItem>
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderBase
        type="search"
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={
          isSearchHousehold ? 'Nhập số hộ khẩu...' : 'Nhập mã cư dân...'
        }
        nameIcon={isSearchHousehold ? 'ios-home-outline' : 'ios-people'}
      />
      <Content>
        {!isLoadingSearch && dataSearch.length > 0 && (
          <List>{dataSearch.map(renderItemData)}</List>
        )}
        {!isLoadingSearch && dataSearch.length === 0 && (
          <Text style={styles.textEmpty}>Không có dữ liệu</Text>
        )}
        {isLoadingSearch && <Spinner color="blue" />}
      </Content>
      <FooterBase onPressLeft={onBack} onPreesRight={() => {}} />
    </Container>
  );
}

const styles = StyleSheet.create({
  textEmpty: {
    textAlign: 'center',
    marginTop: 20,
  },
});
