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
  getCity,
  getDistrict,
  getImage,
  getWard,
  searchByHousehold,
  searchByPeopleCode,
} from '../../core/services/api';
import {emitParams, toast} from '../../core/utils/funtions';
import {avatarDefault, household} from '../../../assets/images';
import {ADD_RESIDENT} from '../../core/utils/screen_names';
import HeaderBase from '../../components/header';
import FooterBase from '../../components/footer';
import {useFocusEffect} from '@react-navigation/native';
import {Picker} from 'react-native';
import {width} from '../../core/utils/const_value';
import {actionEmitter} from '../../core/utils/emiter';
export default function Filter({navigation, route}) {
  const [text, setText] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [typeSearch, setTypeSearch] = useState('people');
  const [isLoadingSearch, setLoadingSearch] = useState(false);

  const onChangeText = (value) => setText(value);

  const onSetLoading = (status) => {
    emitParams(actionEmitter.TOGGLE_MODAL_LOADING, {visible: status});
  };

  useEffect(() => {
    onSetLoading(true);
    getCity()
      .then((value) => {
        setDataCity(value);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const [cityId, setCityId] = useState('1');
  const [districtId, setDistrictId] = useState('1');
  const [wardId, setWardId] = useState('1');

  useEffect(() => {
    onSetLoading(true);
    getDistrict('cityId', cityId)
      .then((value) => {
        setDataDistrict(value);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        onSetLoading(false);
      });
  }, [cityId]);

  useEffect(() => {
    onSetLoading(true);
    getWard('districtId', districtId)
      .then((value) => {
        setDataWard(value);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        onSetLoading(false);
      });
  }, [districtId]);

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
        searchByPeopleCode('name', text)
          .then((value) => {
            console.log('value check:', value);
            const valueChecked = value.filter(
              (item) =>
                item.cityId === cityId &&
                item.wardId === wardId &&
                item.districtId === districtId &&
                item,
            );
            getImage()
              .then((valueImage) => {
                const dataWithImage = valueChecked.map((item) => {
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

  const renderItemFilterCity = (item) => {
    return (
      <Picker.Item label={item.cityName} value={item.cityId} key={item.id} />
    );
  };

  const renderItemFilterDistrict = (item) => {
    return (
      <Picker.Item label={item.districtName} value={item.id} key={item.id} />
    );
  };

  const renderItemFilterWard = (item) => {
    return <Picker.Item label={item.wardName} value={item.id} key={item.id} />;
  };

  const renderFilter = () => (
    <View
      style={{
        paddingHorizontal: 16,
      }}>
      <Picker
        selectedValue={cityId}
        style={{height: 50, width: width - 32}}
        onValueChange={(itemValue) => {
          onSetLoading(true);
          setCityId(itemValue);
        }}>
        {dataCity.map(renderItemFilterCity)}
      </Picker>
      <Picker
        selectedValue={districtId}
        style={{height: 50, width: width - 32}}
        onValueChange={(itemValue) => {
          setDistrictId(itemValue);
        }}>
        {dataDistrict.map(renderItemFilterDistrict)}
      </Picker>
      <Picker
        selectedValue={wardId}
        style={{height: 50, width: width - 32}}
        onValueChange={(itemValue) => {
          setWardId(itemValue);
        }}>
        {dataWard.map(renderItemFilterWard)}
      </Picker>
    </View>
  );

  return (
    <Container>
      <HeaderBase
        type="search"
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={
          isSearchHousehold ? 'Nhập số hộ khẩu...' : 'Nhập tên cư dân...'
        }
        nameIcon={isSearchHousehold ? 'ios-home-outline' : 'ios-people'}
        keyboardType="default"
      />
      {renderFilter()}
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
